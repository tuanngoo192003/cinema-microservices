import React, { useState } from "react"
import { IMovieScheduleTab, transformMovieSchedules } from "../models/movieSchedule"
import { MovieScheduleContext } from "./Context"
import { GetMovieSchedules } from "../services"

interface MovieScheduleProps {
    children?: React.ReactNode
} 

export const MovieScheduleContextProvider: React.FC<{children: React.ReactNode}> = ({children}: MovieScheduleProps) => {
    const [movieSchedules, setMovieSchedules] = useState<Record<number, IMovieScheduleTab[]>>({})
    const [loading, setLoading] = useState<boolean>(false)
    
    const handleGetMovieSchedules = async (movieId: number, page: number, perpage: number, startAt: string, endAt: string) => {
        setLoading(true)
        try {
            const res = await GetMovieSchedules(movieId, page, perpage, startAt, endAt)
            const converted = transformMovieSchedules(res.data)
            setMovieSchedules(converted)
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

