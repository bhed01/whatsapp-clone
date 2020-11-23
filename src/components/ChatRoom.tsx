import React, { FC, useContext, useEffect, useRef, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import firebase from 'firebase/app'

import { HiDotsVertical } from 'react-icons/hi';

import { UserContext, UserContextType } from './UserProvider';
import { showDropdown, getColor } from '../utils'
import db from '../firebase';
import chat_bg from './chat-bg.png';
import ChatRoomFooter from './ChatRoomFooter';


const ChatRoom: FC = () => {
    const { roomId } = useParams<{roomId: string}>();
    const {user} = useContext<UserContextType>(UserContext);
    const bodyRef = useRef<HTMLDivElement>(null);
    const [roomName, setRoomName] = useState<string>('');
    const [messages, setMessages] = useState<firebase.firestore.DocumentData[]>([]);
    const [roomExists, setRoomExists] = useState<boolean>(true);
    
    const deleteRoom = () => {
        db
            .collection('rooms')
            .doc(roomId)
            .delete()
            .catch(err => console.log(err))
    }

    useEffect(() => {
        if(roomId){
            const unsubscribeRoom = db
                .collection('rooms')
                .doc(roomId)
                .onSnapshot(snapshot => {
                    if(snapshot.data())
                        setRoomName(snapshot.data()?.name)
                    else
                        setRoomExists(false);
                })
            
            const unsubscribeMessage = db
                .collection('rooms')
                .doc(roomId)
                .collection('messages')
                .orderBy('timestamp', 'asc')
                .onSnapshot(snapshot => {
                    setMessages(snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data()
                    })));
                })
                
            return () => {
                unsubscribeRoom();
                unsubscribeMessage();
            };
        }
    }, [roomId])

    if(!roomExists){
        return <Redirect to="/" />
    }
    
	return (
		<div className="chatroom">
			<div className="chatroom__header">
				<div className="avatar avatar--sm">
                    <img alt="Room Avatar" src={`https://picsum.photos/seed/${roomName.slice(0, 4) + roomId.slice(0, 4)}/64.webp`} />
				</div>
				<div className="chatroom__header__info">
					<h3>{roomName}</h3>
                    <p>{(messages?.length > 0) ?'Last activity at ' + messages[messages.length - 1].timestamp.toDate().toLocaleString():'No activity yet'}</p>
				</div>
				<div className="dropdown-btn">
                    <div className="icon" onClick={showDropdown}>
                        <HiDotsVertical />
                    </div>
                    <ul className="dropdown-menu">
                        <li onClick={deleteRoom}>Delete</li>
                    </ul>
				</div>
			</div>
			<div ref={bodyRef} className="chatroom__body" style={{ backgroundImage: `url(${chat_bg})` }}>
                {
                    messages?.map((message) => (
                        <div key={message.id} className={`chat ${user?.uid === message.author.id && 'chat--reciever'}`}>
                            <h4 className="chat__author" style={{color:getColor(message.author.id)}}>{message.author.name}</h4>
                            <p className="chat__message">{message.message}</p>
                            <small className="chat__timestamp">{new Date(message.timestamp.toDate()).toLocaleString()}</small>
                        </div>
                    ))
                }
			</div>
			<ChatRoomFooter bodyRef={bodyRef} />
		</div>
	);
};

export default ChatRoom;
