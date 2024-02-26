import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./assets/css/index.css";
import { UsersProvider } from "./context/usersContext";





ReactDOM.render(
	<React.StrictMode>
			<UsersProvider>
				<App/>
			</UsersProvider>
	</React.StrictMode>,
	document.getElementById("root")
);

reportWebVitals();
