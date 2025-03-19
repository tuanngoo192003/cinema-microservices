import React from "react";
import "../../../App.css"
import {Button, Image, Layout} from "antd";
import {Content} from "antd/es/layout/layout";
import {useTranslation} from "react-i18next";
import Title from "antd/es/typography/Title";
import {MOVIE_DETAILS_FORMAT} from "../../core/constants/redirectURI.ts";

interface MovieItemProps {
    imageSrc: string;
    title: string;
    genre: string;
    duration: string;
}

export const MovieItemUI: React.FC<MovieItemProps> = ({ imageSrc, title, genre, duration }) => {
    const { t } = useTranslation();
    return (
        <>
            <Layout>
                <Content>
                    <Image src={imageSrc} alt={title}
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
                                <a href={MOVIE_DETAILS_FORMAT(1)}>青いの箱</a>
                            </Title>
                            <Title level={5} style={{ marginBottom: 0 }}>
                                {t("labels.titles.movie_genre")} : {genre}
                            </Title>

                            <Title level={5} style={{ marginTop: 4 }}>
                                {t("labels.titles.duration")} : {duration}
                            </Title>
                        </div>
                        <Button className="app-btn" style={{ marginTop: "1rem" }}>
                            {t("labels.buttons.buy_ticket")}
                        </Button>
                    </div>
                </Content>
            </Layout>
        </>
    )
}