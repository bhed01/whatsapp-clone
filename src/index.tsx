import React from 'react';
import ReactDOM from 'react-dom';
import './index.min.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import UserProvider from './components/UserProvider';

ReactDOM.render(
	<React.StrictMode>
		<UserProvider>
			<App />
		</UserProvider>
	</React.StrictMode>,
	document.getElementById('root')
);

reportWebVitals();
