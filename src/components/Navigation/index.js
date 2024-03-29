import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken } from "../../store/user/selectors";
import NavbarItem from "./NavbarItem";
import LoggedIn from "./LoggedIn";
import LoggedOut from "./LoggedOut";
import { selectUserSpace } from "../../store/space/selector";

export default function Navigation() {
  const token = useSelector(selectToken);

  const spaceWithStories = useSelector(selectUserSpace);
  // console.log("this is my selectUserSpace", spaceWithStories);

  const loginLogoutControls = token ? <LoggedIn /> : <LoggedOut />;

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={NavLink} to="/">
        YOUR PROJECT NAME
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav style={{ width: "100%" }} fill>
          <NavbarItem path="/" linkText="Home" />
          <NavbarItem path="/other" linkText="Other" />
          {!spaceWithStories ? (
            ""
          ) : (
            <NavbarItem path="/userpersonalspace" linkText="My Space" />
          )}
          {loginLogoutControls}
          {/* here we place in the nav bar a new space */}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
