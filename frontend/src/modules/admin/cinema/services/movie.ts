import { IPagination, IResponse } from "../../../core/models/core";
import api from "../../../core/services/axios";
import { ICreateMovieParam, IMovie, IMovieSelect, IUpdateMovieParam } from "../models/movie";

export const GetAllMovies
    = async (): Promise<IResponse<IMovieSelect[]>> => {
        return new Promise((resolve, reject) => {
            api
                .get(`/cinema/movies/all`)
                .then((res) => {
                    resolve(res.data)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }

export const GetMovieList
    = async (page: number, perpage: number, movieName: string, movieGenre: string,
        releaseStart: string, releaseEnd: string
    ): Promise<IPagination<IMovie>> => {
        return new Promise((resolve, reject) => {
            api
                .get(`/cinema/movies?page=${page}&perpage=${perpage}&movieName=${movieName}&movieGenre=${movieGenre}&releaseStart=${releaseStart}&releaseEnd=${releaseEnd}`)
                .then((res) => {
                    resolve(res.data)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }

export const GetMovieByID
    = async (id: number): Promise<IResponse<IMovie>> => {
        return new Promise((resolve, reject) => {
            api
                .get(`/cinema/movies/${id}`)
                .then((res) => {
                    resolve(res.data)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }

export const CreateMovie
    = async (body: ICreateMovieParam): Promise<void> => {
        return new Promise((resolve, reject) => {
            api
                .post(`/cinema/movies`, body)
                .then((res) => {
                    resolve(res.data)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }

export const UpdateMovie
    = async (body: IUpdateMovieParam): Promise<void> => {
        return new Promise((resolve, reject) => {
            api
                .put(`/cinema/movies`, body)
                .then((res) => {
                    resolve(res.data)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }