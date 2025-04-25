import React from "react";
import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

export const Page403: React.FC = () => {
    const navigate = useNavigate();
    return (
        <>
            <Result
                status="403"
                title="403"
                subTitle="Sorry, you don't have the authority to access this page."
                extra={
                    <Button type="primary" onClick={() => navigate("/")}>
                        Back Home
                    </Button>
                }
            />
        </>
    )
}