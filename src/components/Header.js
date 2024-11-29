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
        </>
        );
    }
}