import React, { useEffect } from "react";
import "../../../App.css";
import { Col, Image, Layout, Row } from "antd";
import { Content } from "antd/es/layout/layout";
import { AppFooter } from "../../core/components/AppFooter.tsx";
import Title from "antd/es/typography/Title";
import { MOVIE_DETAILS } from "../../core/constants/redirectURI.ts";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import chinatsu from "../../../assets/千夏.jpg";
import { MovieSchedulesUI } from "./MovieSchedulesUI.tsx";
import { useMovie } from "../hooks/index.ts";
import { IMovie } from "../models/movie.ts";
import { LoadingPage } from "../../core/components/LoadingPage.tsx";

const mockMovieDetails = {
  movieId: 1,
  imageURL: chinatsu,
  movieName: "青いの箱",
  description:
    "本作は、スポーツ名門校である栄明学園を舞台に、男子バドミントン部員の猪股大喜と、女子バスケットボール部のスター選手である鹿野千夏、そして新体操部の蝶野雛との青春ラブストーリーを描いています。大喜は毎朝体育館で自主練習を行い、同じく朝練をしている千夏に密かな想いを寄せています。ある日、千夏の両親が海外赴任することになり、彼女は大喜の家に居候することに。同じ屋根の下で生活する中で、大喜は千夏にふさわしい存在になるため、全国大会出場を目指して努力を重ねます。一方、幼馴染の雛もまた、大喜に特別な感情を抱いており、三人の関係性が物語の中で繊細に描かれています。",
  movieGenre: "romcom",
  releaseDate: "12/12/2024",
  duration: "120p",
} as unknown as IMovie;

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
                    {t("labels.titles.release_date")} : {movie?.releaseDate}
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
