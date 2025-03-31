import { HttpStatusCode } from "axios"

export interface IChoosedSeat {
    seatId: number
    seatCode: string
    seatPrice: number
  }

export interface IBookingParam {
    user_id: number 
    schedule_id: number 
    seat_ids: number[] 
    total_price: number 
    status: string 
}

export interface IBooking {
    id: string
    userID: number 
    scheduleID: number 
    seatIDs: number[] 
    totalPrice: number 
    status: string 
}

export interface IMovieSchedule {
    id: number
    movie: IMovie
    auditorium: IAuditorium
    startAt: Date
    endAt: Date
    scheduleStatus: string
    seatLeft: number
}

export interface IAuditorium {
    auditoriumId: number;
    auditoriumName: string;
    rows: number;
    columns: number;
    seats: ISeat[]
}

export interface IMovie {
    movieId: number
    movieName: string 
    imageURL: string 
    description: string 
    duration: number 
    releaseDate: Date
    movieGenre: string 
}

export interface ISeat {
    id: number;
    seatCode: string;
    price: number
    status: "AVAILABLE" | "RESERVED" | "BOOKED" | "CHOOSED";
}

export type ReservedSeatResponse = {
    status: HttpStatusCode;
    message: string;
};

export type ReservedSeatRequest = {
    movieId: string;
    seatId: string;
};