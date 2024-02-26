import React, { useEffect, useState } from "react";
import Icon from "components/Icon";
/* import axios from 'axios'; */

const attachButtons = [
	{ icon: "attachContacts", label: "Choose contact" },
	{ icon: "attachDocument", label: "Choose document" },
	/* { icon: "attachImage", label: "Choose image" }, */
];

const ChatInput = ({
	showAttach,
	setShowAttach,
	newMessage,
	setNewMessage,
	submitNewMessage,
}) => {
	const detectEnterPress = (e) => {
		if (e.key === "Enter" || e.keyCode === 13) {
			submitNewMessage();
		}
	};

	return (
		<div className="chat__input-wrapper">
			<div className="pos-rel">
				<button aria-label="Attach" onClick={() => setShowAttach(!showAttach)}>
					<Icon
						id="attach"
						className={`chat__input-icon ${showAttach ? "chat__input-icon--pressed" : ""
							}`}
					/>
				</button>

				<div
					className={`chat__attach ${showAttach ? "chat__attach--active" : ""}`}
				>
					{attachButtons.map((btn) => (
						<button
							className="chat__attach-btn"
							aria-label={btn.label}
							key={btn.label}
						>
							<Icon id={btn.icon} className="chat__attach-icon" />
						</button>
					))}
				</div>
			</div>
			<input
				className="chat__input no-outline"
				placeholder="Escribe un mensaje aquí"
				value={newMessage}
				onChange={(e) => setNewMessage(e.target.value)}
				onKeyDown={detectEnterPress}
				maxLength='80'
			/>
			{newMessage ? (
				<button aria-label="Send message" onClick={submitNewMessage}>
					<Icon id="send" className="chat__input-icon" />
				</button>
			) : (
				<button aria-label="Record voice note">
					{/* <Icon id="microphone" className="chat__input-icon" /> */}
					<Icon id="send" className="chat__input-icon" />
				</button>
			)}
		</div>
	);
};

export default ChatInput;
