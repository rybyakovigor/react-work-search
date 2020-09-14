import React from "react";
import {Spinner} from "react-bootstrap";

const Loader = () => {
	return (
		<div className="w-100 d-flex justify-content-center mt-5 mb-5">
			<Spinner animation="border" variant="secondary" role="status">
				<span className="sr-only">Загрузка...</span>
			</Spinner>
		</div>

	)
}

export default Loader
