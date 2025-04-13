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
    seats: IBookingSeat[]
    totalPrice: number
    status: string
}

export interface IBookingSeat {
    seatId: number
    seatCode: string
}

export interface IBooking {
    ID: string
    userID: number
    movieID: number
    movieName: string
    releaseDate: string 
    startAt: string 
    endAt: string
    price: number
    movieGenre: string
    description: string
    imageUrl: string
    auditoriumName: string
    scheduleID: number
    seats: IBookingSeat[]
    totalPrice: number
    status: string
    createdAt: string
    updatedAt: string
    updatedBy: number
}

export interface IMovieSchedule {
    id: number
    movie: IMovie
    auditorium: IAuditorium
    startAt: string
    endAt: string
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
    releaseDate: string
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