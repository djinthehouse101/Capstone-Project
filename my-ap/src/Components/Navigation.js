import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Navbar, Nav} from 'react-bootstrap';

/**
  * Class to create Navigation portion for the webpages. 
  */
export class Navigation extends Component
{
    /**
     * Used to render the navigation bar to change wepages.
     * @returns the rendered navigation bar.
     */
    render()
    {
        return(
            <Navbar bg="dark" expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <NavLink className="d-inline p-2 bg-dark text-white" to="/">
                            Home
                        </NavLink>
                        <NavLink className="d-inline p-2 bg-dark text-white" to="/department">
                            Department
                        </NavLink>
                        <NavLink className="d-inline p-2 bg-dark text-white" to="/employee">
                            Employee
                        </NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}