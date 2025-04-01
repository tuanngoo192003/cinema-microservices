import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuditorium } from "../hooks";
import { Select } from "antd";
import { LoadingPage } from "../../../core/components/LoadingPage";
import { IAuditoriumSelect } from "../models/auditorium_admin";

interface AuditoriumSelectUIProps {
    onSelectAuditorium: (auditoriumId: number) => void;
}

const AuditoriumSelectUI: React.FC<AuditoriumSelectUIProps> = ({ onSelectAuditorium }) => {
    const { t } = useTranslation()
    const [auditoriums, setAuditoriums] = useState<IAuditoriumSelect[]>([])
    const { auditoriumList, loading, handleGetAllAuditoriums } = useAuditorium()

    useEffect(() => {
        handleGetAllAuditoriums()
    }, [])

    useEffect(() => {
        setAuditoriums(auditoriumList)
    }, [auditoriumList])

    const handleChange = (value: number) => {
        onSelectAuditorium(value);
    };

    return (
        <>
            {loading ? (<LoadingPage />) : (
                <Select
                    placeholder={t("Select a movie")}
                    style={{ width: "100%" }}
                    onChange={handleChange}
                    options={auditoriums.map(auditorium => ({
                        value: auditorium.auditorium_id,
                        label: auditorium.auditorium_name,
                    }))}
                />
            )}

        </>
    )
}

export default AuditoriumSelectUI