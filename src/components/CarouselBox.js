import React, {Component} from "react";
import Carousel from "react-bootstrap/Carousel";
import CarouselItem from "react-bootstrap/CarouselItem";
import palmsImg from "../assets/palms.jpg";
import mountainsImg from "../assets/mountains.jpg";
import celebrateImg from "../assets/celebrate.jpg";
import loveImg from "../assets/love.jpg";

export default class CarouselBox extends Component {
    render() {
        return (
            <Carousel>
                <CarouselItem>
                    <img
                        className="d-block w-100"
                        src={ mountainsImg }
                        alt="Mountains"
                    />
                    <Carousel.Caption>
                        <h3>Travel</h3>
                    </Carousel.Caption> 
                </CarouselItem>
                <CarouselItem>
                    <img
                        className="d-block w-100"
                        src={ palmsImg }
                        alt="Palms"
                    />
                    <Carousel.Caption>
                        <h3>Explore</h3>
                    </Carousel.Caption>
                </CarouselItem>
                <CarouselItem>
                    <img
                        className="d-block w-100"
                        src={ celebrateImg }
                        alt="Celebrate"
                    />
                    <Carousel.Caption>
                        <h3>Celebrate</h3>
                    </Carousel.Caption>
                </CarouselItem>
                <CarouselItem>
                    <img
                        className="d-block w-100"
                        src={ loveImg }
                        alt="Love"
                    />
                    <Carousel.Caption>
                        <h3>Love</h3>
                    </Carousel.Caption>
                </CarouselItem>
            </Carousel>
            );
        }
    }