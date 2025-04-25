import React, { useState } from "react";
import { GetMovieByID, GetMovieListApi } from "../services";
import { IMovie, IMovieItem } from "../models/movie";
import { IPagination } from "../../core/models/core";
import { CinemaContext } from "./Context";

interface MovieProps {
    children?: React.ReactNode
} 

export const MovieContextProvider: React.FC<{children: React.ReactNode}> = ({children}: MovieProps) => {
    const [movies, setMovies] = useState<IPagination<IMovieItem> | null>(null);
    const [movie, setMovie] = useState<IMovie | null>(null);
    const [loading, setLoading] = useState<boolean>(false)

    const handleGetMovieList = async (page: number, perpage: number, movieName: string, movieGenre: string) => {
        setLoading(true) 
        try {
            const res = await GetMovieListApi(page, perpage, movieName, movieGenre)
            setMovies(res)
        } catch(e) {
            console.error("Error fetching user list", e);
        } finally {
            setLoading(false)
        }
    }

    const handleGetMovieDetail = async (id: number) => {
        setLoading(true)
        try {
            const res = await GetMovieByID(id)
            setMovie(res.data)
        } catch(e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }
    return (
        <CinemaContext.Provider value={{ movies, movie, loading, handleGetMovieList, handleGetMovieDetail }}>
            {children}
        </CinemaContext.Provider>
    )
}