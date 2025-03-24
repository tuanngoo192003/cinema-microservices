import { Form, Input, InputNumber, Typography } from "antd";

export default function AuditoriumCreate() {
  return (
    <>
      <Typography.Title style={{ textAlign: "center", marginBottom: "24px" }}>
        Create Auditorium
      </Typography.Title>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="vertical"
        style={{ maxWidth: 1000 }}
      >
        <Form.Item label="Auditorium's name">
          <Input />
        </Form.Item>
        <Form.Item label="Rows number">
          <InputNumber />
        </Form.Item>
        <Form.Item label="Colums number">
          <InputNumber />
        </Form.Item>
      </Form>
    </>
  );
}
