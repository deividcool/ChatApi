import React, { useEffect, useState } from "react";
import "./styles/main.css";
import avatar from "../../assets/images/clickmi.png";
import Icon from "../../components/Icon";
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import { useUsersContext } from "../../context/usersContext";
import { useDateRange } from "../../context/dateRangeContext";
import { IoIosEye } from "react-icons/io";
import { FaSearch } from 'react-icons/fa';
import { wsp_api } from "../../context/apis";
import { FaFilter } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
/* import { Calendar, DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // Importa los estilos del selector de fechas
import 'react-date-range/dist/theme/default.css'; // Importa el tema del selector de fechas 
import { es } from 'date-fns/locale';  */
import DateRangeModal from "./DateRangeModal";
import { vi } from "date-fns/locale";

function stringToColor(string) {
	let hash = 0;
	let i;

	/* eslint-disable no-bitwise */
	for (i = 0; i < string.length; i += 1) {
		hash = string.charCodeAt(i) + ((hash << 5) - hash);
	}

	let color = '#';

	for (i = 0; i < 3; i += 1) {
		const value = (hash >> (i * 8)) & 0xff;
		color += `00${value.toString(16)}`.slice(-2);
	}
	/* eslint-enable no-bitwise */

	return color;
}

function stringAvatar(name) {
	const nameParts = name.split(' ');
	const initials = nameParts[0][0] + (nameParts[1] ? nameParts[1][0] : '');

	return {
		sx: {
			bgcolor: stringToColor(name)
		},
		children: initials
	};
}

const Sidebar = () => {

	const [data, setData] = useState([]);
	const [checklist, setCheckList] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [loading, setLoading] = useState(true); // Agregar estado para el indicador de carga
	const { clientId, idasesor, llave } = useUsersContext();
	const [showDateRange, setShowDateRange] = useState(false);
	const [viewlog, setViewlog] = useState(false);
	const [viewlogSearch, setViewlogSearch] = useState(false);
	const [noResultsFound, setNoResultsFound] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [selectedItem, setSelectedItem] = useState(null);
	const noResultsMessage = "No se encontraron resultados.";
	const [dateRange, setDateRange] = useState({
		startDate: new Date(),
		endDate: new Date(),
		key: 'selection',
	});
	useEffect(() => {
		console.log("viewlog actualizado2:", viewlogSearch);

	}, [viewlogSearch]);
	// Función para manejar la selección de fechas desde el modal
	const handleDateSelection = async ({ startDate, endDate, selectedCheck }) => {
		setData([]);

		// Cerrar el modal después de seleccionar las fechas
		setShowModal(false);
		setViewlog(true); //
		setLoading(true); //

		// Realizar la solicitud a la API con las fechas seleccionadas
		try {
			const res1 = await axios.post(`${wsp_api}`, {
				tag: 'select',
				startDate: startDate,
				endDate: endDate,
				selectedCheck: selectedCheck,
				idusuario: idasesor,
				llave: llave
				//idusuario: 34766,
				//llave: "6731e03945b4e3c2b52d770cdcde63a7",
				// Otras propiedades o datos necesarios para la solicitud
			});

			// Procesa la respuesta de la API
			if (res1.data && res1.data.user) {
				const usuarios2 = res1.data.user.slice(0);
				setData(usuarios2);

			} else {
				setData([]);
				console.log("hola");
				console.log(res1.data);
			}
			setLoading(false);
		} catch (error) {
			console.error("Error al realizar la solicitud a la API:", error);
			setLoading(false);
		}
	};
	// Function to reset date selection
	const handleClearViewlog = () => {
		setViewlog(false);
		setLoading(true);


	};
	const handleClearBuscar = () => {
		setLoading(true);
		setViewlogSearch(false);
		setSearchTerm("");
		setNoResultsFound(false);

	};
	const handleSearch = (event) => {
		if (event == "") {
			setLoading(true);
			setViewlogSearch(false);
		}
		setSearchTerm(event);
		setShowModal(false);

		setNoResultsFound(false);
		//console.log(viewlogSearch); //
		if (data) {
			const filteredData = data.filter((item) => {
				return (
					item.name.toLowerCase().includes(event.toLowerCase()) ||
					item.phone_number.includes(event) ||
					item.numcot.toLowerCase().includes(event.toLowerCase())
				);
			});


			//setData(filteredData);
			setNoResultsFound(filteredData.length === 0);
		}
		setLoading(false);

	};
	/* const handleFilterClick = () => {
		setShowDateRange(!showDateRange);
	}; */
	const handleSearchIconClick = async () => {
		setShowModal(!showModal);
		try {
			const res1 = await axios.post(`${wsp_api}`, {
				tag: 'traeraccion',
				idusuario: idasesor,
				llave: llave
				//idusuario: 34766,
				//llave: "6731e03945b4e3c2b52d770cdcde63a7",
				// Otras propiedades o datos necesarios para la solicitud
			});

			// Procesa la respuesta de la API
			if (res1.data && res1.data.checks) {
				const checks = res1.data.checks;
				console.log(checks);
				setCheckList(checks);
			} else {
				setCheckList([]);

			}
			setLoading(false);
		} catch (error) {
			console.error("Error al realizar la solicitud a la API:", error);
			setLoading(false);
		}
	};



	const searchTermApi = async (item) => {
		setData([]);

		setShowDateRange(false); // Cierra el DateRangePicker después de seleccionar las fechas
		setViewlog(false); //
		setViewlogSearch(true); //
		setLoading(true); //
		console.log(searchTerm); //
		// Realizar la solicitud a la API con las fechas seleccionadas
		try {
			const res1 = await axios.post(`${wsp_api}`, {
				tag: 'busquedaid',
				searchTerm: searchTerm,
				idusuario: idasesor,
				llave: llave
				//idusuario: 34766,
				//llave: "6731e03945b4e3c2b52d770cdcde63a7",
				// Otras propiedades o datos necesarios para la solicitud
			});

			// Procesa la respuesta de la API
			if (res1.data && res1.data.user) {
				const usuarios2 = res1.data.user.slice(0);
				setData(usuarios2);
			} else {
				setData([]);

			}
			setLoading(false);
		} catch (error) {
			console.error("Error al realizar la solicitud a la API:", error);
			setLoading(false);
		}
	};
	useEffect(() => {
		console.log("view log actualizado:", viewlog);
		const fetchData = async () => {
			try {
				const res = await axios.post(`${wsp_api}`, {
					tag: "prospecto",
					fechas: viewlog,
					busqueda: viewlogSearch,
					idusuario: idasesor,
					llave: llave
					//idusuario: 34766,
					//llave: "6731e03945b4e3c2b52d770cdcde63a7",
				});
				// Procesa la respuesta de la API
				if (res.data && res.data.user) {
					const usuarios = res.data.user.slice(0);
					setData(usuarios);

				} else {
					setData([]);
					console.log(res.data);
				}

				setLoading(false);
			} catch (e) {
				console.log("error " + e);
				setLoading(false);
			}
		};

		//fetchData();

		const interval = setInterval(() => {
			fetchData();
		}, 10000);

		return () => clearInterval(interval);
	}, [viewlog, viewlogSearch]);


	return (
		<aside className="sidebar">
			<header className="header">
				<div className="sidebar__avatar-wrapper">
					<img src={avatar} className="icon_principal" />
				</div>

			</header>
			{/* <Alert /> */}
			<div className="search-wrapper" style="width: 100%;">
				<div className="search-icons">
					<Icon id="search" className="search-icon" />
					<button className="search__back-btn">
						<Icon id="back" onClick={handleClearBuscar} />
					</button>
				</div>
				<input className="search" value={searchTerm} placeholder="Buscar... " onChange={(event) => handleSearch(event.target.value)} />
				{noResultsFound && (
					<button onClick={searchTermApi} className="button-no-results">
						<FaSearch className="fa-search-icon" /> {/* Agrega el ícono de búsqueda aquí */}
					</button>
				)}
				{!viewlog && !noResultsFound && (

					<FaFilter className="filter-icon" onClick={handleSearchIconClick} />

				)}
				{viewlog && !noResultsFound && (

					<FaTimes className="filter-icon" onClick={handleClearViewlog} />

				)}

			</div>
			{showModal && 
				
					<DateRangeModal onSubmit={handleDateSelection} checkList={checklist} />
				
			}
			{!showModal && (
				loading ? (
					<div className="loading-spinner">
						<div className="spinner"></div>
						<p className="loading-text">Cargando...</p>
					</div>
				) : (
					<div className="sidebar__contacts">

						{data && data.length > 0 ? (
							data
								.filter((item) => {
									return (
										item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
										item.phone_number.includes(searchTerm) ||
										item.numcot.toLowerCase().includes(searchTerm.toLowerCase())
									);
								})
								.map((item) => (
									<div
										className="sidebar-contact"
										style={item.color === 1 ? { background: 'bisque' } : selectedItem === item.id ? { background: '#92e6ea', border: '0.2px solid #C0C0C0' } : {}}
										onClick={() => {
											clientId(item.id, item.name, item.desmodelo, item.phone_number, item.numcot, item.agente);
											setSelectedItem(item.id);
										}}
									>
										<div className="sidebar-contact__avatar-wrapper">
											<Avatar className="large-avatar" {...stringAvatar(item.name)} />
										</div>

										<div className="sidebar-contact__content">
											<div className="sidebar-contact__top-content">
												<h2 className="sidebar-contact__name"> {item.name} </h2>
												<span className="sidebar-contact__time">
													{item.cuando}

												</span>
											</div>
											<div className="sidebar-contact__bottom-content">
												<p className="sidebar-contact__message-wrapper">
													{/* {lastMessage.status && (
									<Icon
										id={
											lastMessage?.status === "sent" ? "singleTick" : "doubleTick"
										}
										aria-label={lastMessage?.status}
										className={`sidebar-contact__message-icon ${lastMessage?.status === "read"
											? "sidebar-contact__message-icon--blue"
											: ""
											}`}
									/>
									)} */}
													<div style={{ display: 'flex', flexDirection: 'column' }}>
														<span className="sidebar-contact__message">
															{item.desmodelo}
														</span>
														<span className="sidebar-contact__message">
															({item.numcot})
														</span>
													</div>
												</p>
												<div className="sidebar-contact__icons">
													{item.veces != 0 &&
														<span
															className="sidebar-contact__unread"
															data-tooltip={`Vistas ${item.veces}`}
														>
															{item.veces}
														</span>
													}
												</div>
											</div>
										</div>

									</div>
								))
						) : (
							<p className="no-result-message">{noResultsMessage}</p>
						)}


					</div>
				)
			)}
		</aside>
	);
};

export default Sidebar;