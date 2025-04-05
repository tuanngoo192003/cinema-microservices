import { IResponse } from "../../core/models/core";
import api from "../../core/services/axios";
import { IBooking, IBookingDetails, IBookingParam, IMovieSchedule, ReservedSeatRequest, ReservedSeatResponse } from "../models/booking";

export const ReservedSeat = (body: ReservedSeatRequest) =>
  api.post<ReservedSeatResponse>("/book/reverve-seat", body);

export const GetMovieDetails = (movieId: number): Promise<IResponse<IMovieSchedule>> => {
  return new Promise((resolve, reject) => {
    api
      .get(`/cinema/schedules/details/${movieId}`)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export const Booking = (body: IBookingParam): Promise<void> => {
  return new Promise((resolve, reject) => {
    api 
      .post(`/booking`, body)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export const GetBookingsOfUser = (userId: number): Promise<IResponse<IBooking[]>> => {
  return new Promise((resolve, reject) => {
    api 
      .get(`/booking/${userId}`)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export const GetBookingDetails = (bookingId: string): Promise<IResponse<IBookingDetails>> => {
  return new Promise((resolve, reject) => {
    api 
      .get(`/booking?objectId=${bookingId}`)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
