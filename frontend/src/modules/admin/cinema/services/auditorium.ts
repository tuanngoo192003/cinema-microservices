import { IPagination, IResponse } from "../../../core/models/core";
import {
  IAuditorium,
  IAuditoriumParam,
} from "../models/auditorium";
import api from "../../../core/services/axios";

let data: IAuditorium[] = [
  {
    auditorium_id: 1,
    auditorium_name: "Main Hall",
    rows: 10,
    columns: 30,
    is_deleted: true,
    created_by: "Admin",
    last_modified_by: "Admin",
    created_at: new Date().toISOString(),
    last_modified_at: new Date().toISOString(),
  },
  {
    auditorium_id: 2,
    auditorium_name: "Small Theater",
    rows: 10,
    columns: 15,
    is_deleted: false,
    created_by: "Admin",
    last_modified_by: "Admin",
    created_at: new Date().toISOString(),
    last_modified_at: new Date().toISOString(),
  },
  {
    auditorium_id: 3,
    auditorium_name: "Conference Room A",
    rows: 10,
    columns: 8,
    is_deleted: false,
    created_by: "Admin",
    last_modified_by: "Moderator",
    created_at: new Date().toISOString(),
    last_modified_at: new Date().toISOString(),
  },
  {
    auditorium_id: 4,
    auditorium_name: "Conference Room B",
    rows: 10,
    columns: 10,
    is_deleted: false,
    created_by: "Admin",
    last_modified_by: "Moderator",
    created_at: new Date().toISOString(),
    last_modified_at: new Date().toISOString(),
  },
  {
    auditorium_id: 5,
    auditorium_name: "Lecture Hall 1",
    rows: 10,
    columns: 20,
    is_deleted: false,
    created_by: "User1",
    last_modified_by: "User2",
    created_at: new Date().toISOString(),
    last_modified_at: new Date().toISOString(),
  },
  {
    auditorium_id: 6,
    auditorium_name: "Lecture Hall 2",
    rows: 10,
    columns: 22,
    is_deleted: false,
    created_by: "User3",
    last_modified_by: "User4",
    created_at: new Date().toISOString(),
    last_modified_at: new Date().toISOString(),
  },
  {
    auditorium_id: 7,
    auditorium_name: "Cinema Hall",
    rows: 10,
    columns: 50,
    is_deleted: false,
    created_by: "Admin",
    last_modified_by: "Admin",
    created_at: new Date().toISOString(),
    last_modified_at: new Date().toISOString(),
  },
  {
    auditorium_id: 8,
    auditorium_name: "Exhibition Hall",
    rows: 10,
    columns: 40,
    is_deleted: false,
    created_by: "User5",
    last_modified_by: "User6",
    created_at: new Date().toISOString(),
    last_modified_at: new Date().toISOString(),
  },
  {
    auditorium_id: 9,
    auditorium_name: "Music Hall",
    rows: 10,
    columns: 35,
    is_deleted: false,
    created_by: "Admin",
    last_modified_by: "Moderator",
    created_at: new Date().toISOString(),
    last_modified_at: new Date().toISOString(),
  },
  {
    auditorium_id: 10,
    auditorium_name: "Sports Arena",
    rows: 100,
    columns: 10,
    is_deleted: false,
    created_by: "User7",
    last_modified_by: "User8",
    created_at: new Date().toISOString(),
    last_modified_at: new Date().toISOString(),
  },
  {
    auditorium_id: 11,
    auditorium_name: "Sports Arena",
    rows: 100,
    columns: 10,
    is_deleted: false,
    created_by: "User7",
    last_modified_by: "User8",
    created_at: new Date().toISOString(),
    last_modified_at: new Date().toISOString(),
  },
];

// export const GetAuditoriumsList = (
//   page: number, perpage: number, auditoriumName: string
// ): Promise<IPagination<IAuditorium>> => {
//   return new Promise((resolve) => {

//     const startIndex = (page - 1) * perpage;
//     const endIndex = startIndex + perpage;

//     const paginatedData = data.slice(startIndex, endIndex);
//     const totalRecord = data.length;
//     const totalPage = Math.ceil(totalRecord / perpage);

//     setTimeout(
//       () =>
//         resolve({
//           data: paginatedData,
//           page,
//           perpage: perpage,
//           totalPage,
//           totalRecord,
//         }),
//       1000
//     );
//   });
// };

// export const GetAuditoriumByID = (
//   id: number
// ): Promise<IResponse<IAuditorium | undefined>> => {
//   return new Promise((resolve) => {
//     console.log(`Call API with request: ${id}`);

//     const auditorium = data.find((d) => d.auditorium_id === id);
//     const response: IResponse<IAuditorium | undefined> = {
//       message: auditorium ? "Get success" : "Get fail",
//       status: auditorium ? HttpStatusCode.Ok : HttpStatusCode.NotFound,
//       data: auditorium,
//     };
//     setTimeout(() => resolve(response), 1000);
//   });
// };

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
