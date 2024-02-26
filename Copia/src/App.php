<?php

$pepito = $_SESSION['iduser']; 

?>;

<script>

import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Loader from "./components/Loader";
import Home from "./pages/Home";
import Sidebar from "components/Sidebar";
import Chat from "pages/Chat";
import { useUsersContext } from "context/usersContext";


const { match: { params } } = this.props;
console.log("este es params"+params.idasesor) 



/* console.log("soy yo soy yo es jbalvin "+idAsesor); */


const a = <?php echo $pepito; ?>;


const userPrefersDark =
	window.matchMedia &&
	window.matchMedia("(prefers-color-scheme: dark)").matches;


	
function App() {
	const [appLoaded, setAppLoaded] = useState(false);
	const [startLoadProgress, setStartLoadProgress] = useState(false);
	const { idclient } = useUsersContext();
	/*setAsesor(idAsesor) */

	useEffect(() => {
		if (userPrefersDark) document.body.classList.add("dark-theme");
		stopLoad();
	}, []);

	const stopLoad = () => {
		setStartLoadProgress(true);
		setTimeout(() => setAppLoaded(true), 3000);
	};

	if (!appLoaded) return <Loader done={startLoadProgress} />;

	return (
		<div className="app">
			<p className="app__mobile-message"> Only available on desktop 😊. </p>
			<Router>
				<div className="app-content">
					<Sidebar />
					<Route
						component={idclient ? Chat : Home}
					/>
				</div>
			</Router>
		</div>
	);
}

export default App;
</script>
