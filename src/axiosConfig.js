import Axios from "axios";

export default Axios.create({
  baseURL: "https://opendata.trudvsem.ru/api/v1/vacancies"});