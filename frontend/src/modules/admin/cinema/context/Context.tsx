import { createContext } from "react";
import { IPagination } from "../../../core/models/core"
import { IAuditorium, IAuditoriumParam } from "../models/Auditorium"

type AuditoriumContextType = {
    auditoriums: IPagination<IAuditorium> | null;
    loading: boolean 
    handleCreateAuditorium: (body: IAuditoriumParam) => Promise<void>
    handleGetAuditoriumList: (page: number, perpage: number, auditoriumName: string) => Promise<void>
}

export const AuditoriumContext = createContext<AuditoriumContextType>({
    auditoriums: null,
    loading: false, 
    handleCreateAuditorium: async () => {},
    handleGetAuditoriumList: async () => {},
})