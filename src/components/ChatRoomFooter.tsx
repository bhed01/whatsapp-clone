import React, { FC, useState, FormEvent, useContext, RefObject } from 'react';
import { useParams } from 'react-router-dom';
import firebase from 'firebase/app';

import 'emoji-mart/css/emoji-mart.css';
import { EmojiData, Picker } from 'emoji-mart';

import db from '../firebase';
import { UserContext, UserContextType } from './UserProvider';
import { GrEmoji } from 'react-icons/gr';
import { IoMdMic } from 'react-icons/io';

const ChatRoomFooter: FC<{bodyRef: RefObject<HTMLDivElement>}> = ({bodyRef}) => {
	const [ pickerVisible, setPickerVisible ] = useState<boolean>(false);
	const [ newMessage, setNewMessage ] = useState<string>('');
	const { user } = useContext<UserContextType>(UserContext);
	const { roomId } = useParams<{ roomId: string }>();

	const sendMessage = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (user)
			db.collection('rooms').doc(roomId).collection('messages').add({
				message: newMessage,
				author: {
					id: user.uid,
					name: user.displayName
				},
				timestamp: firebase.firestore.Timestamp.now()
			});
		setNewMessage('');
	};

	const showEmojiPicker = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        (e.target as HTMLDivElement).classList.toggle('selected');
        bodyRef.current?.classList.toggle('small')
        setPickerVisible((visibility) => !visibility);
	};

    const onSelect = (data: EmojiData) => {
        setNewMessage(message => message+(data as {native: ""}).native);
    }

	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			<Picker
				style={{
					display: pickerVisible ? '' : 'none',
					width: 'auto',
					border: 'none',
					backgroundColor: 'var(--header-bg-clr)',
					borderRadius: 0
				}}
				color="#009688"
				emojiSize={32}
				showPreview={false}
                showSkinTones={false}
                onSelect={onSelect}
			/>
			<div className="chatroom__footer">
				<div className="icon" onClick={showEmojiPicker}>
					<GrEmoji />
				</div>
				<form onSubmit={sendMessage} className="chatroom__form">
					<input
						type="text"
						name="message"
						placeholder="Type a message"
						value={newMessage}
						onChange={(e) => setNewMessage(e.target.value)}
					/>
					<button type="submit">Send</button>
				</form>
				<div className="icon">
					<IoMdMic />
				</div>
			</div>
		</div>
	);
};

export default ChatRoomFooter;
