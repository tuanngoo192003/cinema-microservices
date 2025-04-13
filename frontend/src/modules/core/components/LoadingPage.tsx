import { Spin } from 'antd';
import React from "react";

export const LoadingPage: React.FC = () => {
    return (
        <div style={{ textAlign: "center", marginTop: 20 }}>
            <Spin size="large" />
        </div>
    );
};