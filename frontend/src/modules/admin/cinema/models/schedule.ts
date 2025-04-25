import { IMovie } from "./movie"

export interface IGetByIDMovieSchedule {
    id: number 
    movie: IMovie
    auditoriumId: number 
    startAt: Date 
    endAt: Date 
    scheduleStatus: string 
}

export interface IMovieSchedule {
    id: number 
    movieId: number
    movieName: string 
    auditoriumId: number 
    auditoriumName: string  
    startAt: Date 
    endAt: Date 
    scheduleStatus: string 
    seatLeft: number
}

export interface ICreateMovieScheduleParam {
    movieId: number
    auditoriumId: number 
    startAt: string 
    endAt: string 
    scheduleStatus: string 
    moviePrice: number
}

export interface IUpdateMovieScheduleParam {
    id: number 
    movieId: number
    auditoriumId: number 
    startAt: Date 
    endAt: Date 
    scheduleStatus: string 
}