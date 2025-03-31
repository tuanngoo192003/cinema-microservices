import React from "react";
import "../../../App.css"
import {Button, Image, Layout} from "antd";
import {Content} from "antd/es/layout/layout";
import {useTranslation} from "react-i18next";
import Title from "antd/es/typography/Title";
import {MOVIE_DETAILS_FORMAT_URI} from "../../core/constants/redirectURI.ts";
import { IMovieItem } from "../models/movie.ts";
import { useNavigate } from "react-router-dom";

export const MovieItemUI: React.FC<IMovieItem> = ({ movieId, movieName, duration, imageURL, movieGenre }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const navigateTo = () => {
        navigate(MOVIE_DETAILS_FORMAT_URI(movieId))
    };
    return (
        <>
            <Layout>
                <Content>
                    <Image src={imageURL} alt={""}
                           style={{
                               borderRadius: "12px",
                               height: "23rem",     // Set an absolute height
                               objectFit: "contain", // Ensures the entire image fits inside
                               backgroundColor: "#fff", // White background for missing parts
                               display: "block"
                           }}
                    />
                    <div style={{ marginTop: "1rem" }}>
                        <div>
                            <Title level={3}>
                                <a href={MOVIE_DETAILS_FORMAT_URI(1)}>{movieName ? movieName : "青いの箱"}</a>
                            </Title>
                            <Title level={5} style={{ marginBottom: 0 }}>
                                {t("labels.titles.movie_genre")} : {movieGenre}
                            </Title>

                            <Title level={5} style={{ marginTop: 4 }}>
                                {t("labels.titles.duration")} : {duration}p
                            </Title>
                        </div>
                        <Button className="app-btn" style={{ marginTop: "1rem" }} onClick={navigateTo}>
                            {t("labels.buttons.buy_ticket")}
                        </Button>
                    </div>
                </Content>
            </Layout>
        </>
    )
}