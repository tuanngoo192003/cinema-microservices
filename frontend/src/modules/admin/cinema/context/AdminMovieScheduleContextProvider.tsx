import React, { useState } from "react"
import { AdminMovieScheduleContext } from "./Context"
import { IPagination } from "../../../core/models/core"
import { ICreateMovieScheduleParam, IGetByIDMovieSchedule, IMovieSchedule, IUpdateMovieScheduleParam } from "../models/schedule"
import { CreateMovieSchedule, GetMovieSchedules, GetMovieSchedulesDetails, UpdateMovieSchedule } from "../services/schedule"
import { useNavigate } from "react-router-dom"
import { ADMIN_MOVIE_SCHEDULES } from "../../../core/constants/redirectURI"

interface MovieScheduleProps {
    children?: React.ReactNode
}

export const AdminMovieScheduleContextProvider: React.FC<{children: React.ReactNode}> = ({children} : MovieScheduleProps) => {

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
            await CreateMovieSchedule(body)
            setTimeout(() => {
                navigate(ADMIN_MOVIE_SCHEDULES)
            }, 2000)  
        } catch(e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }

    const handleUpdateMovieSchedule = async (body: IUpdateMovieScheduleParam) => {
        setLoading(true)
        try {
            await UpdateMovieSchedule(body)
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