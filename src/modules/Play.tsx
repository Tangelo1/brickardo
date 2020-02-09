import React from 'react';
import { Button } from 'carbon-components-react';
//import Queue from './Queue';
//import ArrowKeysReact from 'arrow-keys-react';

interface IPlayPageState {
	content: string;
}

interface IPlayPageProps {
	messageWebSocket?: WebSocket;
	totalClients: string;
	currentClients: string;
	votes: {
		left: string;
		right: string;
		forward: string;
		back: string;
	};
}

class Play extends React.Component<IPlayPageProps, IPlayPageState> {
	constructor(props: IPlayPageProps) {
		super(props)
		this.state = {
			content: '',
		}
		// ArrowKeysReact.config({
		// 	left: () => {
		// 	  this.setState({
		// 		content: 'left key detected.'
		// 	  });
		// 	},
		// 	right: () => {
		// 	  this.setState({
		// 		content: 'right key detected.'
		// 	  });
		// 	},
		// 	up: () => {
		// 	  this.setState({
		// 		content: 'up key detected.'
		// 	  });
		// 	},
		// 	down: () => {
		// 	  this.setState({
		// 		content: 'down key detected.'
		// 	  });
		// 	},
		// });
	}

	sendRequest = (message: string) => {
		this.props.messageWebSocket?.send(message)
	}

	componentDidMount() {
		//this.sendRequest('Gimmie')
		//this.focusGameDiv();
	}

	focusGameDiv = () => {
		const gameDiv = document.getElementById("gameDiv");
		if (gameDiv) {
			gameDiv.focus();
		}
	}

	render() {
		//{/*...ArrowKeysReact.events*/...}
		//this.props.messageWebSocket?.send('Gimmie gimmie')
		return (
			<div>
				<h1 className='title-heading'><b>Brickardo!</b></h1>
				<img width='200px' height='200px'src='https://brickhack.io/assets/bh-logos/brickhack-6-ec3ad60c77e9a5fda248640e5febf72cd59245e3e3407dea968bf343d987dc07.png'></img>
				<div id='gameDiv'>
					<div className={'Button-div'}><Button onClick={() => this.sendRequest('L')}>Left</Button></div>
					<div className={'Button-div'}><Button onClick={() => this.sendRequest('R')}>Right</Button></div>
					<div className={'Button-div'}><Button onClick={() => this.sendRequest('F')}>Forward</Button></div>
					<div className={'Button-div'}><Button onClick={() => this.sendRequest('B')}>Back</Button></div>
				</div>
			</div>
		);
	}
}
export default Play;
