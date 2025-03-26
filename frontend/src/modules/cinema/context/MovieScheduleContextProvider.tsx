import React, { useState } from "react"
import { IPagination } from "../../core/models/core"
import { IMovieSchedule } from "../models/movieSchedule"
import { MovieScheduleContext } from "./Context"
import { GetMovieSchedules } from "../services"

interface MovieScheduleProps {
    children?: React.ReactNode
} 

export const MovieScheduleContextProvider: React.FC<{children: React.ReactNode}> = ({children}: MovieScheduleProps) => {
    const [movieSchedules, setMovieSchedules] = useState<IPagination<IMovieSchedule> | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    
    const handleGetMovieSchedules = async (movieId: number, page: number, perpage: number, startAt: string, endAt: string) => {
        setLoading(true)
        try {
            const res = await GetMovieSchedules(movieId, page, perpage, startAt, endAt)
            setMovieSchedules(res)
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }

    return (
        <MovieScheduleContext.Provider value={{movieSchedules, loading, handleGetMovieSchedules}}>
            {children}
        </MovieScheduleContext.Provider>
    )
}

