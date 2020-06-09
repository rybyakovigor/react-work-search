import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Layout from "./hoc/Layout/Layout";
import Header from "./components/Header/Header";
import SearchPage from "./containers/SearchPage/SearchPage";
import {Switch, Route, Redirect} from "react-router-dom"

function App() {
	return (
		<Layout>
			<Header/>
			<Switch>
				<Route path={"/"} component={SearchPage}/>
				<Route path={"*"}>
					<Redirect to="/"/>
				</Route>
			</Switch>
		</Layout>
	);
}

export default App;
