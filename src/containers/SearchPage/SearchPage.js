import React, {Component} from "react"
import {connect} from "react-redux"
import Loader from "../../components/Loader/Loader"
import SelectRegion from "../../components/SelectRegion/SelectRegion"
import VacancyCard from "../../components/VacancyCard/VacancyCard"
import VacancyModal from "../../components/VacancyModal/VacancyModal"
import VacancyPagePagination from "../../components/VacancyPagePagination/VacancyPagePagination"
import VacancySearchInput from "../../components/VacancySearchInput/VacancySearchInput"
import RegionListModal from "../../components/RegionListModal/RegionListModal"
import regions from "../../regions"
import {
  searchInputHandler,
  openRegionListModal,
  closeRegionListModal,
  selectRegion,
  paginationClickHandler,
  fetchVacancies,
  openVacancyHandler,
  closeVacancyHandler,
} from "../../store/actions/actions"

class SearchPage extends Component {
  date = new Date()
  currentDay = this.date.getDate() - 1
  currentMonth = this.date.getMonth() + 1
  currentYear = this.date.getFullYear()

  renderRegions = () => {
    return regions.map((region) => {
      return (
        <li
          key={region.code}
          className="regionText mb-1 text-decoration-none"
          onClick={() => this.props.selectRegion(region)}
        >
          {region.name}
        </li>
      )
    })
  }

  async componentDidMount() {
    this.props.fetchVacancies(this.props.region, "", this.currentYear, this.currentMonth, this.currentDay)
  }

  renderVacancyPerPage() {
    const vacancy = this.props.vacancies
    const indexOfLastVacancy = this.props.currentPage * this.props.vacancyPerPage
    const indentOfFirstVacancy = indexOfLastVacancy - this.props.vacancyPerPage
    const currentVacancy = vacancy.slice(indentOfFirstVacancy, indexOfLastVacancy)

    return currentVacancy.map((vacancy) => {
      return (
        <VacancyCard
          key={vacancy.vacancy.id}
          data={vacancy.vacancy}
          openVacancy={() => this.props.openVacancyHandler(vacancy)}
        />
      )
    })
  }

  render() {
    return (
      <div className="pt-3 pb-3 SearchPage">
        <VacancySearchInput
          keyHandler={(event) =>
            event.key === "Enter" ? this.props.fetchVacancies(this.props.region, this.props.searchQuery) : null
          }
          searchInput={(event) => this.props.searchInputHandler(event)}
          searchButton={() => this.props.fetchVacancies(this.props.region, this.props.searchQuery)}
        />

        {this.props.loading ? (
          <Loader />
        ) : (
          <React.Fragment>
            <div className="d-flex flex-column align-items-start flex-md-row justify-content-md-between align-items-md-center mb-3">
              <span className="font-weight-bold pageTitle order-1 order-md-0">{this.props.pageTitle}</span>
              <SelectRegion currentRegion={this.props.regionName} openList={this.props.openRegionListModal} />
            </div>
            {this.props.regionListOpen ? (
              <RegionListModal
                open={this.props.regionListOpen}
                closeList={this.props.closeRegionListModal}
                renderRegions={this.renderRegions}
              />
            ) : null}

            {this.props.vacancies.length > 10 ? (
              <VacancyPagePagination
                data={this.props.vacancies}
                currentPage={this.props.currentPage}
                click={(event) => this.props.paginationClickHandler(event)}
              />
            ) : null}

            {this.renderVacancyPerPage()}

            {this.props.vacancyDetail ? (
              <VacancyModal
                open={this.props.vacancyOpen}
                close={this.props.closeVacancyHandler}
                data={this.props.vacancyDetail}
              />
            ) : null}

            {this.props.vacancies.length > 10 ? (
              <VacancyPagePagination
                data={this.props.vacancies}
                currentPage={this.props.currentPage}
                click={(event) => this.props.paginationClickHandler(event)}
              />
            ) : null}
          </React.Fragment>
        )}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    pageTitle: state.pageTitle,
    searchQuery: state.searchQuery,
    regionListOpen: state.regionListOpen,
    vacancies: state.vacancies,
    region: state.region,
    regionName: state.regionName,
    vacancyOpen: state.vacancyOpen,
    vacancyDetail: state.vacancyDetail,
    currentPage: state.currentPage,
    vacancyPerPage: state.vacancyPerPage,
    loading: state.loading,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    searchInputHandler: (event) => dispatch(searchInputHandler(event)),
    openRegionListModal: () => dispatch(openRegionListModal()),
    closeRegionListModal: () => dispatch(closeRegionListModal()),
    selectRegion: (region) => dispatch(selectRegion(region)),
    paginationClickHandler: (event) => dispatch(paginationClickHandler(event)),
    fetchVacancies: (region, searchQuery, year, month, day) =>
      dispatch(fetchVacancies(region, searchQuery, year, month, day)),
    openVacancyHandler: (vacancy) => dispatch(openVacancyHandler(vacancy)),
    closeVacancyHandler: () => dispatch(closeVacancyHandler())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage)
