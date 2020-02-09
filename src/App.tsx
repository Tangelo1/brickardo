import React from 'react';
// import logo from './logo.svg';
// import Landing from './modules/Queue'
// import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Play from './modules/Play'

const App = () => {
	const inQueue = true;
	const messageWebSocket = new WebSocket('ws://10.2.5.173:42069', 'echo-protocol');
	//const videoWebSocket = new MediaStream;
	//10.2.5.173:42069

	console.log(messageWebSocket)
	console.log(messageWebSocket.OPEN)
	

	//On recieve "youre up" message
	//Update inQueue to false

	messageWebSocket.onopen = () => {
		console.log('Open');
		messageWebSocket.send('Hello Server')
	}

	return (
		<div className='App'>
			<main>
				<Play
					messageWebSocket={messageWebSocket}
				></Play>
			</main>
		</div>
	);
}

export default App;
