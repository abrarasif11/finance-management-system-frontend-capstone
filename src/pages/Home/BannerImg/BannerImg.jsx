import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import img1 from "../../../assets/photo-1434626881859-194d67b2b86f.png";
import img2 from "../../../assets/photo-1526628953301-3e589a6a8b74.jpeg";
import img3 from "../../../assets/photo-1642388813992-f12b04ba3db0.jpeg";
const BannerImg = () => {
    return (
        <Carousel>
            <div>
                <img src={img1} />

            </div>
            <div>
                <img src={img2} />

            </div>
            <div>
                <img src={img3} />

            </div>
        </Carousel>
    );
};

export default BannerImg;