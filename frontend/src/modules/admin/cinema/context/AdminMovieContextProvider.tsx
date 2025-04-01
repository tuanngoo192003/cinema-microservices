import React, { useState } from "react";
import { AdminMovieContext } from "./Context";
import { IPagination } from "../../../core/models/core";
import { ICreateMovieParam, IMovie, IMovieSelect, IUpdateMovieParam } from "../models/movie";
import { CreateMovie, GetAllMovies, GetMovieByID, GetMovieList, UpdateMovie } from "../services/movie";
import { useNavigate } from "react-router-dom";
import { ADMIN_MOVIES } from "../../../core/constants/redirectURI";

interface MovieProps {
    children?: React.ReactNode
}

export const AdminMovieContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }: MovieProps) => {
    const [movies, setMovies] = useState<IPagination<IMovie> | null>(null)
    const [movieList, setMovieList] = useState<IMovieSelect[]>([])
    const [movie, setMovie] = useState<IMovie | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate()

    const handleGetAllMovies = async () => {
        setLoading(true)
        try {
            const res = await GetAllMovies()
            setMovieList(res.data)
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }

    const handleGetMovieList = async (page: number, perpage: number, movieName: string, movieGenre: string,
        releaseStart: string, releaseEnd: string
    ) => {
        setLoading(true)
        try {
            const res = await GetMovieList(page, perpage, movieName, movieGenre, releaseStart, releaseEnd)
            setMovies(res)
        } catch (e) {
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
        } catch (e) {
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
        } catch (e) {
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
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }

    return (
        <AdminMovieContext.Provider value={{
            movies, movieList, movie, loading, handleGetMovieList,
            handleGetMovieDetails, handleCreateMovie, handleUpdateMovie, handleGetAllMovies
        }}>
            {children}
        </AdminMovieContext.Provider>
    )
}
