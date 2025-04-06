import React from "react";
import "../../../App.css";
import { Carousel, Image, Layout } from "antd";
import { Header } from "antd/es/layout/layout";
import { AppFooter } from "../../core/components/AppFooter.tsx";
import { MovieListUI } from "./MoviesListUI.tsx";
import carousel0 from "../../../assets/carousel-0.jpg";
import carousel1 from "../../../assets/carousel-1.jpg";
import carousel2 from "../../../assets/carousel-2.jpg";
import carousel3 from "../../../assets/carousel-3.png";

const HomeUI: React.FC = () => {
  return (
    <>
      <Layout
        style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <Header style={{ height: "40rem", padding: 0, marginTop: "3.1rem" }}>
          <Carousel autoplay>
            <div>
              <Image
                src={carousel0}
                alt="Image 1"
                style={{ height: "40rem", objectFit: "cover", width: "100%" }}
              />
            </div>
            <div>
              <Image
                src={carousel1}
                alt="Image 2"
                style={{ height: "40rem", objectFit: "cover", width: "100%" }}
              />
            </div>
            <div>
              <Image
                src={carousel2}
                alt="Image 3"
                style={{ height: "40rem", objectFit: "cover", width: "100%" }}
              />
            </div>
            <div>
              <Image
                src={carousel3}
                alt="Image 4"
                style={{ height: "40rem", objectFit: "cover", width: "100%" }}
              />
            </div>
          </Carousel>
        </Header>

        {/* Content should expand properly without forcing extra space */}
        <MovieListUI />

        {/* Footer is now properly at the bottom */}
        <div>
          <AppFooter />
        </div>
      </Layout >
    </>
  );
};

export default HomeUI;
