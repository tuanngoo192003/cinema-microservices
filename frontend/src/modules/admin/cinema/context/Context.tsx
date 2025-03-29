import { createContext } from "react";
import { IPagination } from "../../../core/models/core"
import { IAuditorium, IAuditoriumParam } from "../models/auditorium"
import { ICreateMovieParam, IMovie, IUpdateMovieParam } from "../models/movie";
import { ICreateMovieScheduleParam, IGetByIDMovieSchedule, IMovieSchedule, IUpdateMovieScheduleParam } from "../models/schedule";

type AuditoriumContextType = {
    auditoriums: IPagination<IAuditorium> | null;
    loading: boolean 
    handleCreateAuditorium: (body: IAuditoriumParam) => Promise<void>
    handleGetAuditoriumList: (page: number, perpage: number, auditoriumName: string) => Promise<void>
}

export const AuditoriumContext = createContext<AuditoriumContextType>({
    auditoriums: null,
    loading: false, 
    handleCreateAuditorium: async () => {},
    handleGetAuditoriumList: async () => {},
})

type MovieContextType = {
    movies: IPagination<IMovie> | null; 
    movie: IMovie | null; 
    loading: boolean 
    handleGetMovieList: (page: number, perpage: number, movieName: string, movieGenre: string) => Promise<void>
    handleGetMovieDetails: (id: number) => Promise<void>
    handleCreateMovie: (body: ICreateMovieParam) => Promise<void>
    handleUpdateMovie: (body: IUpdateMovieParam) => Promise<void>
}

export const MovieContext = createContext<MovieContextType>({
    movies: null,
    movie: null,
    loading: false,
    handleGetMovieList: async () => {},
    handleGetMovieDetails: async () => {},
    handleCreateMovie: async () => {},
    handleUpdateMovie: async () => {},
})

type MovieScheduleContextType = {
    movieSchedules: IPagination<IMovieSchedule> | null 
    movieSchedule: IGetByIDMovieSchedule | null 
    loading: boolean
    handleGetMovieScheduleList: (movieId: number, page: number, perpage: number, startAt: string, endAt: string) => Promise<void>
    handleGetMovieScheduleByID: (scheduleId: number) => Promise<void>
    handleCreateMovieSchedule: (body: ICreateMovieScheduleParam) => Promise<void>
    handleUpdateMovieSchedule: (body: IUpdateMovieScheduleParam) => Promise<void>
}

export const MovieScheduleContext = createContext<MovieScheduleContextType>({
    movieSchedules: null,
    movieSchedule: null,
    loading: false,
    handleGetMovieScheduleList: async () => {},
    handleGetMovieScheduleByID: async () => {},
    handleCreateMovieSchedule: async () => {},
    handleUpdateMovieSchedule: async () => {}
})