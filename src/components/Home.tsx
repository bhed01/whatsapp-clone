import React, { FC } from 'react';
import logo from './logo.svg';
import { createRoom } from '../firebase';

const Home: FC = () => {
	return (
		<div className="home">
			<div className="home__content">
				<img src={logo} alt="logo" height="128px" width="128px" />
				<h1>Keep yourself connected</h1>
				<p>Create Chat Room and stay connected.</p>
				<button onClick={createRoom} className="btn">
					Create Chat Room
				</button>
			</div>
			<div className="home__footer" />
		</div>
	);
};

export default Home;
