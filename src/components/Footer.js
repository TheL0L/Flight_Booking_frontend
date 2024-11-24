import React, {Component} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
//import Footer from react-bootstrap/Footer;

export default class Footer extends Component {
    render() {
        return (
            <footer className="bg-dark text-white text-center p-3">
                <p>&copy; 2024 Final Project: Intro to DevOps - Hello World Flight Bookings</p>
            </footer>
        );
    }
}