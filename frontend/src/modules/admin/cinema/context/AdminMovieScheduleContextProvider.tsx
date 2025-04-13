import React, { useState } from "react"
import { AdminMovieScheduleContext } from "./Context"
import { IPagination } from "../../../core/models/core"
import { ICreateMovieScheduleParam, IGetByIDMovieSchedule, IMovieSchedule, IUpdateMovieScheduleParam } from "../models/schedule"
import { CreateMovieSchedule, GetMovieSchedules, GetMovieSchedulesDetails, UpdateMovieSchedule } from "../services/schedule"
import { ErrorResponse, useNavigate } from "react-router-dom"
import { ADMIN_MOVIE_SCHEDULES } from "../../../core/constants/redirectURI"
import { useSnackbar } from "notistack"
import { useTranslation } from "react-i18next"
import { HandleError } from "../../../core/services/axios"
import { AxiosError } from "axios"

interface MovieScheduleProps {
    children?: React.ReactNode
}

export const AdminMovieScheduleContextProvider: React.FC<{children: React.ReactNode}> = ({children} : MovieScheduleProps) => {
    const { enqueueSnackbar } = useSnackbar();
    const { t } = useTranslation()
    const [movieSchedules, setMovieSchedules] = useState<IPagination<IMovieSchedule> | null>(null)
    const [movieSchedule, setMovieSchedule] = useState<IGetByIDMovieSchedule | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate()

    const handleGetMovieScheduleList = async (movieId: number, page: number, perpage: number, startAt: string, endAt: string) => {
        let tempDate = new Date()
        if (!startAt) {
            startAt = tempDate.toISOString()
        }
        if (!endAt) {
            let endAtDate = new Date() 
            endAtDate.setDate(tempDate.getDate() + 14)
            endAt = endAtDate.toISOString()
        }
        setLoading(true)
        try {
            const res = await GetMovieSchedules(movieId, page, perpage, startAt, endAt)
            setMovieSchedules(res)
        } catch(e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }

    const handleGetMovieScheduleByID = async (scheduleId: number) => {
        setLoading(true)
        try {
            const res = await GetMovieSchedulesDetails(scheduleId)
            setMovieSchedule(res.data)
        } catch(e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }

    const handleCreateMovieSchedule = async (body: ICreateMovieScheduleParam) => {
        setLoading(true)
        try {
            console.log(body)
            await CreateMovieSchedule(body)
            enqueueSnackbar(t('messages.success'), { variant: "success" });
            setTimeout(() => {
                navigate(ADMIN_MOVIE_SCHEDULES)
            }, 2000)  
        } catch(e) {
            const err = HandleError(e as Error | AxiosError<ErrorResponse>);
            enqueueSnackbar(err.errors["message"], { variant: "error" });
            console.log(e)
        } finally {
            setLoading(false)
        }
    }

    const handleUpdateMovieSchedule = async (body: IUpdateMovieScheduleParam) => {
        setLoading(true)
        try {
            await UpdateMovieSchedule(body)
            enqueueSnackbar(t('messages.success'), { variant: "success" });
            setTimeout(() => {
                navigate(ADMIN_MOVIE_SCHEDULES)
            }, 2000)  
        } catch(e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }

    return (
        <AdminMovieScheduleContext.Provider 
        value={{movieSchedules, movieSchedule, loading, handleGetMovieScheduleList, handleGetMovieScheduleByID, handleCreateMovieSchedule, handleUpdateMovieSchedule}}>
            {children}
        </AdminMovieScheduleContext.Provider>
    )
}