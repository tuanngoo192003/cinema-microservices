import { IPagination, IResponse } from "../../../core/models/core";
import {
  IAuditorium,
  IAuditoriumParam,
  IAuditoriumSelect,
} from "../models/auditorium_admin";
import api from "../../../core/services/axios";

export const CreateAuditorium
  = async (body: IAuditoriumParam): Promise<IResponse<IAuditorium>> => {
    return new Promise((resolve, reject) => {
      api
        .post("/cinema/auditoriums", body)
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

export const GetAllAuditoriums
  = async (): Promise<IResponse<IAuditoriumSelect[]>> => {
    return new Promise((resolve, reject) => {
      api
        .get(`/cinema/auditoriums/all`)
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

export const GetAuditoriumsList
  = async (page: number, perpage: number, auditoriumName: string): Promise<IPagination<IAuditorium>> => {
    return new Promise((resolve, reject) => {
      api
        .get(`/cinema/auditoriums?page=${page}&perpage=${perpage}&auditoriumName=${auditoriumName}`)
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

export const GetAuditoriumByID
  = async (id: number): Promise<IResponse<IAuditorium>> => {
    return new Promise((resolve, reject) => {
      api
        .get(`/cinema/auditorium/${id}`)
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
