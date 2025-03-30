import { IResponse } from "../../core/models/core";
import api from "../../core/services/axios";
import { IMovieSchedule } from "../models/booking";
import { MovieDetailResponse } from "../models/Movie";
import { ReservedSeatRequest, ReservedSeatResponse } from "../models/Seat";

export const ReservedSeat = (body: ReservedSeatRequest) =>
  api.post<ReservedSeatResponse>("/book/reverve-seat", body);

const mockMovie: MovieDetailResponse = {
  movieId: "movieID",
  auditorium: "P103",
  name: "Mock Name Movie",
  genre: "Mock name genre",
  startAt: "23:05",
  timeInMinute: 120,
  rows: "ABCDEFGHIJK",
  colums: 12,
  booked: ["A1", "A2", "E5", "F9"],
  reserved: ["C7", "J6", "J7"],
};

export const GetMovieDetail = (id: string): Promise<MovieDetailResponse> => {
  return new Promise((resolve) => {
    console.log(`Call api with movie id: ${id}`);
    setTimeout(() => resolve(mockMovie), 1000);
  });
};

export const GetMovieDetails = (movieId: number): Promise<IResponse<IMovieSchedule>> => {
  return new Promise((resolve, reject) => {
    api 
      .get(`/cinema/movie-schedules/details/${movieId}`)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
