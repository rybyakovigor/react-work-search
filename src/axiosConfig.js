import Axios from "axios";

export default Axios.create({
	baseURL: 'http://opendata.trudvsem.ru/api/v1/vacancies'
})
