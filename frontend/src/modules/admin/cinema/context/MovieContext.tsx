import React, { useState } from "react";
import { MovieContext } from "./Context";
import { IPagination } from "../../../core/models/core";
import { ICreateMovieParam, IMovie, IUpdateMovieParam } from "../models/movie";
import { CreateMovie, GetMovieByID, GetMovieList, UpdateMovie } from "../services/movie";
import { useNavigate } from "react-router-dom";
import { ADMIN_MOVIES } from "../../../core/constants/redirectURI";

interface MovieProps {
    children?: React.ReactNode
}

export const MovieContextProvider: React.FC<{children: React.ReactNode}> = ({children}: MovieProps) => {
    const [movies, setMovies] = useState<IPagination<IMovie> | null>(null)
    const [movie, setMovie] = useState<IMovie | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate()

    const handleGetMovieList = async (page: number, perpage: number, movieName: string, movieGenre: string) => {
        setLoading(true)
        try {
            const res = await GetMovieList(page, perpage, movieName, movieGenre)
            setMovies(res)
        } catch(e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }

    const handleGetMovieDetails = async (id: number) => {
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

    const handleCreateMovie = async (body: ICreateMovieParam) => {
        setLoading(true)
        try {
            await CreateMovie(body)
            setTimeout(() => {
                navigate(ADMIN_MOVIES)
            }, 2000)
        } catch(e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }
    
    const handleUpdateMovie = async (body: IUpdateMovieParam) => {
        setLoading(true)
        try {
            await UpdateMovie(body)
            setTimeout(() => {
                navigate(ADMIN_MOVIES)
            }, 2000)
        } catch(e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }

    return (
        <MovieContext.Provider value={{ movies, movie, loading, handleGetMovieList, handleGetMovieDetails, handleCreateMovie, handleUpdateMovie}}>
            {children}
        </MovieContext.Provider>
    )
}
