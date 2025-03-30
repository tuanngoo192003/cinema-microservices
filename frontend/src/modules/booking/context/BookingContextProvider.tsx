import React, { useState } from "react"
import { BookingContext } from "./Context"
import { IMovieSchedule } from "../models/booking"
import { GetMovieDetail, GetMovieDetails } from "../services"

interface BookingContextProps {
    children: React.ReactNode
}

const BookingContextProvider: React.FC<{children: React.ReactNode}> = ({children}: BookingContextProps) => {
    const [movieSchedule, setMovieSchedule] = useState<IMovieSchedule | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    
    const handleGetMovieDetails = async (movieId: number) => {
        setLoading(true)
        try {
            const res = await GetMovieDetail(movieId)
            setMovieSchedule(res.data)
        } catch(e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }

    return (
        <BookingContext.Provider value={{movieSchedule, loading, handleGetMovieDetails}}>
            {children}
        </BookingContext.Provider>
    )
}

export default BookingContextProvider