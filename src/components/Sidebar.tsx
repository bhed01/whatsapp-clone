import React, { FC, Fragment, useContext, useEffect, useState } from 'react';
import firebase from 'firebase/app';

import { HiUserCircle, HiDotsVertical, HiOutlineSearch } from 'react-icons/hi';
import { MdChat } from 'react-icons/md';

import { UserContext, UserContextType } from './UserProvider';
import { setTheme, showDropdown } from '../utils';
import db, { auth, createRoom } from '../firebase';
import SidebarChat from './SidebarChat';
import Popup from './Popup';

const Sidebar: FC = () => {
	const [ rooms, setRooms ] = useState<firebase.firestore.DocumentData[]>([]);
	const { user } = useContext<UserContextType>(UserContext);
	const [ popupVisible, setPopupVisible ] = useState<boolean>(false);
	const [ searchRoom, setSearchRoom ] = useState<string>('');

	useEffect(() => {
		const unsubscribe = db.collection('rooms').onSnapshot((snapshot) =>
			setRooms(
				snapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data()
				}))
			)
		);
		return () => unsubscribe();
	}, []);

	return (
		<Fragment>
			{popupVisible ? (
				<Popup
					heading="Choose theme"
					btns={
						<Fragment>
							<button
								onClick={() => {
									setTheme('light');
									setPopupVisible(false);
								}}
								className="btn btn--primary"
							>
								Light
							</button>
							<button
								onClick={() => {
									setTheme('dark');
									setPopupVisible(false);
								}}
								className="btn btn--primary"
							>
								Dark
							</button>
						</Fragment>
					}
					onBgClick={() => setPopupVisible(false)}
				/>
			) : (
				''
			)}
			<div className="sidebar">
				<div className="sidebar__header">
					{user && user.photoURL ? (
						<img className="avatar avatar--sm" src={user.photoURL} alt="User Avatar" />
					) : (
						<HiUserCircle className="avatar avatar--sm" />
					)}
					<div className="sidebar__header__right">
						<div className="icon" onClick={createRoom}>
							<MdChat />
						</div>
						<div className="dropdown-btn">
							<div className="icon" onClick={showDropdown}>
								<HiDotsVertical />
							</div>
							<ul className="dropdown-menu">
								<li onClick={() => setPopupVisible(true)}>Theme</li>
								<li onClick={() => auth.signOut()}>Logout</li>
							</ul>
						</div>
					</div>
				</div>
				<div className="sidebar__search">
					<div>
						<HiOutlineSearch />
					</div>
					<input
						onChange={(e) => setSearchRoom(e.target.value)}
						value={searchRoom}
						placeholder="Search or start new chat"
						type="text"
					/>
				</div>
				<div className="sidebar__chats">
					{rooms
						.filter((room) => room.name.toLowerCase().includes(searchRoom.toLowerCase()))
						.map((room) => <SidebarChat key={room.id} id={room.id} name={room.name} />)}
				</div>
			</div>
		</Fragment>
	);
};

export default Sidebar;
