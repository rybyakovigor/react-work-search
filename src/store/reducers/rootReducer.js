const initialState = {
  pageTitle: "Вакансии, обновленные сегодня:",
  searchQuery: "",
  regionListOpen: false,
  vacancy: [],
  vacancyDetail: null,
  region: "6600000000000",
  regionName: "Свердловская область",
  vacancyOpen: false,
  vacancyOnPage: [],
  currentPage: 1,
  vacancyPerPage: 10
}

export default function reducer(state = initialState, action) {
  return state
}