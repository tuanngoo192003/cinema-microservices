import { IPagination, IResponse } from "../../core/models/core";
import api from "../../core/services/axios";
import { IMovie, IMovieItem } from "../models/movie";

export const GetMovieListApi 
    = async (page: number, perpage: number, movieName: string, movieGenre: string) : Promise<IPagination<IMovieItem>> => {
        return new Promise((resolve, reject) => {
        api
            .get<IPagination<IMovie>>(`/cinema/movies?page=${page}&perpage=${perpage}&movieName=${movieName}&movieGenre=${movieGenre}`) 
            .then((res) => {
                resolve(res.data)
            })
            .catch((err) => {
                reject(err)
            })    
    })
}

export const GetMovieByID 
    = async (id: number) : Promise<IResponse<IMovie>> => {
        return new Promise((resolve, reject) => {
            api 
                .get<IResponse<IMovie>>(`/cinema/movies/${id}`)
                .then((res) => {
                    resolve(res.data)
                })
                .catch((err) => {
                    reject(err)
                })    
        })
    } 