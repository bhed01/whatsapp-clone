import React, { FC, useContext } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

import Sidebar from './Sidebar';
import ChatRoom from './ChatRoom';
import Login from './Login';
import Home from './Home';

import { UserContext, UserContextType } from './UserProvider';

const App: FC = () => {
	const { user } = useContext<UserContextType>(UserContext);

	return (
		<Router>
			{user ? (
				<div className="app">
					<Sidebar />
					<Switch>
						<Route path="/rooms/:roomId">
							<ChatRoom />
						</Route>
						<Route path="/">
							<Home />
						</Route>
					</Switch>
				</div>
			) : (
				<Login />
			)}
		</Router>
	);
};

export default App;
