import React, { useState } from "react";
import { AuditoriumContext } from "./Context";
import { CreateAuditorium, GetAllAuditoriums, GetAuditoriumsList } from "../services/auditorium";
import { IPagination } from "../../../core/models/core";
import { AxiosError, HttpStatusCode } from "axios";
import { ErrorResponse, useNavigate } from "react-router-dom";
import { ADMIN_AUDITORIUMS } from "../../../core/constants/redirectURI";
import { IAuditorium, IAuditoriumParam, IAuditoriumSelect } from "../models/auditorium_admin";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
import { HandleError } from "../../../core/services/axios";

interface AuditoriumProps {
    children?: React.ReactNode
}

export const AuditoriumContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }: AuditoriumProps) => {
    const { enqueueSnackbar } = useSnackbar();
    const { t } = useTranslation()
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
                enqueueSnackbar(t('labels.success'), { variant: "success" });
                navigate(ADMIN_AUDITORIUMS);
            }
        } catch (error) {
            const err = HandleError(error as Error | AxiosError<ErrorResponse>);
            enqueueSnackbar(err.errors["message"], { variant: "error" });
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