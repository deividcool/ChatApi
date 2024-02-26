/* import React, { useState, useEffect } from "react";
import Icon from "components/Icon";
import { Link } from "react-router-dom";
import formatTime from "utils/formatTime";
import { useUsersContext } from "context/usersContext";
import Avatar from '@mui/material/Avatar';

function stringToColor(string) {
	let hash = 0;
	let i;

	/* eslint-disable no-bitwise 
	for (i = 0; i < string.length; i += 1) {
		hash = string.charCodeAt(i) + ((hash << 5) - hash);
	}

	let color = '#';

	for (i = 0; i < 3; i += 1) {
		const value = (hash >> (i * 8)) & 0xff;
		color += `00${value.toString(16)}`.slice(-2);
	}
	/* eslint-enable no-bitwise 

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

const Contact = ({ users }) => {
	const { setUserAsUnread } = useUsersContext();
	/* const getLastMessage = () => {
		const messageDates = Object.keys(users.messages);
		const recentMessageDate = messageDates[messageDates.length - 1];
		const messages = [...users.messages[recentMessageDate]];
		const lastMessage = messages.pop();
		return lastMessage; 
	}; 

	/* 	const lastMessage = getLastMessage(users); 


	console.log(users);




	return (
		<Link
			className="sidebar-contact"
			to={users.id}
			onClick={() => setUserAsUnread(users.id)} 
		>
			<div className="sidebar-contact__avatar-wrapper">
				<Avatar className="large-avatar" {...stringAvatar(users.name)} />
			</div>
			<div className="sidebar-contact__content">
				<div className="sidebar-contact__top-content">
					<h2 className="sidebar-contact__name"> {users.name} </h2>
					{/* <span className="sidebar-contact__time">
						{formatTime(lastMessage.time)}
					</span> 
				</div>
				{/* <div className="sidebar-contact__bottom-content">
					<p className="sidebar-contact__message-wrapper">
						{lastMessage.status && (
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
						)}
						<span
							className={`sidebar-contact__message ${!!users.unread ? "sidebar-contact__message--unread" : ""
								}`}
						>
							{users.Escribiendo ? <i> Escribiendo...</i> : lastMessage?.content}
						</span>
					</p>
					<div className="sidebar-contact__icons">
						{users.unread !== 0 &&
							<span className="sidebar-contact__unread">{users.unread}</span>
						}
					</div>
				</div> 
			</div>
		</Link>
	);
};

export default Contact; */
