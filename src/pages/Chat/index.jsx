import React, { useEffect, useState, useRef } from "react";
import "./styles/main.css";
import { useUsersContext } from "../../context/usersContext";
import axios from "axios";
import Avatar from '@mui/material/Avatar';
import Icon from "../../components/Icon";
import { BsFiletypePdf } from 'react-icons/bs';
import { AiOutlinePaperClip } from 'react-icons/ai';
import { GrDocumentWord } from "react-icons/gr";
import { CgHello } from 'react-icons/cg';
import { MdLocationOn } from 'react-icons/md';
import { GrMapLocation } from 'react-icons/gr';
import { BiLinkAlt } from 'react-icons/bi';
import { SiMicrosoftexcel } from "react-icons/si";

import { wsp_api } from "../../context/apis";
import { webhook } from "../../context/apis";
import styled from "styled-components";
import { FaHeadphones } from "react-icons/fa";
import ReactPlayer from 'react-player';
import FileUpload from "./components/FileUpload";
import { color, height } from "@mui/system";
import DragAndDrop from "./components/DragAndDrop";
import './styles/stylesDragAndDrop.css';
import FileIcon from "./components/FileIcon";
import { IoDocumentText } from "react-icons/io5";
import { AsesorAsig } from "./components/Asesor";

  


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



function stringAvatar(users) {
	const nameParts = users;
	const initials = nameParts[0][0] + (nameParts[1] ? nameParts[1][0] : '');

	return {
		sx: {
			bgcolor: stringToColor(users)
		},
		children: initials
	};
}

const Chat = () => {
	const { idclient, users, modelo, idasesor, numeruser, llave, cotizacion, agente, modal } = useUsersContext();
	const [mensajes, setMensajes] = useState([]);
	const [newMessage, setNewMessage] = useState("");
	const [submitNewMessage, setSubmitNewMessage] = useState("")
	const [showOptions, setShowOptions] = useState(false);
	const [showProfileSidebar, setShowProfileSidebar] = useState(false)
	const [heading, setHeading] = useState("");
	const [texto_pre, setTexto_pre] = useState([]);
	const [ubicacion, setUbicacion] = useState([]);
	const [pdf, setPdf] = useState([]);
	const [link, setLink] = useState([]);
	const [texto_div, setTexto_div] = useState(false);
	const [ubicacion_div, setUbicacion_div] = useState(false);
	const [pdf_div, setPdf_div] = useState(false);
	const [GtAsesor, setGtAsesor] = useState(false);
	
	const [link_div, setLink_div] = useState(false);
	const pageRef = useRef(null);
	const [bt, setBt] = useState(true);
	const [isExpanded, setExpanded] = useState(false);
	const [extension, setExtension] = useState(null);


	const [fileDetailsVisible, setFileDetailsVisible] = useState(false);
	const [fileName, setFileName] = useState('');
	const [hoverTimeout, setHoverTimeout] = useState(null);
	const [previewUrl, setPreviewUrl] = useState(null);
	
	const handleDragOver = (event) => {
		event.preventDefault();
		event.currentTarget.classList.add('highlight');
		clearTimeout(hoverTimeout);
		closeSidebar()
	};
	
	const handleDragLeave = (event) => {
		event.currentTarget.classList.remove('highlight');
		setHoverTimeout(setTimeout(() => {
		setFileDetailsVisible(false);
		}, 1000)); // Establecer el tiempo en milisegundos antes de ocultar el área de soltar
	};

	const handleDrop = (event) => {
		event.preventDefault();
		const file = event.dataTransfer.files[0];
		setFileName(file.name);
	  
		// Verificar si el archivo es una imagen
		if (file.type.startsWith('image/')) {
		  const reader = new FileReader();
		  reader.onload = () => {
			// Obtener el contenido del archivo en formato Base64
			const base64Content = reader.result;
			setFileDetailsVisible(true);
			setPreviewUrl(base64Content);
		  };
		  reader.readAsDataURL(file);
		} else {
		  setFileDetailsVisible(true);
		  setPreviewUrl(null);
		}
	  
		// Obtener la extensión del archivo
		const getFileExtension = (fileName) => {
		  return fileName.split('.').pop().toLowerCase();
		};
		const fileExtension = getFileExtension(file.name);
		setExtension(fileExtension);
	};

	const handleCloseOverlay = () => {
		setFileDetailsVisible(false);
	};
	
	const handleSendButtonClick = () => {
		// Aquí puedes agregar la lógica para enviar el archivo
		const parts = previewUrl.split(",");
		const valorDespuesDeLaComa = parts[1];
		
		axios
        .post(`${webhook}`, {
            tipo: "3",
            idasesor: idasesor,
            idserial: idclient,
            llave: llave,
            name: fileName,
            extension:extension,
            archivo:valorDespuesDeLaComa
        })
        .then(res => {
            console.log(res)
        })
        .catch(e => {
            console.log("error oportunidades " + e);
        }); 
		setFileDetailsVisible(false);
	};
	
	const handleFileDetailsClick = (event) => {
		event.stopPropagation();
	  };

	  const handleKeyDown = (event) => {
		if (event.key === 'Escape') {
		  setFileDetailsVisible(false);
		}
	  };

	  useEffect(() => {
		document.addEventListener('keydown', handleKeyDown);
		return () => {
		  document.removeEventListener('keydown', handleKeyDown);
		  clearTimeout(hoverTimeout);
		};
	  }, [hoverTimeout]);


	





	const detectEnterPress = (e) => {
		if (e.key === "Enter" || e.keyCode === 13) {
			if (newMessage != '') {
				setNewMessage("")
				setSubmitNewMessage(newMessage);
			}
		}
	};

	const submitNewMessageBtn = () => {
		if (newMessage != '') {
			setNewMessage("");
			setSubmitNewMessage(newMessage);
		}
	};

	const handleOnClick = () => {
		setShowOptions(!showOptions);
	};



	const handleOnClickElementText = () => {
		setShowProfileSidebar(true);
		setHeading("ENVIAR TEXTOS PERSONALIZADO");
		setTexto_div(true);
		setPdf_div(false)
		setUbicacion_div(false);
		setLink_div(false);
		setGtAsesor(false)

		axios
			.post(`${wsp_api}`, {
				tag: "elementos",
				tipo: "1",
				llave: llave
				//llave: "00adfb9ab6e293f89e03690423bedaf5"
			})
			.then(res => {
				const TextosPre = res.data.elementos.slice(0);
				setTexto_pre(TextosPre);

			})
			.catch(e => {
				console.log("error oportunidades " + e);

			})


	};
	const handleOnClickElementLocation = () => {
		setShowProfileSidebar(true);
		setHeading("ENVIAR UBICACIONES");
		setUbicacion_div(true);
		setTexto_div(false);
		setPdf_div(false);
		setLink_div(false);
		setGtAsesor(false)

		axios
			.post(`${wsp_api}`, {
				tag: "elementos",
				tipo: "2",
				llave: llave
				//llave: "6731e03945b4e3c2b52d770cdcde63a7"

			})
			.then(res => {
				const location = res.data.elementos.slice(0);;
				setUbicacion(location)

			})
			.catch(e => {
				console.log("error oportunidades " + e);

			})
	};
	const handleOnClickElementDocuments = () => {
		setShowProfileSidebar(true);
		setHeading("ENVIAR DOCUMENTOS");
		setPdf_div(true)
		setTexto_div(false)
		setUbicacion_div(false)
		setLink_div(false)
		setGtAsesor(false)
		axios
			.post(`${wsp_api}`, {
				tag: "elementos",
				tipo: "3",
				llave: llave
				//llave: "6731e03945b4e3c2b52d770cdcde63a7"

			})
			.then(res => {
				const documentos = res.data.elementos.slice(0);
				setPdf(documentos);

			})
			.catch(e => {
				console.log("error oportunidades " + e);
			})
	};

	const handleOnClickElementGestionAsesores = () => {
		setShowProfileSidebar(true);
		setHeading("Gestion Asesor");
		setGtAsesor(true)
		setPdf_div(false)
		setTexto_div(false)
		setUbicacion_div(false)
		setLink_div(false)
	}
	const handleOnClickLink = () => {
		setShowProfileSidebar(true);
		setHeading("LINKS");
		setLink_div(true);
		setTexto_div(false);
		setUbicacion_div(false);
		setPdf_div(false);
		setGtAsesor(false)

		axios
			.post(`${wsp_api}`, {
				tag: "elementos",
				tipo: "4",
				llave: llave
				//llave: "6731e03945b4e3c2b52d770cdcde63a7"

			})
			.then(res => {
				const links = res.data.elementos.slice(0);
				setLink(links);
				setLink_div(true);

			})
			.catch(e => {
				console.log("error oportunidades " + e);
			})
	};

	const handleTipo1 = (body_wsp) => {
		setNewMessage(body_wsp)
		setShowOptions(!showOptions);
		setShowProfileSidebar(false);
	}

	const handleTipo2 = (id_serial) => {
		console.log("handleTipo2" + id_serial)

		axios
			.post(`${webhook}`, {
				tipo: "2",
				idasesor: idasesor,
				idserial: idclient,
				id_elemento: id_serial,
				llave: llave
				//idasesor: 34766,
				//idserial: "HAR767",
				//llave: "6731e03945b4e3c2b52d770cdcde63a7"
			})
			.catch(e => {
				console.log("error oportunidades " + e);
			})
	}
	const handleTipo3 = (id_serial) => {
		console.log("handleTipo3" + id_serial)
		axios
			.post(`${webhook}`, {
				tipo: "3",
				idasesor: idasesor,
				idserial: idclient,
				id_elemento: id_serial,
				llave: llave
				//idasesor: 34766,
				//idserial: "HAR767",
				//llave: "6731e03945b4e3c2b52d770cdcde63a7"
			})
			.catch(e => {
				console.log("error oportunidades " + e);

			})

	}

	const handleTipo4 = (id_serial) => {
		console.log("handleTipo4" + id_serial)
		axios
			.post(`${webhook}`, {
				tipo: "4",
				idasesor: idasesor,
				idserial: idclient,
				id_elemento: id_serial,
				llave: llave
				//idasesor: 34766,
				//idserial: "HAR767",
				//llave: "6731e03945b4e3c2b52d770cdcde63a7"
			})
			.catch(e => {
				console.log("error oportunidades " + e);

			})

	}


	const closeSidebar = () => {
		setShowProfileSidebar(false);
		setGtAsesor(false)
	};
	const handleOnClickProfile = () => {
		setShowProfileSidebar(!showProfileSidebar);
		setHeading("Contacto");
	};

	useEffect(() => {
		axios
			.post(`${webhook}`, {
				tipo: "1",
				idasesor: idasesor,
				idserial: idclient,
				body: submitNewMessage,
				llave: llave,
				//idasesor: 1726,
				//idserial: "HAR767",
				//llave: "00adfb9ab6e293f89e03690423bedaf5"
			})
			.catch(e => {
				console.log("error oportunidades " + e);

			})
	}, [submitNewMessage]);





	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axios.post(`${wsp_api}`, {
					tag: "historico",
					idprospecto: idclient,
					//modal: modal,
					idusuario: idasesor,
					llave: llave
					//idusuario: 1726,
					//llave: "00adfb9ab6e293f89e03690423bedaf5",
				});
				if (res.data && res.data.messages) {
					const mensajes = res.data.messages;
					setMensajes(mensajes);
				} else {
					setMensajes([]);
					console.log(res.data);
				}

			} catch (e) {
				console.log("error " + e);
			}
		};
		fetchData();
		console.log(`Valor actual del modal: ${modal}`);
		if (modal == "true") {
			const interval = setInterval(() => {
				//fetchData();

				fetchData();

			}, 2000);
			return () => clearInterval(interval);
		} else {
			console.log("No esta activo el modal his")
		}
	}, [idclient, modal]);


	const scrollToLastMsg = () => {
		pageRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
		setBt(false);
	}

	useEffect(() => {
		if (pageRef.current) {
			scrollToLastMsg();
		}



	}, [pageRef.current])


	const handleScroll = (event) => {

		const element = event.target;
		const scrollBottom = element.scrollHeight - element.clientHeight - element.scrollTop;


		/* console.log(scrollBottom) */
		if (scrollBottom > 54) {
			setBt(true)
		} else {
			setBt(false)
		}
	}


	const arrayAsesor =[
			{
			  "id": 1,
			  "name": "John Doe"
			},
			{
			  "id": 2,
			  "name": "John tre"
			},
			{
			  "id": 3,
			  "name": "Rauel Doe"
			},
			{
			  "id": 4,
			  "name": "Wisin Doe"
			},
			{
			  "id": 5,
			  "name": "Yandel Fatel"
			},
			{
			  "id": 6,
			  "name": "Jhon Week"
			},
			{
			  "id": 7,
			  "name": "Dalton Emanuel Country"
			}
		  ]
	


	return (
		<div className="chat" >
			<div className="chat__body">
				<div className="chat__bg"></div>
				<header className="header chat__header" onClick={handleOnClickProfile}>
					<div className="chat__avatar-wrapper" >
						<Avatar className="large-avatar" {...stringAvatar(users)} />
					</div>
					<div className="chat__contact-wrapper" >
						<div style={{display:'flex', justifyContent:'space-between', width:'95%'}}>
							<h2 className="chat__contact-name" style={{width: 'fit-content'}}> {users}</h2>
							<h3 className="chat__contact-desc" style={{fontWeight: 800}}> <b>ID: {cotizacion}</b></h3>
						</div>		
						<div style={{display:'flex', justifyContent:'space-between', gap:'10px'}}>
							<p className="chat__contact-desc">
								{modelo} 
							</p>
							{agente && 
								<div style={{display: 'flex',justifyContent: 'center', alignItems: 'center',gap: '3px'}}>
									<FaHeadphones style={{ fontSize: '0.6rem' }} />
									<span style={{ fontSize: '0.8rem', textOverflow:'ellipsis'}}> {agente}</span>
								</div>
							}
						</div>						
			

			
					</div>
				</header>		
				<div 
					className="chat__content" 
					onDragOver={handleDragOver}
					onDragLeave={handleDragLeave}
					onDrop={handleDrop}
					style={{ overflowY: 'scroll' }} 
					onScroll={handleScroll}
				>
					{Object.keys(mensajes).map((fecha) => (
						<div key={fecha}>
							<div className="chat__date-wrapper">
								<span className="chat__date"> {fecha}</span>
							</div>
							<div
								className="chat__msg-group"
							>
								{mensajes[fecha].map((mensaje, index) =>

									mensaje.post_envio === 'f' ? (
										<div className="chat__msg chat__msg--sent" style={{display:'flex', flexDirection:'column',boxSizing: 'content-box'}} ref={pageRef}>

											{mensaje.content.includes(".oga") ? (
												<div className="chat__msg-audio">
													<audio controls nodownload={false} onContextMenu={false} autoplay={false} style={{ width: "100%" }}>
														<source src={mensaje.content} type="audio/mpeg" />
													</audio>
												</div>
											) : mensaje.content.includes(".mp4") ? (
												<div >
													<ReactPlayer
														url={mensaje.content}
														playing={isExpanded}
														controls
														width="100%"
														height="100%"
													/>
													{/* <video style={{ width: '5rem', height: '7rem' }} className="chat__msg chat__vid-wrapper" controls src={mensaje.content} />*/}													</div>
											) : mensaje.content.includes(".jpeg") ||  mensaje.content.includes(".jpg") ? (
												<div >
													<img style={{ width: '100%', height: '100%' }} src={mensaje.content} alt="Imagen" />
												</div>
											) : mensaje.content.includes(".png") ? (
												<div className="chat__msg" >
													<img style={{ width: '100%', height: '100%'}} src={mensaje.content} alt="Thumbnail" />
												</div>
											) : mensaje.content.includes(".webp") ? (
												<div >
													<img style={{ width: '100%', height: '100%'}} src={mensaje.content} alt="GIF" />
												</div>
											) : mensaje.content.includes(".pdf") ? (
												<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', cursor: 'pointer',gap: "0.5rem" }}>
													<BsFiletypePdf href={mensaje.content} style={{ color: '#12213b', width: '2rem', height: '2rem' }} />
													<a href={mensaje.content} style={{ color: '#12213b', fontSize: '12px', fontWeight: '500' }} target="_blank"> {mensaje.titulo}</a>
												</div>
											) : mensaje.content.includes(".docx") ? (
												<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', cursor: 'pointer',gap: "0.5rem" }}>
													<GrDocumentWord href={mensaje.content} style={{ color: '#12213b', width: '2rem', height: '2rem' }} />
													<a href={mensaje.content} style={{ color: '#12213b', fontSize: '12px', fontWeight: '500' }} target="_blank"> {mensaje.titulo}</a>
												</div>
											): mensaje.content.includes(".xlsx") ? (
												<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', cursor: 'pointer',gap: "0.5rem" }}>
													<SiMicrosoftexcel href={mensaje.content} style={{ color: '#12213b', width: '2rem', height: '2rem' }} />
													<a href={mensaje.content} style={{ color: '#12213b', fontSize: '12px', fontWeight: '500' }} target="_blank"> {mensaje.titulo}</a>
												</div>
											): mensaje.content.includes(".ubica") ? (
												<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', cursor: 'pointer',gap: "0.5rem" }}>
													<MdLocationOn href={mensaje.content} style={{ color: '#12213b', width: '2rem', height: '2rem' }} />
													<a href={`https://www.google.com/maps?q=${mensaje.content.replace(".ubica", "")}`} style={{ color: '#12213b', fontSize: '12px', fontWeight: '300' }} target="_blank"> {mensaje.titulo} </a>
												</div>
											) : mensaje.content.includes(".linkmi") ? (
												<div style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer' }}>

													<img style={{width: '100%', height: '300px', aspectRatio: '16/9', objectFit: 'cover', borderTopLeftRadius: '10px', borderTopRightRadius:'10px'}} src={mensaje.urlimagen} alt="Imagen Cotizacion"/>
													
													<a href={mensaje.titulo} className="botonLinkmi" target="_blank"><IoDocumentText style={{height:'1rem',width:'1rem',color:'white'}} />Ver cotización</a>
												</div>
											) : mensaje.content.includes("http://") || mensaje.content.includes("https://") ? (
												<div style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer' }}>
													<span style={{ color: '#12213b', fontSize: '12px', fontWeight: '300' }}>{mensaje.content.split('https://')[0]}</span> {/* Muestra la parte del texto */}
													<a href={`https://${mensaje.content.split('https://')[1]}`} style={{ color: 'var(--link)', fontSize: '12px', fontWeight: '200' }} target="_blank">{mensaje.content.split('https://')[1]}</a> {/* Muestra el enlace como un enlace */}
												</div>
											) : mensaje.titulo != "" && mensaje.titulo != null && !mensaje.content.includes("linkmi") ? (										
												<div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', cursor: 'pointer', gap: '10px'}}>
													<img style={{width: '100%', height: '100%', aspectRatio: '16/9', objectFit: 'cover'}} src={mensaje.titulo} alt="Imagen" />
													<span style={{ color: '#12213b', fontSize: '12px', fontWeight: '300', flex: 1, wordWrap: 'break-word' }}>
														{mensaje.content}
													</span>
												</div>											
											) : (
												<span> {mensaje.content}</span>
											)}

											<div style={{display:'flex',marginTop:'20px'}}>
												<span className="chat__msg-filler"> </span>
												<span className="chat__msg-footer">{mensaje.time.substring(0, 6)}</span>
												<span className="chat__msg-filler"> </span>
												<p className="chat__msg--username">
													{mensaje.usuario}

												</p>
											</div>
											

										</div>
									) : (
										<div className="chat__msg chat__msg--rxd" ref={pageRef}>
											{mensaje.content.includes(".oga") ? (
												<div className="chat__msg-audio">
													<audio controls style={{ width: "100%", '-webkit-appearance': 'none', '--media-controls': '0', '--volume-controls': '0' }}>
														<source src={mensaje.content} type="audio/mpeg" />
													</audio>
												</div>
											) : mensaje.content.includes(".mp4") ? (
												<div className="chat__msg" >
													<ReactPlayer
														url={mensaje.content}
														playing={isExpanded}
														controls
														width="100%"
														height="100%"
													/>
													{/*<video style={{ width: '5rem', height: '7rem' }} className="chat__msg chat__vid-wrapper" controls src={mensaje.content} />*/}													</div>
											) : mensaje.content.includes(".jpeg") ||  mensaje.content.includes(".jpg") ? (
												<div className="chat__msg" >
													<img style={{ width: '100%', height: '100%', marginLeft: '5rem' }} src={mensaje.content} alt="Thumbnail" />
												</div>
												
											) : mensaje.content.includes(".png") ? (
												<div className="chat__msg" >
													<img style={{ width: '100%', height: '100%', marginLeft: '5rem' }} src={mensaje.content} alt="Thumbnail" />
												</div>
											) :mensaje.content.includes(".webp") ? (
												<div className="chat__msg" >
													<img style={{ width: '100%', height: '100%', marginLeft: '5rem' }} src={mensaje.content} alt="GIF" />
												</div>
											) : mensaje.content.includes(".pdf") ? (
												<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', cursor: 'pointer',gap: "0.5rem" }}>
													<BsFiletypePdf href={mensaje.content} style={{ color: '#12213b', width: '2rem', height: '2rem' }} />
													<a style={{ color: '#12213b', fontSize: '12px', fontWeight: '300' }} href={mensaje.content} target="_blank">{mensaje.titulo} </a>
												</div>
											) : mensaje.content.includes(".docx") ? (
												<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', cursor: 'pointer',gap: "0.5rem" }}>
													<GrDocumentWord href={mensaje.content} style={{ color: '#12213b', width: '2rem', height: '2rem' }} />
													<a href={mensaje.content} style={{ color: '#12213b', fontSize: '12px', fontWeight: '500' }} target="_blank"> {mensaje.titulo}</a>
												</div>
											): mensaje.content.includes(".xlsx") ? (
												<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', cursor: 'pointer',gap: "0.5rem" }}>
													<SiMicrosoftexcel href={mensaje.content} style={{ color: '#12213b', width: '2rem', height: '2rem' }} />
													<a href={mensaje.content} style={{ color: '#12213b', fontSize: '12px', fontWeight: '500' }} target="_blank"> {mensaje.titulo}</a>
												</div>
											): mensaje.content.includes(".ubica") ? (
												<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', cursor: 'pointer',gap: "0.5rem" }}>
													<MdLocationOn href={mensaje.content} style={{ color: '#12213b', width: '2rem', height: '2rem' }} />
													<a href={`https://www.google.com/maps?q=${mensaje.content.replace(".ubica", "")}`} style={{ color: '#12213b', fontSize: '12px', fontWeight: '300' }} target="_blank"> {mensaje.titulo} </a>
												</div>
											) : mensaje.content.includes("http://") || mensaje.content.includes("https://") ? (
												<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', cursor: 'pointer' }}>
													<span style={{ color: '#12213b', fontSize: '12px', fontWeight: '300' }}>{mensaje.content.split('https://')[0]}</span>
													<a href={`https://${mensaje.content.split('https://')[1]}`} style={{ color: 'var(--link)', fontSize: '12px', fontWeight: '200' }} target="_blank">{mensaje.content.split('https://')[1]}</a>
												</div>
											) : (
												<span> {mensaje.content}</span>
											)}
											<span className="chat__msg-filler"> </span>
											<span className="chat__msg-footer">{mensaje.time.substring(0, 6)}</span>
										</div>
									)
								)}
							</div>
						</div>
					))}
					{fileDetailsVisible && (
						<div className="overlay" id="overlay" onClick={handleCloseOverlay}>
						<div className="file-details" id="file-details" onClick={handleFileDetailsClick}>
							<div style={{display:'flex', flexDirection:'column', flex: '1', alignItems:'center',justifyContent:'center', gap: '20px'}}>
								{previewUrl ? (
									<img src={previewUrl} alt="Vista previa" style={{height: '100%', maxWidth:'300px', aspectRatio: '16/9'}}/>
									) : (
									<FileIcon fileName={fileName} />										
									)
								}
								
								<p id="file-name" className="file-name">{fileName}</p>
							</div>
							<div style={{display:'flex',width:'100%', justifyContent:'end'}}>
								<button aria-label="Send message" onClick={handleSendButtonClick}>
									<Icon id="send" className="chat__input-icon" />
								</button>
							</div>
							
						</div>
						</div>
					)}
				</div>
				{!fileDetailsVisible && (
				<footer className="chat__footer">

					{bt ? (
						<button
							className="chat__scroll-btn"
							aria-label="scroll down"
							onClick={scrollToLastMsg}
						>
							<Icon id="downArrow" />
						</button>
					) : null}

					<div className="chat__input-wrapper">
						<div className="pos-rel">
							<button aria-label="Attach" onClick={handleOnClick}>
								<Icon
									id="attach"
									className={`chat__input-icon ${showOptions ? "chat__input-icon--pressed" : ""
										}`}
								/>
							</button>

							<div className={`chat__attach ${showOptions ? "chat__attach--active" : ""}`} >
								<button
									className="chat__attach-btn"
									onClick={handleOnClickElementText}
									title="Textos Personalizados"
								>
									<Icon id="attachText" className="chat__attach-icon" />
								</button>
								<button
									className="chat__attach-btn"
									onClick={handleOnClickLink}
									title="Link Personalizados"
								>
									<Icon id="attachLink" className="chat__attach-icon" />
								</button>
								<button
									className="chat__attach-btn"
									onClick={handleOnClickElementLocation}
									title="Ubicaciones"
								>
									<Icon id="attachLocation" className="chat__attach-icon" />
								</button>
								<button
									className="chat__attach-btn"
									onClick={handleOnClickElementDocuments}
									title="Documentos"
								>
									<Icon id="attachDocument" className="chat__attach-icon" />
								</button>
								<button
									className="chat__attach-btn"
									onClick={handleOnClickElementGestionAsesores}
									title="Gestion Asesor"
								>
									<Icon id="attachUser" className="chat__attach-icon" />
								</button>
							</div>
						</div>
						<input
							className="chat__input no-outline"
							placeholder="Escribe un mensaje aquí"
							value={newMessage}
							onChange={(e) => setNewMessage(e.target.value)}
							onKeyDown={detectEnterPress}
						/>
						<button aria-label="Send message" onClick={submitNewMessageBtn}>
							<Icon id="send" className="chat__input-icon" />
						</button>
					</div>
				</footer>
				)}
			</div>
			<aside className={`chat-sidebar ${showProfileSidebar ? "chat-sidebar--active" : ""}`}>
				<header className="header chat-sidebar__header">
					<button onClick={closeSidebar}>
						<Icon id="cancel" className="chat-sidebar__header-icon" />
					</button>
					<h2 className="chat-sidebar__heading"> {heading} </h2>
				</header>
				<div className="profile">
					<div className="profile__section profile__section--personal">
						<div className="profile__avatar-wrappers">
							<Avatar style={{ width: '14rem', height: '14rem', fontSize: '5rem' }} {...stringAvatar(users)} />
						</div>
						<span className="profile__profile"> {users} </span>
						<span className="profile__modelo">  {modelo} </span>
						<span className="profile__modelo"> ID <b>{cotizacion}</b> </span>

					</div>
					<div className="profile__section profile__section--about">
						<div className="sb profile__heading-wrapper">
							<h2 className="profile__heading"> Numero Telefonico </h2>
						</div>
						<ul>
							<li className="profile__about-item">+57 {numeruser} </li>
						</ul>
					</div>
					<div className="profile__section profile__section--about">	
						<div className="sb profile__heading-wrapper">
							<h2 className="profile__heading"> Cargue Archivo </h2>
						</div>
						<FileUpload  closeSidebar={closeSidebar}/>
					</div>
				</div>
				<div className="chat-sidebar__content">
					{texto_div && texto_pre && texto_pre[0] && (
						texto_pre.map((item) => (
							<div className="profile__section" onClick={() => handleTipo1(item.body_wsp)}>
								<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', cursor: 'pointer',gap: "0.5rem" }} >
									<CgHello style={{ width: '2rem', height: '2rem' }} />
									<div style={{ fontSize: '1.5rem', marginLeft: '10px' }} >
										{item.titulo}
									</div>
								</div>
							</div>
						))
					)}
					{ubicacion_div && ubicacion && ubicacion[0] && (
						ubicacion.map((item) => (
							<div className="profile__section" onClick={() => handleTipo2(item.id_serial)} >
								<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', cursor: 'pointer',gap: "0.5rem" }} >
									<GrMapLocation style={{ color: 'white', width: '2rem', height: '2rem' }} />
									<div style={{ fontSize: '1.5rem', marginLeft: '10px' }} >
										{item.titulo}
									</div>
								</div>
							</div>
						))
					)}
					{link_div && link && link[0] && (
						link.map((item) => (
							<div className="profile__section" onClick={() => handleTipo4(item.id_serial)} >
								<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', cursor: 'pointer',gap: "0.5rem" }} >
									<BiLinkAlt style={{ color: '#5b5b5b', width: '2rem', height: '2rem' }} />
									<div style={{ fontSize: '1.5rem', marginLeft: '10px' }} >
										{item.titulo}
									</div>
								</div>
							</div>
						))
					)}
					{pdf_div && pdf && pdf[0] && (
						pdf.map((item) => (
							<div className="profile__section" onClick={() => handleTipo3(item.id_serial)}>
								<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', cursor: 'pointer',gap: "0.5rem" }} >
									<AiOutlinePaperClip style={{ width: '2rem', height: '2rem' }} />
									<div style={{ fontSize: '1.5rem', marginLeft: '10px' }} >
										{item.titulo}
									</div>
								</div>
							</div>
						))
					)}

					{GtAsesor && (
						<div className="profile__section">
							<h2 className="profile__heading"> Gestion Asesor </h2>
							{arrayAsesor.map((item) => (
								<AsesorAsig asesorname={item.name} />
							))}
						</div>						
					)}
				</div>
			</aside>
		</div >
	);
};
export default Chat;