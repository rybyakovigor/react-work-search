import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const VacancyCard = (props) => {

	let vacancyDate = props.data["creation-date"].substr(8, 2) + '.' + props.data["creation-date"].substr(5, 2) + '.' + props.data["creation-date"].substr(0, 4)

	return (
		<Card border="secondary" className="mb-3">
			<Card.Header className="d-flex justify-content-between">
				<Card.Title className="mb-0 w-75">{props.data["job-name"]}</Card.Title>
				<span className="d-inline-block font-weight-bolder text-right">{props.data.salary}</span>
				{/*ToDo: Если зарплата не указана - выводить строку 'Не указана' с классом 'text-muted'*/}
			</Card.Header>
			<Card.Body>
				<Card.Text>
					<span className="d-inline-block mb-1">{props.data.company.name}</span>
					<br/>
					<span>{props.data.addresses.address["0"].location}</span>
				</Card.Text>
			</Card.Body>
			<Card.Footer className="text-muted d-flex justify-content-between">
				<Button onClick={props.openVacancy}>Открыть вакансию</Button>
				<Card.Text className="d-flex flex-column justify-content-center">
					<span>
						Дата публикации: {vacancyDate}
					</span>
				</Card.Text>
			</Card.Footer>
		</Card>
	)
}

export default VacancyCard
