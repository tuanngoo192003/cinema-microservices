import { EditOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { ADMIN_AUDITORIUMS_UPDATE_FORMAT } from "../../../core/constants/redirectURI";

type Props = {
  id: number;
};

export default function EditButton({ id }: Props) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(ADMIN_AUDITORIUMS_UPDATE_FORMAT(id));
  };
  return (
    <Space size="middle">
      <Button type="primary" icon={<EditOutlined />} onClick={handleClick} />
    </Space>
  );
}
