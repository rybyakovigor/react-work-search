import {
  SEARCH_INPUT_HANDLER,
  OPEN_REGION_LIST_MODAL,
  CLOSE_REGION_LIST_MODAL,
  SELECT_REGION,
  PAGINATION_CLICK_HANDLER,
  FETCH_VACANCYS_START,
  FETCH_VACANCYS_ERROR,
  FETCH_VACANCYS_SUCCESS_QUERY,
  FETCH_VACANCYS_SUCCESS_EMPTY,
  OPEN_VACANCY_HANDLER,
  CLOSE_VACANCY_HANDLER
} from "../actions/actionTypes"

const initialState = {
  pageTitle: "",
  searchQuery: "",
  regionListOpen: false,
  vacancys: [], // TODO: исправить орфографическую ошибку
  vacancyDetail: null,
  region: "6600000000000",
  regionName: "Свердловская область",
  vacancyOpen: false,
  vacancyOnPage: [], // TODO: Проверить, где используется
  currentPage: 1,
  vacancyPerPage: 10,
  loading: false
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_INPUT_HANDLER:
      return {
        ...state,
        searchQuery: action.event.target.value
      }

    case OPEN_REGION_LIST_MODAL:
      return {
        ...state,
        regionListOpen: true
      }

    case CLOSE_REGION_LIST_MODAL:
      return {
        ...state,
        regionListOpen: false
      }

    case SELECT_REGION:
      return {
        ...state,
        region: action.region.code,
        regionName: action.region.name,
        regionListOpen: false
      }

    case PAGINATION_CLICK_HANDLER:
      return {
        ...state,
        currentPage: +action.event.target.id
      }

    case FETCH_VACANCYS_START:
      return {
        ...state,
        loading: true
      }

    case FETCH_VACANCYS_SUCCESS_QUERY:
      return {
        ...state,
        pageTitle: 'Вакансии по запросу "' + state.searchQuery + '":',
        vacancys: action.vacancys,
        currentPage: 1,
        loading: false
      }

    case FETCH_VACANCYS_SUCCESS_EMPTY:
      return {
        ...state,
        pageTitle: "Вакансии, обновленные сегодня:",
        vacancys: action.vacancys,
        currentPage: 1,
        loading: false
      }

    case FETCH_VACANCYS_ERROR:
      return {
        ...state,
        vacancys: [],
        pageTitle: "По вашему запросу ничего не найдено.",
        loading: false
      }

    case OPEN_VACANCY_HANDLER:
      return {
        ...state,
        vacancyDetail: action.vacancy.vacancy,
        vacancyOpen: true
      }
    case CLOSE_VACANCY_HANDLER:
      return {
        ...state,
        vacancyOpen: false
      }

    default:
      return state
  }
}
