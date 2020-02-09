import React from 'react';
//import Queue from './Queue';
//import ArrowKeysReact from 'arrow-keys-react';

interface IPlayPageState {
	content: string;
}

// Gonna need player type
interface IPlayPageProps {
	messageWebSocket: WebSocket;
}



class Queue extends React.Component<IPlayPageProps, IPlayPageState> {
	constructor(props: any) {
		super(props)
		this.state = {
			content: ''
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
		this.props.messageWebSocket.send(direction)
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
				<button onClick={() => this.sendRequest('L')}>Left</button>
				<button onClick={() => this.sendRequest('R')}>Right</button>
				<button onClick={() => this.sendRequest('F')}>Forward</button>
				<button onClick={() => this.sendRequest('B')}>Back</button>
			</div>
		);
	}
}
export default Queue;
