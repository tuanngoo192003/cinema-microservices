import React, { useState } from "react";
import { AuditoriumContext } from "./Context";
import { CreateAuditorium, GetAllAuditoriums, GetAuditoriumsList } from "../services/auditorium";
import { IPagination } from "../../../core/models/core";
import { HttpStatusCode } from "axios";
import { useNavigate } from "react-router-dom";
import { ADMIN_AUDITORIUMS } from "../../../core/constants/redirectURI";
import { IAuditorium, IAuditoriumParam, IAuditoriumSelect } from "../models/auditorium";

interface AuditoriumProps {
    children?: React.ReactNode
}

export const AuditoriumContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }: AuditoriumProps) => {
    const navigate = useNavigate()
    const [auditoriums, setAuditoriums] = useState<IPagination<IAuditorium> | null>(null)
    const [auditoriumList, setAuditoriumList] = useState<IAuditoriumSelect[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    const handleGetAllAuditoriums = async () => {
        setLoading(true)
        try {
            const result = await GetAllAuditoriums();
            setAuditoriumList(result.data)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    };

    const handleCreateAuditorium = async (body: IAuditoriumParam) => {
        setLoading(true)
        try {
            const result = await CreateAuditorium(body);
            if (result.status == HttpStatusCode.Ok) {
                navigate(ADMIN_AUDITORIUMS);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    };

    const handleGetAuditoriumList = async (page: number, perpage: number, auditoriumName: string) => {
        setLoading(true)
        try {
            const res = await GetAuditoriumsList(page, perpage, auditoriumName);
            setAuditoriums(res)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    return (
        <AuditoriumContext.Provider value={{ auditoriums, auditoriumList, loading, handleCreateAuditorium, handleGetAuditoriumList, handleGetAllAuditoriums }}>
            {children}
        </AuditoriumContext.Provider>
    )
}