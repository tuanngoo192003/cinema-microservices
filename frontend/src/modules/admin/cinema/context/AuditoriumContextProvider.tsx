import React, { useState } from "react";
import { AuditoriumContext } from "./Context";
import { CreateAuditorium, GetAuditoriumsList } from "../services";
import { IPagination } from "../../../core/models/core";
import { IAuditorium, IAuditoriumParam } from "../models/Auditorium";
import { HttpStatusCode } from "axios";
import { useNavigate } from "react-router-dom";
import { ADMIN_AUDITORIUMS } from "../../../core/constants/redirectURI";

interface AuditoriumProps {
    children?: React.ReactNode
}

export const AuditoriumContextProvider: React.FC<{children: React.ReactNode}> = ({children}: AuditoriumProps) => {
    const navigate = useNavigate()
    const [auditoriums, setAuditoriums] = useState<IPagination<IAuditorium> | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

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
        <AuditoriumContext.Provider value={{ auditoriums, loading, handleCreateAuditorium, handleGetAuditoriumList }}>
             {children}
        </AuditoriumContext.Provider>
    )
}