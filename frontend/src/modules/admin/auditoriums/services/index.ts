import { HttpStatusCode } from "axios";
import { IPagination } from "../../../core/models/core";
import {
  Auditorium,
  CreateRequest,
  Response,
  SearchRequest,
} from "../models/Auditorium";

let data: Auditorium[] = [
  {
    auditorium_id: 1,
    auditorium_name: "Main Hall",
    capacity: 300,
    is_deleted: true,
    created_by: "Admin",
    last_modified_by: "Admin",
    created_at: new Date().toISOString(),
    last_modified_at: new Date().toISOString(),
  },
  {
    auditorium_id: 2,
    auditorium_name: "Small Theater",
    capacity: 150,
    is_deleted: false,
    created_by: "Admin",
    last_modified_by: "Admin",
    created_at: new Date().toISOString(),
    last_modified_at: new Date().toISOString(),
  },
  {
    auditorium_id: 3,
    auditorium_name: "Conference Room A",
    capacity: 80,
    is_deleted: false,
    created_by: "Admin",
    last_modified_by: "Moderator",
    created_at: new Date().toISOString(),
    last_modified_at: new Date().toISOString(),
  },
  {
    auditorium_id: 4,
    auditorium_name: "Conference Room B",
    capacity: 100,
    is_deleted: false,
    created_by: "Admin",
    last_modified_by: "Moderator",
    created_at: new Date().toISOString(),
    last_modified_at: new Date().toISOString(),
  },
  {
    auditorium_id: 5,
    auditorium_name: "Lecture Hall 1",
    capacity: 200,
    is_deleted: false,
    created_by: "User1",
    last_modified_by: "User2",
    created_at: new Date().toISOString(),
    last_modified_at: new Date().toISOString(),
  },
  {
    auditorium_id: 6,
    auditorium_name: "Lecture Hall 2",
    capacity: 220,
    is_deleted: false,
    created_by: "User3",
    last_modified_by: "User4",
    created_at: new Date().toISOString(),
    last_modified_at: new Date().toISOString(),
  },
  {
    auditorium_id: 7,
    auditorium_name: "Cinema Hall",
    capacity: 500,
    is_deleted: false,
    created_by: "Admin",
    last_modified_by: "Admin",
    created_at: new Date().toISOString(),
    last_modified_at: new Date().toISOString(),
  },
  {
    auditorium_id: 8,
    auditorium_name: "Exhibition Hall",
    capacity: 400,
    is_deleted: false,
    created_by: "User5",
    last_modified_by: "User6",
    created_at: new Date().toISOString(),
    last_modified_at: new Date().toISOString(),
  },
  {
    auditorium_id: 9,
    auditorium_name: "Music Hall",
    capacity: 350,
    is_deleted: false,
    created_by: "Admin",
    last_modified_by: "Moderator",
    created_at: new Date().toISOString(),
    last_modified_at: new Date().toISOString(),
  },
  {
    auditorium_id: 10,
    auditorium_name: "Sports Arena",
    capacity: 1000,
    is_deleted: false,
    created_by: "User7",
    last_modified_by: "User8",
    created_at: new Date().toISOString(),
    last_modified_at: new Date().toISOString(),
  },
  {
    auditorium_id: 11,
    auditorium_name: "Sports Arena",
    capacity: 1000,
    is_deleted: false,
    created_by: "User7",
    last_modified_by: "User8",
    created_at: new Date().toISOString(),
    last_modified_at: new Date().toISOString(),
  },
];

export const GetAuditoriumsList = (
  request: SearchRequest
): Promise<IPagination<Auditorium>> => {
  return new Promise((resolve) => {
    console.log(`Call API with request: ${JSON.stringify(request)}`);

    const { page, pageSize } = request;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const paginatedData = data.slice(startIndex, endIndex);
    const totalRecord = data.length;
    const totalPage = Math.ceil(totalRecord / pageSize);

    setTimeout(
      () =>
        resolve({
          data: paginatedData,
          page,
          perpage: pageSize,
          totalPage,
          totalRecord,
        }),
      1000
    );
  });
};

export const CreateAuditorium = (
  request: CreateRequest
): Promise<Response<string>> => {
  return new Promise((resolve) => {
    console.log(`Call API with request: ${JSON.stringify(request)}`);

    const newAuditorium: Auditorium = {
      auditorium_id: data.length + 1,
      auditorium_name: request.auditorium_name,
      capacity: request.rows * request.columns,
      created_by: "Nguyen Dinh Son",
      last_modified_by: "Nguyen Dinh Son",
      created_at: new Date().toISOString(),
      last_modified_at: new Date().toISOString(),
      is_deleted: false,
    };

    data = [...data, newAuditorium];

    setTimeout(
      () =>
        resolve({
          data: "paginatedData",
          status: HttpStatusCode.Ok,
          message: "Create success",
        }),
      1000
    );
  });
};

export const GetAuditoriumByID = (
  id: number
): Promise<Response<Auditorium | undefined>> => {
  return new Promise((resolve) => {
    console.log(`Call API with request: ${id}`);

    const auditorium = data.find((d) => d.auditorium_id === id);
    const response: Response<Auditorium | undefined> = {
      message: auditorium ? "Get success" : "Get fail",
      status: auditorium ? HttpStatusCode.Ok : HttpStatusCode.NotFound,
      data: auditorium,
    };
    setTimeout(() => resolve(response), 1000);
  });
};
