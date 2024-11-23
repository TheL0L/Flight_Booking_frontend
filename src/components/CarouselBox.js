import React, {Component} from "react";
import Carousel from "react-bootstrap/Carousel";
import CarouselItem from "react-bootstrap/CarouselItem";
import palmsImg from "../assets/palms.jpg";
import mountainsImg from "../assets/mountains.jpg";

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
                        <h3>Home</h3>
                        <p>Hello World Bookings is a company that provides you with the best flight booking services. We offer the best prices and the best customer service. We are here to make your flight booking experience as easy as possible.</p>
                    </Carousel.Caption> 
                </CarouselItem>
                <CarouselItem>
                    <img
                        className="d-block w-100"
                        src={ palmsImg }
                        alt="Palms"
                    />
                    <Carousel.Caption>
                        <h3>Home</h3>
                        <p>Hello World Bookings is a company that provides you with the best flight booking services. We offer the best prices and the best customer service. We are here to make your flight booking experience as easy as possible.</p>
                    </Carousel.Caption>
                </CarouselItem>
            </Carousel>
            );
        }
    }