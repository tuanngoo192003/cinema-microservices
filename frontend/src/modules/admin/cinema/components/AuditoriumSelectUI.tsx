import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuditorium } from "../hooks";
import { Select } from "antd";
import { IAuditoriumSelect } from "../models/auditorium";

interface AuditoriumSelectUIProps {
    onSelectAuditorium: (auditoriumId: number) => void;
}

const AuditoriumSelectUI: React.FC<AuditoriumSelectUIProps> = ({onSelectAuditorium}) => {
    const { t } = useTranslation()
    const [ auditoriums, setAuditoriums ] = useState<IAuditoriumSelect[]>([])
    const [selectData, setSelectData] = useState<IAuditoriumSelect[]>([])
    const { auditoriumList, handleGetAllAuditoriums } = useAuditorium()

    useEffect(() => {
        handleGetAllAuditoriums()
        setAuditoriums(auditoriumList)
    }, [])

    useEffect(() => {
        setSelectData(auditoriums)
    }, [auditoriums])

    const handleChange = (value: number) => {
        onSelectAuditorium(value);
    };

    return (
        <>
            <Select
                placeholder={t("Select a movie")}
                style={{ width: "100%" }}
                onChange={handleChange}
                options={selectData.map(auditorium => ({
                    value: auditorium.auditorium_id,
                    label: auditorium.auditorium_name,
                }))}
            />
        </>
    )
} 

export default AuditoriumSelectUI