import React from "react";
import "./styles/main.css";
import Icon from "../Icon";

const Loader = ({ done }) => {
	return (
		<div className="loader">
			<div className="loader__logo-wrapper">
				<Icon id="logoClickmi" className="loader__logo" />
			</div>
			<div
				className={`loader__progress ${done ? "loader__progress--done" : ""}`}
			></div>
			<h1 className="loader__title"> CLICKMI</h1>
			<p className="loader__desc">
				<Icon id="lock" className="loader__icon" />
				Build CLICKMI
			</p>
		</div>
	);
};

export default Loader;
