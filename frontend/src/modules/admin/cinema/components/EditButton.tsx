import { EditOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import { useNavigate } from "react-router-dom";
import "../../../../App.css";
import { ADMIN_AUDITORIUMS_UPDATE_FORMAT_URI } from "../../../core/constants/redirectURI";

type Props = {
  id: number;
};

export default function EditButton({ id }: Props) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(ADMIN_AUDITORIUMS_UPDATE_FORMAT_URI(id));
  };
  return (
    <Space size="middle">
      <Button className="app-btn" icon={<EditOutlined />} onClick={handleClick} />
    </Space>
  );
}
