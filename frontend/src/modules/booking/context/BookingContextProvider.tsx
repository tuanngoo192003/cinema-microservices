import React, { useState } from "react"
import { BookingContext } from "./Context"
import { IBookingParam, IMovieSchedule } from "../models/booking"
import { Booking, GetMovieDetail, GetMovieDetails } from "../services/booking"
import { useNavigate } from "react-router-dom"
import { BOOKING_FORMAT_URI } from "../../core/constants/redirectURI"

interface BookingContextProps {
    children: React.ReactNode
}

const BookingContextProvider: React.FC<{children: React.ReactNode}> = ({children}: BookingContextProps) => {
    const [movieSchedule, setMovieSchedule] = useState<IMovieSchedule | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate()

    const handleBooking = async (body: IBookingParam, id: number) => {
        setLoading(true)
        try {
            const res = await Booking(body)
            setTimeout(() => {
                navigate(BOOKING_FORMAT_URI(id))
            }, 2000)
        } catch(e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }
    
    const handleGetMovieDetails = async (movieId: number) => {
        setLoading(true)
        try {
            const res = await GetMovieDetails(movieId)
            setMovieSchedule(res.data)
        } catch(e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }

    return (
        <BookingContext.Provider value={{movieSchedule, loading, handleGetMovieDetails, handleBooking }}>
            {children}
        </BookingContext.Provider>
    )
}

export default BookingContextProvider