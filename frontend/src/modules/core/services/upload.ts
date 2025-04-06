import { FileResponse, IResponse } from "../models/core"
import api from "./axios"

export const UploadFileAPI
    = async (file: File): Promise<IResponse<FileResponse>> => {
        const formData = new FormData()
        formData.append("image", file)

        return new Promise((resolve, reject) => {
            api
                .post<IResponse<FileResponse>>("/upload", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                })
                .then((res) => {
                    resolve(res.data)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }