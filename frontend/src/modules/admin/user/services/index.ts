import {IProfile, IUserParam} from "../models/user.ts";
import api from "../../../core/services/axios.ts";
import { IPagination, IResponse } from "../../../core/models/core.ts";

export const GetListUserAPI
    = async (search: string, page: number, perpage: number): Promise<IPagination<IProfile>> => {
    return new Promise((resolve, reject) => {
        api
            .get<IPagination<IProfile>>(`/users?search=${search}&page=${page}&perpage=${perpage}`)
            .then((res) => {
                resolve(res.data)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

export const CreateUserAPI
    = async (body: IUserParam): Promise<IResponse<string>> => {
    return new Promise((resolve, reject) => {
        api
            .post<IResponse<string>>(`/users`, body)
            .then((res) => {
                resolve(res.data)
            })
            .catch((err) => {
                reject(err)
            })
    })
}