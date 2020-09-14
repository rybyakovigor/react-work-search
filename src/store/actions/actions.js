import {
  SEARCH_INPUT_HANDLER,
  OPEN_REGION_LIST_MODAL,
  CLOSE_REGION_LIST_MODAL,
  SELECT_REGION,
  PAGINATION_CLICK_HANDLER,
  FETCH_VACANCIES_START,
  FETCH_VACANCIES_ERROR,
  FETCH_VACANCIES_SUCCESS_EMPTY,
  FETCH_VACANCIES_SUCCESS_QUERY,
  OPEN_VACANCY_HANDLER,
  CLOSE_VACANCY_HANDLER
} from "./actionTypes"
import axiosConfig from "../../axiosConfig"

export function searchInputHandler(event) {
  event.persist()
  return {
    type: SEARCH_INPUT_HANDLER,
    event: event
  }
}

export function openRegionListModal() {
  return {
    type: OPEN_REGION_LIST_MODAL
  }
}

export function closeRegionListModal() {
  return {
    type: CLOSE_REGION_LIST_MODAL
  }
}

// Выбор регионоа
export function selectRegion(region) {
  console.log("region", region)
  return {
    type: SELECT_REGION,
    region: region
  }
}

// Клик по пагинации
export function paginationClickHandler(event) {
  window.scrollTo({
    // TODO: попробовать скролл с якорем
    top: 0,
    behavior: "smooth"
  })
  return {
    type: PAGINATION_CLICK_HANDLER,
    event: event
  }
}

// Запрос вакансий
export function fetchVacancies(region, searchQuery, year, month, day) {
  return async (dispatch) => {
    dispatch(fetchVacanciesStart())

    try {
      let response
      let vacancies = []
      if (searchQuery !== "") {
        response = await axiosConfig.get("/region/" + region + "?text=" + searchQuery)
        vacancies.push(...response.data.results.vacancies)
        dispatch(fetchVacanciesSuccessQuery(vacancies))
      }

      if (searchQuery === "") {
        response = await axiosConfig.get(
          "region/" + region + "?offset=1&limit=100&modifiedFrom=" + year + "-" + month + "-" + day + "T00:00:00Z"
        )
        vacancies.push(...response.data.results.vacancies)
        dispatch(fetchVacanciesSuccessEmpty(vacancies))
      }
    } catch (error) {
      dispatch(fetchVacanciesError(error))
      console.log(error)
    }
  }
}

export function fetchVacanciesStart() {
  return {
    type: FETCH_VACANCIES_START
  }
}

export function fetchVacanciesSuccessQuery(vacancies) {
  return {
    type: FETCH_VACANCIES_SUCCESS_QUERY,
    vacancies: vacancies
  }
}

export function fetchVacanciesSuccessEmpty(vacancies) {
  return {
    type: FETCH_VACANCIES_SUCCESS_EMPTY,
    vacancies: vacancies
  }
}

export function fetchVacanciesError(error) {
  return {
    type: FETCH_VACANCIES_ERROR,
    error: error
  }
}

export function openVacancyHandler(vacancy) {
  return {
    type: OPEN_VACANCY_HANDLER,
    vacancy: vacancy
  }
}

export function closeVacancyHandler() {
  return {
    type: CLOSE_VACANCY_HANDLER
  }
}
