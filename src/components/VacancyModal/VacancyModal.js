import React from "react";
import {Modal} from "react-bootstrap";
import VacancyMap from "../VacancyMap/VacancyMap";

const VacancyModal = (props) => {

	function prepareDate(date) {
		date.slice(0, 10)
		date = date.substr(8, 2) + '.' + date.substr(5, 2) + '.' + date.substr(0, 4)
		return date
	}

	let yearText = ''

	// eslint-disable-next-line default-case
	switch (props.data.requirement.experience) {
		case 1:
			yearText = ' год'
			break;
		case 2:
		case 3:
		case 4:
			yearText = ' года'
			break;
		case 5:
		case 6:
			yearText = ' лет'
			break;

	}

	return (
		<React.Fragment>
			<Modal scrollable show={props.open} onHide={props.handleClose} centered size={"lg"}>

				<Modal.Header closeButton>
					<Modal.Title>
						{props.data["job-name"]}
					</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<p>
						<span className="font-weight-light">{props.data.company.name}</span>
						<br/>
						{props.data.company.site ?
							<React.Fragment>
								<a className="d-inline-block mb-1" href={props.data.company.site}
									 target="_blank" rel="noopener noreferrer">{props.data.company.site}</a>
								<br/>
							</React.Fragment>
							: null}
						<span className="font-weight-light">{props.data.source}</span>
					</p>

					<p>
						<b className="d-inline-block mb-1">Данные по вакансии:</b>
						<br/>
						<span className="mr-2">Сфера деятельности:</span><span>{props.data.category.specialisation}</span>
						<br/>
						<span className="mr-2">Зарплата:</span>
						{props.data.salary ? <span>{props.data.salary} {props.data.currency.slice(1, 5)}</span> :
							<span>Не указана</span>}
						<br/>
						<span className="mr-2">График работы:</span><span>{props.data.schedule}</span>
						<br/>
						<span className="mr-2">Тип занятости:</span><span>{props.data.employment}</span>
						{props.data.term ?
							<React.Fragment>
								<br/>
								<span className="mr-2">Бонусы:</span>
								<span>{props.data.term.text}</span>
							</React.Fragment>
							:
							null}
					</p>

					<hr/>

					<p>
						<b className="d-inline-block mb-1">Обязанности:</b>
						<br/>
						<span dangerouslySetInnerHTML={{__html: props.data.duty}}/>
					</p>

					<hr/>

					<p>
						<b className="d-inline-block mb-1">Требования:</b>
						<br/>
						<span className="mr-2">Опыт работы:</span>
						{props.data.requirement.experience === 0 || props.data.requirement.experience == 'от 0' ?
							<span>Без опыта</span>
							:
							<span>
								{props.data.requirement.experience}
								{yearText}
								</span>}
						<br/>
						<span className="mr-2">Образование:</span>
						{props.data.requirement.education ?
							<span>{props.data.requirement.education}</span>
							:
							<span>Не указано</span>}
						{props.data.requirement.qualification ?
							<React.Fragment>
								<br/>
								<b className="d-inline-block mt-1 mb-1">Дополнительно:</b>
								<br/>
								<span dangerouslySetInnerHTML={{__html: props.data.requirement.qualification}}/>
							</React.Fragment>
							: null
						}
					</p>

					<hr/>

					<p>
						<b className="d-inline-block mb-1">Контактная информация:</b>
						<br/>
						<span className="mr-2">Телефон:</span>
						{props.data.company.phone ?
							<a href={"tel:" + props.data.company.phone}>{props.data.company.phone}</a>
							:
							<span>Не указан</span>}
						<br/>
						<span className="mr-2">E-mail:</span>
						{props.data.company.email ?
							<a href={'mailto:' + props.data.company.email}>{props.data.company.email}</a>
							:
							<span>Не указан</span>}
						<br/>
						<span className="mr-2">Адрес:</span><span>{props.data.addresses.address["0"].location}</span>
					</p>

					{props.data.addresses.address["0"].lat & props.data.addresses.address["0"].lng ?
						<VacancyMap
							x={props.data.addresses.address["0"].lat}
							y={props.data.addresses.address["0"].lng}
						/>
						: null}
				</Modal.Body>

				<Modal.Footer>
					<span className="font-weight-lighter">Вакансия обновлена: {prepareDate(props.data["modify-date"])}</span>
				</Modal.Footer>

			</Modal>
		</React.Fragment>
	)
}

export default VacancyModal
