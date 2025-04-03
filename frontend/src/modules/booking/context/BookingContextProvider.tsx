import React, { useState } from "react"
import { BookingContext } from "./Context"
import { IBookingParam, IMovieSchedule } from "../models/booking"
import { Booking, GetMovieDetails } from "../services/booking"
import { ErrorResponse, useNavigate } from "react-router-dom"
import { BOOKING_FORMAT_URI } from "../../core/constants/redirectURI"
import { useSnackbar } from "notistack"
import { useTranslation } from "react-i18next"
import { HandleError } from "../../core/services/axios"
import { AxiosError } from "axios"

interface BookingContextProps {
    children: React.ReactNode
}

const BookingContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }: BookingContextProps) => {
    const { enqueueSnackbar } = useSnackbar();
    const { t } = useTranslation()
    const [movieSchedule, setMovieSchedule] = useState<IMovieSchedule | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate()

    const handleBooking = async (body: IBookingParam, id: number) => {
        setLoading(true)
        try {
            await Booking(body)
            enqueueSnackbar(t('labels.success'), { variant: "success" });
            setTimeout(() => {
                navigate(BOOKING_FORMAT_URI(id))
            }, 2000)
        } catch (e) {
            const err = HandleError(e as Error | AxiosError<ErrorResponse>);
            enqueueSnackbar(err.errors["message"], { variant: "error" });
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
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }

    return (
        <BookingContext.Provider value={{ movieSchedule, loading, handleGetMovieDetails, handleBooking }}>
            {children}
        </BookingContext.Provider>
    )
}

export default BookingContextProvider