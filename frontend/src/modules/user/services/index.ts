import api from "../../core/services/axios.ts"
import {ILoginParams, ILoginResponse, IRefreshingTokenParam, IRefreshTokenResponse} from "../models/auth.ts";
import {IProfile} from "../models/user.ts";

export const LoginApi
    = async (payload: ILoginParams): Promise<ILoginResponse> => {
    return new Promise((resolve, reject) => {
        api
            .post<ILoginResponse>("/login", payload)
            .then((res) => {
                resolve(res.data)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

export const RefreshTokenApi
    = async (payload: IRefreshingTokenParam): Promise<IRefreshTokenResponse> => {
    return new Promise((resolve, reject) => {
        api
            .post<IRefreshTokenResponse>("/refresh", payload)
            .then((res) => {
                resolve(res.data)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

export const GetProfileAPI
    = async (): Promise<IProfile> => {
    return new Promise((resolve, reject) => {
        api
            .get<IProfile>("user/profile")
            .then((res) => {
                resolve(res.data)
            })
            .catch((err) => {
                reject(err)
            })
    })
}