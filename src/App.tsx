import React from 'react';
// import logo from './logo.svg';
// import Landing from './modules/Queue'
// import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Play from './modules/Play'
import { Loading } from 'carbon-components-react';

interface IAppProps {}
interface IAppState {
	loading: boolean;
	messageWebSocket?: WebSocket;
	votes: IVotes;
	totalClients: string;
	currentClients: string;
}

interface IEvent {
	data: string;
}

interface IVotes {
	left: string;
	right: string;
	forward: string;
	back: string;
}

class App extends React.Component<IAppProps, IAppState> {
	constructor(props: IAppProps) {
		super(props)
		this.state = {
			loading: true,
			totalClients: '',
			currentClients: '',
			votes: {
				left: '',
				right: '',
				forward: '',
				back: '',
			}
		}
		
		//const videoWebSocket = new MediaStream;
		//10.2.5.173:42069
	}

	handleMessageRecieved = (event: IEvent): void => {
		const data = event.data
		//if (data.con)
		console.log(event.data)
	}

	handleOnOpen = () => {
		this.state.messageWebSocket?.send('Hello Server')
	}

	checkWebSocketConenction = () => {
		if (this.state.messageWebSocket && this.state.messageWebSocket.OPEN ) {
			this.setState({
				loading: false
			});
		}
	}

	componentDidMount = () => {
		const messageWebSocket = new WebSocket('ws://10.2.5.173:42069');
		messageWebSocket.onmessage = this.handleMessageRecieved
		messageWebSocket.onopen = this.handleOnOpen
		this.setState({
			messageWebSocket: messageWebSocket
		}, () => { this.checkWebSocketConenction() });

	}

	// console.log(messageWebSocket)
	// console.log(messageWebSocket.OPEN)

	//On recieve "youre up" message
	//Update inQueue to false

	// messageWebSocket.onopen = () => {
	// 	console.log('Open');
	// 	messageWebSocket.send('Hello Server')
	// }

	render() {
		return (
			<div className='App'>
				{ this.state.loading ? <Loading
					active
					className="some-class"
					description="Active loading indicator"
					small={false}
					withOverlay={true}
				/> :
				<Play
					messageWebSocket={this.state.messageWebSocket}
					totalClients={this.state.totalClients}
					currentClients={this.state.currentClients}
					votes={this.state.votes}
				></Play>
				}
			</div>
		);
	}
}

export default App;
