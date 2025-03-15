import axios, {AxiosError} from "axios";
import Cookies from "js-cookie";
import {ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY} from "../constants/storage.ts";
import {IRefreshingTokenParam} from "../../user/models/auth.ts";
import {RefreshTokenApi} from "../../user/services";

const api = axios.create({
  baseURL: "/",
})

export type ErrorResponse = {
  errors: {
    [key: string]: string
  }
};

interface ExpiredTokenRequest {
  resolve: (value?: unknown | PromiseLike<unknown>) => void
  reject: (error: unknown) => unknown
}

let refreshingToken = false
let expiredTokenRequests: ExpiredTokenRequest[] = []

const processExpiredTokenRequests = (error: unknown) => {
  expiredTokenRequests.forEach((req) => {
    if (error) {
      req.reject(error)
    } else {
      req.resolve()
    }
  })
  expiredTokenRequests = []
}

const publicUrls = [/login/, /refresh/, /register/]

const logout = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
}

api.interceptors.request.use((config) => {
  const accessToken = Cookies.get(ACCESS_TOKEN_KEY)
  if(accessToken && !publicUrls.some((pattern) => pattern.test(config.url || ''))) {
      config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config //AxiosRequestConfig
})

api.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const status = error.response?.status
      switch (status) {
        case 401: {
          if (error.config.url?.includes('/login')) {
            break;
          }
          const config = error.config;
          if (!error.config.url.includes('/refresh') && !config._retry) {
            if(refreshingToken) {
              try {
                await new Promise((resolve, reject) => {
                  expiredTokenRequests.push({resolve: resolve, reject: reject})
                })
                return api(config)
              } catch(error) {
                return Promise.reject(error)
              }
            }
            config._retry = true;
            const refreshToken = Cookies.get(REFRESH_TOKEN_KEY)
            if(!refreshToken) {
              return logout()
            }
            if(!refreshingToken) {
              try {
                refreshingToken = true
                const tokenParams = {
                  refreshToken
                } as IRefreshingTokenParam
                const data = await RefreshTokenApi(tokenParams)
                Cookies.set(ACCESS_TOKEN_KEY, data.accessToken)
                Cookies.set(REFRESH_TOKEN_KEY, data.refreshToken)
                processExpiredTokenRequests(null)
                return api(config)
              } catch (e) {
                processExpiredTokenRequests(e)
                Cookies.remove(ACCESS_TOKEN_KEY)
                Cookies.remove(REFRESH_TOKEN_KEY)
                return logout()
              } finally {
                refreshingToken = false
              }
            }
          }
          break
        }
        case 403:
          Cookies.remove(ACCESS_TOKEN_KEY)
          Cookies.remove(REFRESH_TOKEN_KEY)
          // Cookies.remove(USER)
          window.location.replace('/403')
          break
        case 404:
          window.location.replace('/404')
          break
        case 500:
          window.location.replace('/500')
          break
        default:
          break
      }
    }
);

export function HandleError(
    err: Error | AxiosError<ErrorResponse>
): ErrorResponse {
  if (axios.isAxiosError(err)) {
    return err.response?.data;
  } else {
    return {
      errors: {
        message: "Unknown Error",
        code: "500",
        debug: err.message,
        status: "error",
      }
    };
  }
}

export default api;
