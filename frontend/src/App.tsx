import { useState } from "react";
import { Button } from "antd"; // Import Ant Design Button
import { SmileOutlined } from "@ant-design/icons"; // Import an icon from Ant Design
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./index.css"; // Import Tailwind styles

function App() {
    const [count, setCount] = useState(0);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            {/* Logos */}
            <div className="flex space-x-4">
                <a href="https://vite.dev" target="_blank">
                    <img src={viteLogo} className="w-24" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="w-24" alt="React logo" />
                </a>
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold text-blue-600 mt-4">Vite + React + Antd + Tailwind</h1>

            {/* Card */}
            <div className="card bg-white p-6 rounded-lg shadow-md mt-6 text-center">
                <Button
                    type="primary"
                    icon={<SmileOutlined />}
                    className="!bg-blue-500 !text-white !px-6 !py-2 !rounded-lg"
                    onClick={() => setCount(count + 1)}
                >
                    Count is {count}
                </Button>

                <p className="mt-4 text-gray-600">
                    Edit <code className="bg-gray-200 p-1 rounded">src/App.tsx</code> and save to test HMR.
                </p>
            </div>

            {/* Docs Link */}
            <p className="read-the-docs mt-6 text-gray-500">
                Click on the Vite and React logos to learn more.
            </p>
        </div>
    );
}

export default App;