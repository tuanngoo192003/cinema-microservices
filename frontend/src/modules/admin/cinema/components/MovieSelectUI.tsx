import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMovie } from "../hooks";
import { IMovieSelect } from "../models/movie";
import { Select } from "antd";

interface MovieSelectUIProps {
    onSelectMovie: (movieId: number) => void;
}

const MovieSelectUI: React.FC<MovieSelectUIProps> = ({onSelectMovie}) => {
    const { t } = useTranslation()
    const [movies, setMovies] = useState<IMovieSelect[]>([])
    const [selectData, setSelectData] = useState<IMovieSelect[]>([])
    const { movieList, handleGetAllMovies } = useMovie()

    useEffect(() => {
        handleGetAllMovies()
        setMovies(movieList)
    }, [])

    useEffect(() => {
        setSelectData(movies)
    }, [movies])

    const handleChange = (value: number) => {
        onSelectMovie(value);
    };

    return (
        <>
            <Select
                placeholder={t("Select a movie")}
                style={{ width: "100%" }}
                onChange={handleChange}
                options={selectData.map(movie => ({
                    value: movie.movieId,
                    label: movie.movieName,
                }))}
            />
        </>
    )
} 

export default MovieSelectUI