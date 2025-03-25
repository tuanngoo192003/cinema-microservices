import { createContext } from "react";
import { IPagination } from "../../core/models/core"
import { IMovie, IMovieItem } from "../models/movie"

type CinemaContextType = {
    movies: IPagination<IMovieItem> | null; 
    movie: IMovie | null
    loading: boolean;
    handleGetMovieList: (page: number, perpage: number, movieName: string, movieGenre: string) => Promise<void>
    handleGetMovieDetail: (id: number) => Promise<void>
}

export const CinemaContext = createContext<CinemaContextType>({
    movies: null,
    movie: null,  
    loading: false, 
    handleGetMovieList: async () => {},
    handleGetMovieDetail: async () => {},
})