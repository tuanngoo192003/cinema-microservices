import { HttpStatusCode } from "axios"

export interface IMovieSchedule {
    id: number
    movie: IMovie
    auditorium: IAuditorium
    startAt: Date
    endAt: Date
    scheduleStatus: string
    seatLeft: number
    booked: string[];
    reserved: string[];
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
    id: string;
    seatCode: string;
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