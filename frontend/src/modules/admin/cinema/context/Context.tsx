import { createContext } from "react";
import { IPagination } from "../../../core/models/core"
import { ICreateMovieParam, IMovie, IMovieSelect, IUpdateMovieParam } from "../models/movie";
import { ICreateMovieScheduleParam, IGetByIDMovieSchedule, IMovieSchedule, IUpdateMovieScheduleParam } from "../models/schedule";
import { IAuditorium, IAuditoriumParam, IAuditoriumSelect } from "../models/auditorium";

type AuditoriumContextType = {
    auditoriums: IPagination<IAuditorium> | null;
    auditoriumList: IAuditoriumSelect[];
    loading: boolean 
    handleCreateAuditorium: (body: IAuditoriumParam) => Promise<void>
    handleGetAuditoriumList: (page: number, perpage: number, auditoriumName: string) => Promise<void>
    handleGetAllAuditoriums: () => Promise<void>
}

export const AuditoriumContext = createContext<AuditoriumContextType>({
    auditoriums: null,
    auditoriumList: [],
    loading: false, 
    handleCreateAuditorium: async () => {},
    handleGetAuditoriumList: async () => {},
    handleGetAllAuditoriums: async () => {}
})

type AdminMovieContextType = {
    movies: IPagination<IMovie> | null; 
    movieList: IMovieSelect[];
    movie: IMovie | null; 
    loading: boolean 
    handleGetMovieList: (page: number, perpage: number, movieName: string, movieGenre: string, releaseStart: string, releaseEnd: string) => Promise<void>
    handleGetMovieDetails: (id: number) => Promise<void>
    handleCreateMovie: (body: ICreateMovieParam) => Promise<void>
    handleUpdateMovie: (body: IUpdateMovieParam) => Promise<void>
    handleGetAllMovies: () => Promise<void>
}

export const AdminMovieContext = createContext<AdminMovieContextType>({
    movies: null,
    movieList: [],
    movie: null,
    loading: false,
    handleGetMovieList: async () => {},
    handleGetMovieDetails: async () => {},
    handleCreateMovie: async () => {},
    handleUpdateMovie: async () => {},
    handleGetAllMovies: async () => {}
})

type AdminMovieScheduleContextType = {
    movieSchedules: IPagination<IMovieSchedule> | null 
    movieSchedule: IGetByIDMovieSchedule | null 
    loading: boolean
    handleGetMovieScheduleList: (movieId: number, page: number, perpage: number, startAt: string, endAt: string) => Promise<void>
    handleGetMovieScheduleByID: (scheduleId: number) => Promise<void>
    handleCreateMovieSchedule: (body: ICreateMovieScheduleParam) => Promise<void>
    handleUpdateMovieSchedule: (body: IUpdateMovieScheduleParam) => Promise<void>
}

export const AdminMovieScheduleContext = createContext<AdminMovieScheduleContextType>({
    movieSchedules: null,
    movieSchedule: null,
    loading: false,
    handleGetMovieScheduleList: async () => {},
    handleGetMovieScheduleByID: async () => {},
    handleCreateMovieSchedule: async () => {},
    handleUpdateMovieSchedule: async () => {}
})