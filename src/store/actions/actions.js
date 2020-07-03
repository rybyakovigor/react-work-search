import {
  SEARCH_INPUT_HANDLER,
  OPEN_REGION_LIST_MODAL,
  CLOSE_REGION_LIST_MODAL,
  SELECT_REGION,
  PAGINATION_CLICK_HANDLER,
  FETCH_VACANCYS_START,
  FETCH_VACANCYS_ERROR,
  FETCH_VACANCYS_SUCCESS_EMPTY,
  FETCH_VACANCYS_SUCCESS_QUERY,
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
export function fetchVacancys(region, searchQuery, year, month, day) {
  return async (dispatch) => {
    dispatch(fetchVacancysStart())

    try {
      let response
      let vacancys = []
      if (searchQuery !== "") {
        response = await axiosConfig.get("/region/" + region + "?text=" + searchQuery)
        vacancys.push(...response.data.results.vacancies)
        dispatch(fetchVacancysSuccessQuery(vacancys))
      }

      if (searchQuery === "") {
        response = await axiosConfig.get(
          "region/" + region + "?offset=1&limit=100&modifiedFrom=" + year + "-" + month + "-" + day + "T00:00:00Z"
        )
        vacancys.push(...response.data.results.vacancies)
        dispatch(fetchVacancysSuccessEmpty(vacancys))
      }
    } catch (error) {
      dispatch(fetchVacancysError(error))
      console.log(error)
    }
  }
}

export function fetchVacancysStart() {
  return {
    type: FETCH_VACANCYS_START
  }
}

export function fetchVacancysSuccessQuery(vacancys) {
  return {
    type: FETCH_VACANCYS_SUCCESS_QUERY,
    vacancys: vacancys
  }
}

export function fetchVacancysSuccessEmpty(vacancys) {
  return {
    type: FETCH_VACANCYS_SUCCESS_EMPTY,
    vacancys: vacancys
  }
}

export function fetchVacancysError(error) {
  return {
    type: FETCH_VACANCYS_ERROR,
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
