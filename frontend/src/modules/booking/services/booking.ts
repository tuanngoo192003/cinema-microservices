import { HttpStatusCode } from "axios";
import { IResponse } from "../../core/models/core";
import api from "../../core/services/axios";
import { IBooking, IBookingParam, IMovieSchedule, ReservedSeatRequest, ReservedSeatResponse } from "../models/booking";

export const ReservedSeat = (body: ReservedSeatRequest) =>
  api.post<ReservedSeatResponse>("/book/reverve-seat", body);

const mockMovieSchedule: IResponse<IMovieSchedule> = {
  status: HttpStatusCode.Ok,
  message: "",
  data: {
    id: 1,
    movie: {
      movieId: 101,
      movieName: "Mock Name Movie",
      imageURL: "https://example.com/mock-movie.jpg",
      description: "A thrilling mock movie about adventure and mystery.",
      duration: 120,
      releaseDate: new Date("2025-01-01"),
      movieGenre: "Mock Genre",
    },
    auditorium: {
      auditoriumId: 1,
      auditoriumName: "P103",
      rows: 11, // "ABCDEFGHIJK" = 11 rows
      columns: 12,
      seats: Array.from({ length: 11 * 12 }, (_, i) => {
        const row = "ABCDEFGHIJK"[Math.floor(i / 12)];
        const col = (i % 12) + 1;
        const seatCode = `${row}${col}`;
        return {
          id: i + 1,
          seatCode,
          price: 10.0,
          status: ["A1", "A2", "E5", "F9"].includes(seatCode)
            ? "BOOKED"
            : ["C7", "J6", "J7"].includes(seatCode)
            ? "RESERVED"
            : "AVAILABLE",
        };
      }),
    },
    startAt: new Date(),
    endAt: new Date(new Date().getTime() + 120 * 60000),
    scheduleStatus: "ACTIVE",
    seatLeft: 11 * 12 - 7, // Total seats minus booked and reserved
  },
};


export const GetMovieDetail = (id: number): Promise<IResponse<IMovieSchedule>> => {
  return new Promise((resolve) => {
    console.log(`Call api with movie id: ${id}`);
    setTimeout(() => resolve(mockMovieSchedule), 1000);
  });
};

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

export const GetBookingsOfUser = (userId: number): Promise<IResponse<IBooking>> => {
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
