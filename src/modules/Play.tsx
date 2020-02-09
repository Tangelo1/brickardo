import React from 'react';
//import Queue from './Queue';
//import ArrowKeysReact from 'arrow-keys-react';

interface IPlayPageState {
	content: string;
}

interface IPlayPageProps {
	messageWebSocket: WebSocket;
}

class Queue extends React.Component<IPlayPageProps, IPlayPageState> {
	constructor(props: any) {
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

	sendRequest = (direction: string) => {
		if (!this.props.messageWebSocket.CONNECTING) {
			this.props.messageWebSocket.send(direction)
		}
	}

	componentDidMount() {
		this.focusGameDiv();
	}

	focusGameDiv = () => {
		const gameDiv = document.getElementById("gameDiv");
		if (gameDiv) {
			gameDiv.focus();
		}
	}

	render() {
		//{/*...ArrowKeysReact.events*/...}
		return (
		<div id='gameDiv'  tabIndex={0}>
				<div className={'button-div'}><button onClick={() => this.sendRequest('L')}>Left</button></div>
				<div className={'button-div'}><button onClick={() => this.sendRequest('R')}>Right</button></div>
				<div className={'button-div'}><button onClick={() => this.sendRequest('F')}>Forward</button></div>
				<div className={'button-div'}><button onClick={() => this.sendRequest('B')}>Back</button></div>
			</div>
		);
	}
}
export default Queue;
