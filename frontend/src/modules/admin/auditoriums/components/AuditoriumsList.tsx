import { Button, Space, Table, Tag, Typography } from "antd";
import type { TablePaginationConfig, TableProps } from "antd";
import { Auditorium } from "../models/Auditorium";
import { useEffect, useState } from "react";
import { GetAuditoriumsList } from "../services";
import { useNavigate } from "react-router-dom";
import { ADMIN_AUDITORIUMS_CREATE } from "../../../core/constants/redirectURI";
import EditButton from "./EditButton";

type DataType = Auditorium;

const columns: TableProps<DataType>["columns"] = [
  {
    title: "Id",
    dataIndex: "auditorium_id",
    key: "auditorium_id",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Name",
    dataIndex: "auditorium_name",
    key: "auditorium_name",
  },
  {
    title: "Capacity",
    dataIndex: "capacity",
    key: "capacity",
  },
  {
    title: "Created By",
    dataIndex: "created_by",
    key: "created_by",
  },
  {
    title: "Last Modified By",
    dataIndex: "last_modified_by",
    key: "last_modified_by",
  },
  {
    title: "Status",
    key: "is_deleted",
    dataIndex: "is_deleted",
    render: (_, { is_deleted }) => {
      const color = is_deleted ? "geekblue" : "green";
      const status = is_deleted ? "ACTIVE" : "DELETED";
      return (
        <Tag color={color} key={status}>
          {status.toUpperCase()}
        </Tag>
      );
    },
  },
  {
    title: "Action",
    key: "action",
    render: (_, { auditorium_id }) => <EditButton id={auditorium_id} />,
  },
];

export default function AuditoriumsList() {
  const [data, setData] = useState<Auditorium[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const pageSize = 5;
  const navigate = useNavigate();

  const fetchData = async (page: number) => {
    setLoading(true);
    try {
      const response = await GetAuditoriumsList({ page, pageSize });
      const result = response.data;
      setData(result);
      setTotalItems(response.totalRecord);
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handleTableChange = (pagination: TablePaginationConfig) => {
    if (pagination.current) {
      setCurrentPage(pagination.current);
    }
  };

  return (
    <>
      <Typography.Title style={{ textAlign: "center", marginBottom: "24px" }}>
        List Auditoriums
      </Typography.Title>
      <Space style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          onClick={() => navigate(ADMIN_AUDITORIUMS_CREATE)}
        >
          Create
        </Button>
      </Space>
      <Table<Auditorium>
        columns={columns}
        dataSource={data}
        rowKey="auditorium_id"
        loading={loading}
        pagination={{
          current: currentPage,
          pageSize,
          total: totalItems,
          showSizeChanger: false,
        }}
        onChange={handleTableChange}
      />
    </>
  );
}
