import { IPagination, IResponse } from "../../../core/models/core"
import api from "../../../core/services/axios"
import { ICreateMovieScheduleParam, IGetByIDMovieSchedule, IMovieSchedule, IUpdateMovieScheduleParam } from "../models/schedule"

export const GetMovieSchedules
    = async (movieId: number, page: number, perpage: number, startAt: string, endAt: string): Promise<IPagination<IMovieSchedule>> => {
        return new Promise((resolve, reject) => {
            api
                .get<IPagination<IMovieSchedule>>(`/cinema/schedules?page=${page}&perpage=${perpage}&startAt=${startAt}&endAt=${endAt}&movieId=${movieId}`)
                .then((res) => {
                    resolve(res.data)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }

export const GetMovieSchedulesDetails
    = async (scheduleId: number): Promise<IResponse<IGetByIDMovieSchedule>> => {
        return new Promise((resolve, reject) => {
            api
                .get(`/cinema/schedules/${scheduleId}`)
                .then((res) => {
                    resolve(res.data)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }

export const CreateMovieSchedule
    = async (body: ICreateMovieScheduleParam): Promise<void> => {
        return new Promise((resolve, reject) => {
            api
                .post(`/cinema/schedules`, body)
                .then((res) => {
                    resolve(res.data)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }

export const UpdateMovieSchedule
    = async (body: IUpdateMovieScheduleParam): Promise<void> => {
        return new Promise((resolve, reject) => {
            api
                .post(`/cinema/schedules`, body)
                .then((res) => {
                    resolve(res.data)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }