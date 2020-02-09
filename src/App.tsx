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
	votes?: IDirectionalDataObject;
	totalClients: string;
	currentClients: string;
	totalVotes: string;
	timeRemaining: number;
	timerFunc?: NodeJS.Timeout;
	frontTotal: number;
	leftTotal: number;
	rightTotal: number;
	backTotal: number;
}

interface IDirectionalDataObject {
	'forward': number;
	'left': number;
	'right': number;
	'back': number;
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
			currentClients: '1',
			totalVotes: '',
			votes: {
				left: 0,
				right: 0,
				forward: 0,
				back: 0,
			},
			timeRemaining: 0,
			frontTotal: 0,
			leftTotal: 0,
			rightTotal: 0,
			backTotal: 0,
		}
		
		//const videoWebSocket = new MediaStream;
		//10.2.5.173:42069
	}

	timer = () => {
		var count = this.state.timeRemaining;
		this.setState({
			timeRemaining: count - 1
		});
		if (count <= 0) {
			this.setState({
				timeRemaining: 5,
				votes: {
					left: 0,
					right: 0,
					forward: 0,
					back: 0,
				}
			});
		}
	}

	startTimer = () => {
		var counter = setInterval(this.timer, 1000); //1000 will  run it every 1 second
		this.setState({
			timerFunc: counter,
			timeRemaining: this.state.timeRemaining
		});
		
	}

	handleMessageRecieved = (event: IEvent ): void => {
		const data: string = event.data

		if (data.includes('time')) {
			this.setState({
				timeRemaining: Number(data.split(': ')[1])
			}, () => {
				this.startTimer();
			});
		}
		else if (data.includes('total_votes')) {
			this.setState({
				totalVotes: data.split(': ')[1]
			});
		}
		else if (data.includes('total')) {
			this.setState({
				totalClients: data.split(': ')[1]
			});
		}
		else if (data.includes('current')) {
			this.setState({
				currentClients: data.split(': ')[1]
			});
		}
		else if (data.includes('forward')) {
			const newData = data.slice(1, data.length - 1)
			this.setState({
				votes: {
					forward: Number((newData.split('forward\': ')[1].split(','))[0]),
					back: Number((newData.split('back\': ')[1].split(','))[0]),
					left: Number((newData.split('left\': ')[1].split(','))[0]),
					right: Number((newData.split('right\': ')[1].split(','))[0]),
				}
			});
		}
		else if (data.includes('frbl')) {
			this.setState({
				frontTotal: Number((data.split(': ')[1].split(', '))[0]),
				rightTotal: Number((data.split(': ')[1].split(', '))[1]),
				backTotal: Number((data.split(': ')[1].split(', '))[2]),
				leftTotal: Number((data.split(': ')[1].split(', '))[3]),

			});
		}
		else {
			console.log(data)
		}
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
					frontTotal={this.state.frontTotal}
					rightTotal={this.state.rightTotal}
					backTotal={this.state.backTotal}
					leftTotal={this.state.leftTotal}
					messageWebSocket={this.state.messageWebSocket}
					totalClients={this.state.totalClients}
					currentClients={this.state.currentClients}
					votes={this.state.votes}
					totalVotes={this.state.totalVotes}
					timer={this.state.timeRemaining}
				></Play>
				}
			</div>
		);
	}
}

export default App;
