import React, {Component} from "react"
import {connect} from "react-redux"
import axiosConfig from "../../axiosConfig"
import SelectRegion from "../../components/SelectRegion/SelectRegion"
import VacancyCard from "../../components/VacancyCard/VacancyCard"
import VacancyModal from "../../components/VacancyModal/VacancyModal"
import VacancyPagePagination from "../../components/VacancyPagePagination/VacancyPagePagination"
import VacancySearchInput from "../../components/VacancySearchInput/VacancySearchInput"
import RegionListModal from "../../components/RegionListModal/RegionListModal"
import regions from "../../regions"

class SearchPage extends Component {
  state = {
    // pageTitle: "Вакансии, обновленные сегодня:",
    searchQuery: "",
    regionListOpen: false,
    vacancy: [],
    vacancyDetail: null,
    region: "6600000000000",
    regionName: "Свердловская область",
    vacancyOpen: false,
    vacancyOnPage: [],
    currentPage: 1,
    vacancyPerPage: 10,
  };

  date = new Date()
  currentDay = this.date.getDate() - 1
  currentMonth = this.date.getMonth() + 1
  currentYear = this.date.getFullYear()

  openRegionListModal = () => {
    this.setState({
      regionListOpen: true
    })
  }

  closeRegionListModal = () => {
    this.setState({
      regionListOpen: false
    })
  }

  renderRegions = () => {
    return regions.map((region) => {
      return (
        <li
          key={region.code}
          className="regionText mb-1 text-decoration-none"
          onClick={() => {
            this.setState({
              region: region.code,
              regionName: region.name,
              regionListOpen: false
            })
          }}
        >
          {region.name}
        </li>
      )
    })
  }

  paginationClickHandler = (event) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })

    this.setState({
      currentPage: Number(event.target.id)
    })
  }

  modalOpenHandler = (data) => {
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
      const response = await axiosConfig.get(
        "/region/" + this.state.region + "?text=" + this.state.searchQuery
      )
      let vacancy = []
      vacancy.push(...response.data.results.vacancies)
      this.setState({
        pageTitle: 'Вакансии по запросу "' + this.state.searchQuery + '":',
        vacancy: vacancy,
        currentPage: 1
      })
    } catch (error) {
      console.log(error)
      this.setState({
        vacancy: [],
        pageTitle: "По вашему запросу ничего не найдено."
      })
    }
  }

  async componentDidMount() {
    try {
      const response = await axiosConfig.get(
        "region/" +
          this.state.region +
          "?offset=1&limit=100&modifiedFrom=" +
          this.currentYear +
          "-" +
          this.currentMonth +
          "-" +
          this.currentDay +
          "T00:00:00Z"
      )
      let vacancy = []
      vacancy.push(...response.data.results.vacancies)
      this.setState({
        vacancy: vacancy,
        currentPage: 1
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

  searchInputKeyHandler = (event) => {
    if (event.which === 13 || event.keyCode === 13) {
      this.searchButtonHandler()
    }
  }

  renderVacancyPerPage() {
    const vacancy = this.state.vacancy
    const indexOfLastVacancy =
      this.state.currentPage * this.state.vacancyPerPage
    const indentOfFirstVacancy = indexOfLastVacancy - this.state.vacancyPerPage
    const currentVacancy = vacancy.slice(
      indentOfFirstVacancy,
      indexOfLastVacancy
    )

    return currentVacancy.map((vacancy) => {
      return (
        <VacancyCard
          key={vacancy.vacancy.id}
          data={vacancy.vacancy}
          openVacancy={() => {
            this.setState({
              vacancyDetail: vacancy.vacancy,
              vacancyOpen: true
            })
          }}
        />
      )
    })
  }

  render() {
    return (
      <div className="pt-3 pb-3 SearchPage">
        <VacancySearchInput
          keyHandler={this.searchInputKeyHandler}
          searchInput={this.searchInputHandler}
          searchButton={this.searchButtonHandler}
        />
        <div className="d-flex flex-column align-items-start flex-md-row justify-content-md-between align-items-md-center mb-3">
          <span className="font-weight-bold pageTitle order-1 order-md-0">
            {this.props.pageTitle}
          </span>
          <SelectRegion
            currentRegion={this.state.regionName}
            openList={this.openRegionListModal}
          />
        </div>
        {this.state.regionListOpen ? (
          <RegionListModal
            open={this.state.regionListOpen}
            closeList={this.closeRegionListModal}
            renderRegions={this.renderRegions}
          />
        ) : null}

        {this.state.vacancy.length > 10 ? (
          <VacancyPagePagination
            data={this.state.vacancy}
            currentPage={this.state.currentPage}
            click={this.paginationClickHandler}
          />
        ) : null}

        {this.renderVacancyPerPage()}

        {this.state.vacancyDetail ? (
          <VacancyModal
            open={this.state.vacancyOpen}
            handleClose={this.modalCloseHandler}
            handleShow={this.modalOpenHandler}
            data={this.state.vacancyDetail}
          />
        ) : null}

        {this.state.vacancy.length > 10 ? (
          <VacancyPagePagination
            data={this.state.vacancy}
            currentPage={this.state.currentPage}
            click={this.paginationClickHandler}
          />
        ) : null}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    pageTitle: state.pageTitle
  }
}

export default connect(mapStateToProps)(SearchPage)
