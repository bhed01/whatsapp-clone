import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';

import db from '../firebase';
import { truncate } from '../utils';

interface Props {
	id: string;
	name: string;
}

const SidebarChat: FC<Props> = ({ id, name }) => {
	const [ lastMessage, setLastMessage ] = useState<firebase.firestore.DocumentData>();

	useEffect(
		() => {
			const unsubscribe = db
				.collection('rooms')
				.doc(id)
				.collection('messages')
				.orderBy('timestamp', 'desc')
				.onSnapshot((snapshot) => {
					if (snapshot.docs) setLastMessage(snapshot.docs.map((doc) => doc.data())[0]);
				});
			return () => unsubscribe();
		},
		[ id ]
	);

	return (
		<Link to={`/rooms/${id}`}>
			<div className="sidebar__chat">
				<div className="avatar">
					<img
						alt="Room Avatar"
						src={`https://picsum.photos/seed/${name.slice(0, 4) + id.slice(0, 4)}/64.webp`}
					/>
				</div>
				<div className="sidebar__chat__info">
					<h2>{name}</h2>
					<p>{lastMessage && lastMessage.message ? truncate(lastMessage.message, 30) : 'No messages yet'}</p>
				</div>
			</div>
		</Link>
	);
};

export default SidebarChat;
