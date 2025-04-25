import React, { useEffect } from "react";
import "../../../App.css";
import { Col, Image, Layout, Row } from "antd";
import { Content } from "antd/es/layout/layout";
import { AppFooter } from "../../core/components/AppFooter.tsx";
import Title from "antd/es/typography/Title";
import { MOVIE_DETAILS } from "../../core/constants/redirectURI.ts";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { MovieSchedulesUI } from "./MovieSchedulesUI.tsx";
import { useMovie } from "../hooks/index.ts";
import { LoadingPage } from "../../core/components/LoadingPage.tsx";

const MovieDetailsUI: React.FC = () => {
  const { movie, loading, handleGetMovieDetail } = useMovie();
  const { id } = useParams();
  useEffect(() => {
    handleGetMovieDetail(id as unknown as number);
  }, [id]);
  console.log(id);
  const { t } = useTranslation();
  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <Layout>
          <Content style={{ paddingTop: "-5rem" }}>
            {" "}
            {/* Adjust padding to offset the fixed header */}
            <Row
              gutter={[16, 0]}
              justify="center"
              align="middle"
              style={{
                marginLeft: "20rem",
                marginRight: "20rem",
                minHeight: "100vh",
                display: "flex",
              }}
            >
              {/* Image Column */}
              <Col
                xs={24}
                md={10}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  src={movie?.imageURL}
                  alt={""}
                  style={{
                    borderRadius: "12px",
                    width: "100%",
                    height: "23rem",
                    objectFit: "contain",
                    backgroundColor: "#fff",
                    display: "block",
                  }}
                />
              </Col>

              {/* Description Column */}
              <Col
                xs={24}
                md={14}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <div style={{ marginTop: "-1rem" }}>
                  {" "}
                  {/* Reduce default spacing */}
                  <Title level={3} style={{ marginBottom: "0.5rem" }}>
                    <a href={MOVIE_DETAILS}>{movie?.movieName}</a>
                  </Title>
                  <p style={{ marginBottom: "0.5rem" }}>{movie?.description}</p>
                  <Title level={5} style={{ marginBottom: "0.25rem" }}>
                    {t("labels.titles.movie_genre")} : {movie?.movieGenre}
                  </Title>
                  <Title level={5} style={{ marginBottom: "0.25rem" }}>
                    {t("labels.titles.release_date")} : {movie?.releaseDate.split("T")[0]}
                  </Title>
                  <Title level={5} style={{ marginTop: "0.25rem" }}>
                    {t("labels.titles.duration")} : {movie?.duration}p
                  </Title>
                </div>
              </Col>
              <Col xs={24} md={24}>
                {movie?.movieId ? (
                  <MovieSchedulesUI movieId={movie?.movieId} />
                ) : (
                  <></>
                )}
              </Col>
            </Row>
          </Content>
          <div>
            <AppFooter />
          </div>
        </Layout>
      )}
    </>
  );
};

export default MovieDetailsUI;
