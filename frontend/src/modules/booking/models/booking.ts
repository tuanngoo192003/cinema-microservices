import { HttpStatusCode } from "axios"

export interface IChoosedSeat {
    seatId: number
    seatCode: string
    seatPrice: number
  }

export interface IBookingParam {
    userId: number 
    movieId: number 
    movieName: string 
    description: string 
    auditoriumName: string 
    releaseDate: string 
    startAt: string 
    endAt: string
    moviePrice: number 
    movieGenre: string  
    scheduleId: number 
    seatIds: number[] 
    totalPrice: number 
    status: string 
}

export interface IBooking {
    _id: string
    userID: number 
    movieName: string
    scheduleID: number 
    seatIDs: number[] 
    totalPrice: number 
    status: string 
}

export interface IBookingDetails {
    _id: string 
    fullName: string 
    movieName: string 
    seatCodes: string 
    startAt: string 
    endAt: string 
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
    userId: number;
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