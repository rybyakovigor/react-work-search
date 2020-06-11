import React from "react";
import Navbar from "react-bootstrap/Navbar";

const Footer = () => {

	return (
		<Navbar sticky="bottom" bg="dark" variant="dark" className="justify-content-center">
			<span className="text-muted">Вакансии предоставлены сайтом</span>
			<a target="_blank" href="https://trudvsem.ru/" rel="noopener noreferrer">&nbsp;https://trudvsem.ru/</a>
		</Navbar>
	)
}
export default Footer
