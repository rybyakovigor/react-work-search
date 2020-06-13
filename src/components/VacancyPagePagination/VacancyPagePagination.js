import React from "react";
import Pagination from "react-bootstrap/Pagination";

const VacancyPagePagination = (props) => {

	let items = [];

	for (let number = 1; number <= Math.ceil(props.data.length / 10); number++) {
		items.push(
			<Pagination.Item onClick={props.click} id={number} key={number} active={number === props.currentPage}>
				{number}
			</Pagination.Item>,
		);
	}

	const paginationBasic = (
		<div>
			<Pagination className="justify-content-center justify-content-sm-end">{items}</Pagination>
		</div>
	);

	return (
		<div>
			{paginationBasic}
		</div>
	)
}

export default VacancyPagePagination
