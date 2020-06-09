import React, {Component} from "react";
import VacancySearchInput from "../../components/VacancySearchInput/VacancySearchInput";
import axiosConfig from "../../axiosConfig";
import VacancyCard from "../../components/VacancyCard/VacancyCard";
import VacancyModal from "../../components/VacancyModal/VacancyModal";

export default class SearchPage extends Component {

	state = {
		searchQuery: '',
		vacancy: [],
		vacancyDetail: null,
		region: 6600000000000,
		vacancyOpen: false
	}

	modalOpenHandler = (data) => {
		console.log(data)
		this.setState({
			vacancyOpen: true
		})
	}

	modalCloseHandler = () => {
		this.setState({
			vacancyOpen: false
		})
	}

	searchButtonHandler = async () => {
		try {
			const response = await axiosConfig.get('/region/' + this.state.region + '?text=' + this.state.searchQuery)
			let vacancy = []
			vacancy.push(...response.data.results.vacancies)
			this.setState({
				vacancy: vacancy
			})
		} catch (error) {
			console.log(error)
		}
	}

	searchInputHandler = (event) => {
		this.setState({
			searchQuery: event.target.value
		})
	}

	renderVacancyCards() {
		return this.state.vacancy.map((vacancy) => {
			return (
				<VacancyCard
					key={vacancy.vacancy.id}
					data={vacancy.vacancy}
					openVacancy={() => {
						console.log(vacancy.vacancy)
						this.setState({
							vacancyDetail: vacancy.vacancy,
							vacancyOpen: true
						})
						console.log(this.state.vacancyDetail)
					}}
				/>
			)
		})
	}

	render() {
		return (
			<div className="pt-3 pb-3">
				<VacancySearchInput
					searchInput={this.searchInputHandler}
					searchButton={this.searchButtonHandler}
				/>
				{this.renderVacancyCards()}
				{this.state.vacancyDetail ? <VacancyModal
					open={this.state.vacancyOpen}
					handleClose={this.modalCloseHandler}
					handleShow={this.modalOpenHandler}
					data={this.state.vacancyDetail}
				/> : null}

			</div>
		)
	}
}
