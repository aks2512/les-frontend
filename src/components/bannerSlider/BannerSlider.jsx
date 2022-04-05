import { Link } from "react-router-dom";
import Slider from "react-slick";

import "./style.scss"; 
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import banner from '../../assets/imgs/banner.svg';

export function BannerSlider() {

    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToshow: 1,
        slidesToScroll: 1,
        initialslide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    infinite: true,
                    dots: true
                }
            }
        ]
    };

    return (
        <Slider className="banner_slider container" {...settings}>
            <div className="item">
                <img src={banner} alt="" />
                <Link to="/">Conferir</Link>
            </div>
            <div className="item">
                <img src={banner} alt="" />
                <Link to="/">Conferir</Link>
            </div>
        </Slider>
    );
}