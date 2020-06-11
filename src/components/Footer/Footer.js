import React from "react";
import Navbar from "react-bootstrap/Navbar";

const Footer = () => {

	return (
		<Navbar sticky="bottom" bg="dark" variant="dark" className="justify-content-end">
			<span className="text-muted">Вакансии взяты с сайта</span>
			<a target="_blank" href="https://trudvsem.ru/">&nbsp;https://trudvsem.ru/</a>
		</Navbar>
	)
}
export default Footer
