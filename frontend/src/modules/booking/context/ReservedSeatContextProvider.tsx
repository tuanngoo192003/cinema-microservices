import React, { useState } from "react";
import { ReservedSeatContext } from "./Context";
import { IReservedSeat, IReservedSeatParam, IReservedSeatSearch } from "../models/reserved_seat";
import { GetReservedSeat, RemoveReservedSeat, ReservedSeat } from "../services/reserved_seat";

type ReservedSeatProviderProps = {
    children: React.ReactNode
}

const ReservedSeatContextProvider: React.FC<{children: React.ReactNode}> = ({children}: ReservedSeatProviderProps) => {
    const [reservedSeat, setReservedSeat] = useState<IReservedSeat | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

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

    const handleReservedSeat = async (body: IReservedSeatParam) => {
        setLoading(true)
        try {
            const res = await ReservedSeat(body)
        } catch(e) {
            console.log(e);
        } finally {
            setLoading(false)
        }
    }

    const handleRemoveReservedSeat = async (id: number) => {
        setLoading(true)
        try {
            const res = await RemoveReservedSeat(id)
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