import { createContext, useContext, useEffect, useState } from "react";

const UsersContext = createContext();

const useUsersContext = () => useContext(UsersContext);

const UsersProvider = ({ children }) => {

	const [users, setUsers] = useState();
	const [cotizacion, setCotizacion] = useState();
	const [idclient, setIdclient] = useState();
	const [agente, setNameAgente] = useState();
	const [modelo, setModelo] = useState();
	const [idasesor, setIdasesor] = useState();
	const [numeruser, setNumeruser] = useState();
	const [llave, setllave] = useState();
	const [modal, setModalshow] = useState();
	const [valueDesde, setValueDesde] = useState();
	const [valueHasta, setValueHasta] = useState();

	console.log(valueDesde)
    console.log(valueHasta)



	const setAsesor = (idAsesor) => {
		setIdasesor(idAsesor)
	}
	const setModal = (id) => {
		setModalshow(id);
	}
	const setkey = (key) => {
		setllave(key);
	}


	const clientId = (id, name, desmodelo, phone_number, numcot, agente) => {
		setUsers(name)
		setIdclient(id)
		setModelo(desmodelo)
		setNumeruser(phone_number);
		setCotizacion(numcot);
		setNameAgente(agente);
	};

	return (
		<UsersContext.Provider value={{
			numeruser,
			users,
			idclient,
			modelo,
			idasesor,
			llave,
			modal,
			cotizacion,
			agente,
			setAsesor,
			clientId,
			setkey,
			setModal,
			
		}}>
			{children}
		</UsersContext.Provider>
	);
};

export { useUsersContext, UsersProvider };