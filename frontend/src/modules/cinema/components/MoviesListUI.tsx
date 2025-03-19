import { Tabs, Row, Col } from "antd";
import { useState } from "react";
import chinatsu from "../../../assets/千夏.jpg";
import betacinema from "../../../assets/betacinema.png";
import {MovieItemUI} from "./MovieItemUI.tsx";

const { TabPane } = Tabs;

export const MovieListUI = () => {
    const [activeTab, setActiveTab] = useState("1");
    console.log(activeTab)
    // Movie Data for Different Tabs
    const movieData = {
        "1": [
            { imageSrc: chinatsu, title: "Title 1", genre: "Romcom", duration: "120p" },
            { imageSrc: betacinema, title: "Title 2", genre: "Horror", duration: "90p" },
            { imageSrc: betacinema, title: "Title 3", genre: "Horror", duration: "90p" },
            { imageSrc: betacinema, title: "Title 4", genre: "Horror", duration: "90p" },
            { imageSrc: chinatsu, title: "Title 5", genre: "Romcom", duration: "120p" },
        ],
        "2": [
            { imageSrc: betacinema, title: "Title A", genre: "Action", duration: "110p" },
            { imageSrc: chinatsu, title: "Title B", genre: "Sci-fi", duration: "100p" },
            { imageSrc: betacinema, title: "Title C", genre: "Drama", duration: "95p" },
            { imageSrc: chinatsu, title: "Title D", genre: "Fantasy", duration: "130p" },
        ],
    };

    return (
        <Tabs style={{marginTop: "5rem"}} defaultActiveKey="1" onChange={setActiveTab} centered>
            <TabPane tab="Category 1" key="1">
                <Row gutter={[40, 50]} style={{ marginLeft: "20rem", marginRight: "20rem" }}>
                    {movieData["1"].map((movie, index) => (
                        <Col xs={24} md={6} key={index}>
                            <MovieItemUI {...movie} />
                        </Col>
                    ))}
                </Row>
            </TabPane>
            <TabPane tab="Category 2" key="2">
                <Row gutter={[40, 50]} style={{ marginLeft: "20rem", marginRight: "20rem" }}>
                    {movieData["2"].map((movie, index) => (
                        <Col xs={24} md={6} key={index}>
                            <MovieItemUI {...movie} />
                        </Col>
                    ))}
                </Row>
            </TabPane>
        </Tabs>
    );
};