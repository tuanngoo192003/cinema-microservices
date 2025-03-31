import api from "../../core/services/axios.ts"
import {ILoginParams, ILoginResponse, IRefreshingTokenParam, IRefreshTokenResponse} from "../models/auth.ts";
import {IProfile, IUserParam} from "../models/user.ts";
import {IResponse} from "../../core/models/core.ts";

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
    = async (id: number): Promise<IProfile> => {
    return new Promise((resolve, reject) => {
        api
            .get<IProfile>(`/users/${id}`)
            .then((res) => {
                resolve(res.data)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

export const RegisterUserAPI
    = async (body: IUserParam): Promise<IResponse<string>> => {
    return new Promise((resolve, reject) => {
        api
            .post<IResponse<string>>(`/register`, body)
            .then((res) => {
                resolve(res.data)
            })
            .catch((err) => {
                reject(err)
            })
    })
}