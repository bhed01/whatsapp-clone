import React, { FC, useContext } from 'react';

import { UserContext, UserContextType } from './UserProvider';
import { auth, provider } from '../firebase';
import logo from './logo.svg';

const Login: FC = () => {
	const { setUser } = useContext<UserContextType>(UserContext);

	const signIn = () => {
		auth
			.signInWithPopup(provider)
			.then((result) => {
				setUser(result.user);
			})
			.catch((error) => alert(error.message));
	};

	return (
		<div className="login">
			<img src={logo} alt="logo" height="80px" width="80px" />
			<h1>Sign in to WhatsChat</h1>
			<button className="btn btn--primary" onClick={signIn}>
				Sign in with Google
			</button>
		</div>
	);
};

export default Login;
