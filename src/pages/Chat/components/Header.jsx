import React from "react";
import Icon from "components/Icon";
import OptionsBtn from "components/OptionsButton";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

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
	return {
	  sx: {
		bgcolor: stringToColor(name)
	  },
	  children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
	};
  }

const Header = ({ item, openProfileSidebar }) => {
	return (
		<header className="header chat__header">
			<div className="chat__avatar-wrapper" onClick={openProfileSidebar}>
				<Avatar className="large-avatar" {...stringAvatar(item.name)} />
			</div>

			<div className="chat__contact-wrapper" onClick={openProfileSidebar}>
				<h2 className="chat__contact-name"> {item?.name}</h2>
				{/* <p className="chat__contact-desc">
					 {item.Escribiendo ? "Escribiendo..." : "Conectado"} 
				</p> */}
			</div>
		</header>
	);
};

export default Header;
