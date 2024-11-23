import React, { Component } from "react";
import { 
    Navbar,
    Nav, 
    FormControl,
    Button, 
    Container,
    NavbarBrand, 
    NavbarCollapse, 
    NavbarToggle, 
    Form } from "react-bootstrap";
import logo from "../assets/whitelogo.png";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Flights from "../pages/Flights";
import Bookings from "../pages/Bookings";

export default class Header extends Component {
    render() {
        return (
            <>
        <Navbar fixed="sticky" collapseOnSelect expand="md" bg="dark" variant="light">
            <Container>
                <NavbarBrand href="/" >
                    <img
                        src={logo}
                        height="60"
                        width="200"
                        className="d-inline-block align-top"
                        alt="Logo"
                        color = "black"
                    />
                </NavbarBrand>
                <NavbarToggle aria-controls="responsive-navbar-nav"/>
                <NavbarCollapse id="responsive-navbar-nav">
                    <Nav className="ms-auto ">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/about">About us</Nav.Link>
                        <Nav.Link href="/flights">Flights</Nav.Link>
                        <Nav.Link href="/bookings">Bookings</Nav.Link>
                    </Nav>
                    <Form className="d-flex" >
                        <FormControl 
                        type="text" 
                        placeholder="Search" 
                        className="ms-sm-2" />
                        <Button variant="dark">Go</Button>

                    </Form>
                </NavbarCollapse>
                    
            </Container>
        </Navbar>
        <Router>    
            <Routes>
                <Route path="/" element ={<Home/>}/>
                <Route path="/about" element ={ <About/>}/>
                <Route path="/flights" element={<Flights/>}/>
                <Route path="/bookings" element={<Bookings/>}/>     
            </Routes>
        </Router>
        </>
        );
    }
}