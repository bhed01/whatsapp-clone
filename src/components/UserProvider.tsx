import React, { createContext, FC, useEffect, useState } from 'react';
import firebase from 'firebase/app';
import { auth } from '../firebase';
import { setTheme } from '../utils';

export type UserContextType = {
	user?: firebase.User | null;
	setUser: React.Dispatch<React.SetStateAction<firebase.User | null | undefined>>;
};

export const UserContext = createContext<UserContextType>({ setUser: () => {} });

const UserProvider: FC = ({ children }) => {
	const [ user, setUser ] = useState<firebase.User | null | undefined>(undefined);
	const [ pending, setPending ] = useState<boolean>(true);

	useEffect(() => {
		auth.onAuthStateChanged((u) => {
			setUser(u);
			setPending(false);
		});

		setTheme(window.localStorage.getItem('theme'));
	}, []);

	if (pending) return <div>Loading...</div>;
	return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export default UserProvider;
