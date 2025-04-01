import { Tabs, Row, Col } from "antd";
import { useEffect, useState } from "react";
import chinatsu from "../../../assets/千夏.jpg";
import betacinema from "../../../assets/betacinema.png";
import { MovieItemUI } from "./MovieItemUI.tsx";
import { useMovie } from "../hooks/index.ts";
import { IMovieItem } from "../models/movie.ts";
import { LoadingPage } from "../../core/components/LoadingPage.tsx";

const { TabPane } = Tabs;

export const MovieListUI = () => {
    const { movies, loading, handleGetMovieList } = useMovie()
    const [currentPage, /* setCurrentPage */ ] = useState(1);
    const [pageSize, /* setPageSize */] = useState(10);
    const [movieNameSearch, /* setMovieNameSearch */] = useState("")
    const [moviemovieGenreSearch, /* setMoviemovieGenreSearch */] = useState("")

    useEffect(() => {
        handleGetMovieList(currentPage, pageSize, movieNameSearch, moviemovieGenreSearch)
    }, [currentPage, pageSize, movieNameSearch, moviemovieGenreSearch])
    const [activeTab, setActiveTab] = useState("1");
    console.log(activeTab)
    // Movie Data for Different Tabs
    const movieData = {
        "1": [
            { movieId: 1, movieName: "青いの箱", duration: 120, imageURL: "https://my-cinema-app-bucket.s3.ap-southeast-2.amazonaws.com/%E5%8D%83%E5%A4%8F.jpg", movieGenre: "Romcom" } as unknown as IMovieItem,
            { movieId: 1, movieName: "青いの箱", duration: 90, imageURL: betacinema, movieGenre: "Horror" } as unknown as IMovieItem,
            { movieId: 1, movieName: "青いの箱", duration: 90, imageURL: betacinema, movieGenre: "Horror" } as unknown as IMovieItem,
            { movieId: 1, movieName: "青いの箱", duration: 90, imageURL: betacinema, movieGenre: "Horror" } as unknown as IMovieItem,
            { movieId: 1, movieName: "青いの箱", duration: 120, imageURL: chinatsu, movieGenre: "Romcom" } as unknown as IMovieItem,
        ],
        "2": [
            { movieId: 1, movieName: "青いの箱", duration: 110, imageURL: betacinema, movieGenre: "Action" } as unknown as IMovieItem,
            { movieId: 1, movieName: "青いの箱", duration: 100, imageURL: chinatsu, movieGenre: "Sci-fi" } as unknown as IMovieItem,
            { movieId: 1, movieName: "青いの箱", duration: 95, imageURL: betacinema, movieGenre: "Drama" } as unknown as IMovieItem,
            { movieId: 1, movieName: "青いの箱", duration: 130, imageURL: chinatsu, movieGenre: "Fantasy" } as unknown as IMovieItem,
        ],
        "3": movies?.data
    };

    return (
        <>
            {loading ? (
                <LoadingPage />
            ) : (
                <Tabs style={{ marginTop: "5rem" }} defaultActiveKey="1" onChange={setActiveTab} centered>
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
                    <TabPane tab="Category 3" key="3">
                        <Row gutter={[40, 50]} style={{ marginLeft: "20rem", marginRight: "20rem" }}>
                            {/* Only render movie items if movies is not null or undefined */}
                            {loading ? (
                                <div>Loading...</div> // Show a loading spinner or message while loading
                            ) : (
                                movieData["3"]?.map((movie, index) => (
                                    <Col xs={24} md={6} key={index}>
                                        <MovieItemUI {...movie} />
                                    </Col>
                                ))
                            )}
                        </Row>
                    </TabPane>
                </Tabs>
            )
            }
        </>

    );
};