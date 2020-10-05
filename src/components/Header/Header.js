import React from "react"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import classes from "./Header.module.css"
import {GithubIcon} from "../../icons"

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" className="justify-content-between">
      <Navbar.Brand>Поиск работы в РФ</Navbar.Brand>
      <Nav.Link
        className={classes.icon}
        href="https://github.com/igos-igos/react-work-search"
        target="_blank"
        title="Ссылка на профиль Гитхаб."
      >
        <GithubIcon />
      </Nav.Link>
    </Navbar>
  )
}

export default Header
