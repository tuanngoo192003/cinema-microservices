import React from "react";
import "../../../App.css"
import {Carousel, Layout} from "antd";
import {Header} from "antd/es/layout/layout";
import {AppFooter} from "../../core/components/AppFooter.tsx";
import {MovieListUI} from "./MoviesListUI.tsx";

const contentStyle: React.CSSProperties = {
    height: '40rem',
    color: '#fff',
    lineHeight: '40rem',
    textAlign: 'center',
    background: '#364d79',
};

export const HomeUI: React.FC = () => {
    return (
        <>
            <Layout style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
                <Header style={{ height: "40rem", padding: 0, marginTop: "3.1rem" }}>
                    <Carousel autoplay>
                        <div>
                            <h3 style={contentStyle}>1</h3>
                        </div>
                        <div>
                            <h3 style={contentStyle}>2</h3>
                        </div>
                        <div>
                            <h3 style={contentStyle}>3</h3>
                        </div>
                        <div>
                            <h3 style={contentStyle}>4</h3>
                        </div>
                    </Carousel>
                </Header>

                {/* Content should expand properly without forcing extra space */}
                <MovieListUI/>

                {/* Footer is now properly at the bottom */}
                <div>
                    <AppFooter/>
                </div>
            </Layout>
        </>
    )
}