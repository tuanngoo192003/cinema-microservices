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
    auditoriumId: number 
    startAt: Date 
    endAt: Date 
    scheduleStatus: string 
}

export interface ICreateMovieScheduleParam {
    movieId: number
    auditoriumId: number 
    startAt: Date 
    endAt: Date 
    scheduleStatus: string 
}

export interface IUpdateMovieScheduleParam {
    id: number 
    movieId: number
    auditoriumId: number 
    startAt: Date 
    endAt: Date 
    scheduleStatus: string 
}