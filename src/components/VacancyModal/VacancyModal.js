import React from "react";
import {Modal} from "react-bootstrap";
import VacancyMap from "../VacancyMap/VacancyMap";

const VacancyModal = (props) => {

	function prepareDate(date) {
		date.slice(0, 10)
		date = date.substr(8, 2) + '.' + date.substr(5, 2) + '.' + date.substr(0, 4)
		return date
	}

	return (
		<React.Fragment>
			<Modal show={props.open} onHide={props.handleClose} centered size={"lg"}>

				<Modal.Header closeButton>
					<Modal.Title>
						{props.data["job-name"]}
					</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<p>
						<span className="d-inline-block mb-1 font-weight-light">{props.data.company.name}</span>
						<br/>
						<span className="font-weight-light">{props.data.source}</span>
					</p>

					<p>
						<b className="d-inline-block mb-1">Данные по вакансии:</b>
						<br/>
						<span className="mr-2">Сфера деятельности:</span><span>{props.data.category.specialisation}</span>
						<br/>
						<span className="mr-2">Зарплата:</span><span>{props.data.salary} {props.data.currency.slice(1, 5)}</span>
						<br/>
						<span className="mr-2">График работы:</span><span>{props.data.schedule}</span>
						<br/>
						<span className="mr-2">Тип занятости:</span><span>{props.data.employment}</span>
						{
							props.data.term
								?
								<React.Fragment>
									<br/>
									<span className="mr-2">Бонусы:</span>
									<span>{props.data.term.text}</span>
								</React.Fragment>
								:
								null
						}
					</p>

					<hr/>

					<p>
						<b className="d-inline-block mb-1">Обязанности:</b>
						<br/>
						<span>{(props.data.duty)}</span>
					</p>

					<hr/>

					<p>
						<b className="d-inline-block mb-1">Требования:</b>
						<br/>
						<span className="mr-2">Опыт работы:</span>
						{
							props.data.requirement.experience === 0
								?
								<span>Без опыта</span>
								:
								<span>{props.data.requirement.experience} года</span>
						}
						{/*ToDo: сделать склонения слова 'год' в зависимости от числа*/}
						<br/>
						<span className="mr-2">Образование:</span><span>{props.data.requirement.education}</span>
						<br/>
						<span className="mr-2">Профессиональные качества:</span><span>{props.data.requirement.qualification}</span>
					</p>

					<hr/>

					<p>
						<b className="d-inline-block mb-1">Контактная информация:</b>
						<br/>
						<span className="mr-2">Телефон:</span>
						{
							props.data.company.phone
								?
								<a href={"tel:" + props.data.company.phone}>{props.data.company.phone}</a>
								:
								<span>Не указан</span>
						}
						<br/>
						<span className="mr-2">E-mail:</span>
						{
							props.data.company.email
								?
								<a href={'mailto:' + props.data.company.email}>{props.data.company.email}</a>
								:
								<span>Не указан</span>
						}
						<br/>
						<span className="mr-2">Адрес:</span><span>{props.data.addresses.address["0"].location}</span>
					</p>

					<VacancyMap
						x={props.data.addresses.address["0"].lat}
						y={props.data.addresses.address["0"].lng}
					/>
				</Modal.Body>
				<Modal.Footer>
					<span className="font-weight-lighter">Вакансия обновлена: {prepareDate(props.data["modify-date"])}</span>
				</Modal.Footer>
			</Modal>
		</React.Fragment>
	)
}

export default VacancyModal
