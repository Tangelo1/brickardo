import React from 'react';
import { Button } from 'carbon-components-react';
import { Tabs } from 'carbon-components-react';
import { Tab } from 'carbon-components-react';
//import Queue from './Queue';
//import ArrowKeysReact from 'arrow-keys-react';

interface IPlayPageState {
	content: string;
}

interface IPlayPageProps {
	messageWebSocket?: WebSocket;
	totalClients: string;
	currentClients: string;
	votes?: {
		left: number;
		right: number;
		forward: number;
		back: number;
	};
	totalVotes: string;
	timer: number;
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

	componentDidMount = () => {
		
	}

	componentDidUpdate = () => {
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
			<Tabs>
				<Tab label={'Play!'}>
				<div>
					<h1 className='title-heading'><b>Brickardo!</b></h1>
					<img width='200px' height='200px'src='https://brickhack.io/assets/bh-logos/brickhack-6-ec3ad60c77e9a5fda248640e5febf72cd59245e3e3407dea968bf343d987dc07.png'></img>
					<div id='gameDiv'>
						<div className={'Button-div'}><Button onClick={() => this.sendRequest('L')}>Left: {this.props.votes?.left}</Button></div>
						<div className={'Button-div'}><Button onClick={() => this.sendRequest('R')}>Right: {this.props.votes?.right}</Button></div>
						<div className={'Button-div'}><Button onClick={() => this.sendRequest('F')}>Forward: {this.props.votes?.forward}</Button></div>
						<div className={'Button-div'}><Button onClick={() => this.sendRequest('B')}>Back: {this.props.votes?.back}</Button></div>
					</div>
					<div className='timer'>Vote window closes in: {this.props.timer}</div>		
				</div>
				</Tab>
				<Tab label={'Stats'}>
					<div className='stats-div'>
						<div className='stat'>People currently helping Brickardo: {this.props.currentClients}</div>
						<div className='stat'>Everyone whos helped Brickardo: {this.props.totalClients}</div>
						<div className='stat'>Directions voted for: {this.props.totalVotes}</div>
					</div>
				</Tab>
			</Tabs>
			
		);
	}
}
export default Play;
