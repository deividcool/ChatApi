import React from "react";
import "./styles/main.css";
import icon from "../../assets/images/svg.jpg";


const Home = () => {
	const darkTheme = document.body.classList.contains("dark-theme");

	return (
		<div className="home">
			<div className="home__img-wrapper">
				<img
					src={icon}
					className="home__img"
				/>
			</div>

			<h1 className="home__title"> Bienvenido a Clickmi Messenger </h1>
			<p className="home__text">
				Conéctate con tus usuarios de forma eficiente. Usa Clickmi Messenger con una red Wi-Fi confiable, estable y segura.
			</p>
		</div>
	);
};

export default Home;
