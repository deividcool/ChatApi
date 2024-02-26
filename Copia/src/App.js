import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Loader from "./components/Loader";
import Home from "./pages/Home";
import Sidebar from "./components/Sidebar";
import Chat from "./pages/Chat";
import { useUsersContext } from "./context/usersContext";
import Cookies from 'js-cookie';


const params = new URLSearchParams(window.location.search);
const key = params.get('llave');
const idusuario = params.get('idusuario');
const modalactivo = params.get('modalclickmi');

/* const fechaActual = new Date().toISOString().slice(0, 10).replace(/-/g, '');
const idusuario = Cookies.get(`clickmi.iduser.${fechaActual}`);
const key = Cookies.get(`clickmi.llave.${fechaActual}`); */




function App() {

	const [appLoaded, setAppLoaded] = useState(false);
	const [startLoadProgress, setStartLoadProgress] = useState(false);
	const { idclient, setAsesor, setkey, setModal } = useUsersContext();
	//setAsesor("1726") 
	//setkey("00adfb9ab6e293f89e03690423bedaf5")
	//setModal('true') 
	
	setAsesor(idusuario)
	setkey(key)
	setModal(modalactivo) 


	useEffect(() => {
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

