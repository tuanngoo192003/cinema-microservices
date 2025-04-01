import { IResponse } from "../../core/models/core"
import api from "../../core/services/axios"
import { IReservedSeat, IReservedSeatParam, IReservedSeatSearch } from "../models/reserved_seat"

export const ReservedSeat = (body: IReservedSeatParam): Promise<IResponse<IReservedSeat>> => {
    return new Promise((resolve, reject) => {
        api
            .post(`/cinema/seats/reservations`, body)
            .then((res) => {
                resolve(res.data)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

export const GetReservedSeat = (search: IReservedSeatSearch) : Promise<IResponse<IReservedSeat>> => {
    return new Promise((resolve, reject) => {
        api
            .get(`/cinema/seats/reservations?userId=${search.userId}&seatId=${search.seatId}&scheduleId=${search.scheduleId}&id=${search.id}`)
            .then((res) => {
                resolve(res.data)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

export const RemoveReservedSeat = (id: number) : Promise<void> => {
    return new Promise((resolve, reject) => {
        api 
            .delete(`/cinema/seats/reservations/${id}`)
            .then((res) => {
                resolve(res.data)
            })
            .catch((err) => {
                reject(err)
            })
    })
}