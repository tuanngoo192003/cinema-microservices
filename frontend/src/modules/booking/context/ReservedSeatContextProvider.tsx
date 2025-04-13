import React, { useState } from "react";
import { ReservedSeatContext } from "./Context";
import { IReservedSeat, IReservedSeatParam, IReservedSeatSearch } from "../models/reserved_seat";
import { GetReservedSeat, RemoveReservedSeat, ReservedSeat } from "../services/reserved_seat";
import { useSnackbar } from "notistack";
import { HandleError } from "../../core/services/axios";
import { AxiosError } from "axios";
import { ErrorResponse } from "react-router-dom";
import { useTranslation } from "react-i18next";

type ReservedSeatProviderProps = {
    children: React.ReactNode
}

const ReservedSeatContextProvider: React.FC<{children: React.ReactNode}> = ({children}: ReservedSeatProviderProps) => {
    const [reservedSeat, setReservedSeat] = useState<IReservedSeat | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const { enqueueSnackbar } = useSnackbar();
    const { t } = useTranslation();

    const handleGetResevedSeat = async (search: IReservedSeatSearch) => {
        setLoading(true)
        try {
            const res = await GetReservedSeat(search)
            setReservedSeat(res.data)
        } catch(e) {
            console.log(e);
        } finally {
            setLoading(false)
        }
    }

    const handleReservedSeat = async (body: IReservedSeatParam): Promise<boolean> => {
        setLoading(true)
        try {
            const res = await ReservedSeat(body)
            if (res.status == 400) {
                enqueueSnackbar(t('messages.seat_reserved'), { variant: "error" });
                return false;   
            }
            return true; 
        } catch(e) {
            const err = HandleError(e as Error | AxiosError<ErrorResponse>);
            enqueueSnackbar(err.errors["message"], { variant: "error" });
            console.log(e);
            return false; 
        } finally {
            setLoading(false)
        }
    }

    const handleRemoveReservedSeat = async (id: number) => {
        setLoading(true)
        try {
            await RemoveReservedSeat(id)
        } catch(e) {
            console.log(e);
        } finally {
            setLoading(false)
        }
    }

    return (
        <ReservedSeatContext.Provider value={{reservedSeat, loading, handleReservedSeat, handleGetResevedSeat, handleRemoveReservedSeat}}>
            {children}
        </ReservedSeatContext.Provider>
    )
}

export default ReservedSeatContextProvider