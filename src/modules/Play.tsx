import React from 'react';
import { Button } from 'carbon-components-react';
import { Tabs } from 'carbon-components-react';
import { Tab } from 'carbon-components-react';
import { PieChart } from '@carbon/charts-react';
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
	frontTotal: number;
	leftTotal: number;
	rightTotal: number;
	backTotal: number;
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
		const pieChartOptions = {
			title: "Stacked bar (discrete)",
			axes: {
				left: {
					primary: true,
					stacked: true
				},
				bottom: {
					scaleType: "labels",
					secondary: true
				}
			},
			height: "500px",
			width: '500px'
		};


		const data = {
			labels: ["Forward moves", "Backward moves", "Left Moves", "Right Moves"],
			datasets: [
			  {
				label: "Moves",
				data: [this.props.frontTotal, this.props.backTotal, this.props.leftTotal, this.props.rightTotal]
			  },
			]
		  }
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
					<div>
						<img height='100px' width='200px' src='data:image/png;base64,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'></img>
						<img height='100px' width='200px' src='https://i.pinimg.com/originals/b0/37/64/b03764fa810460952ed3d1d1dd903380.png'></img>
					</div>
					<div>
						<img height='125px' width='200px' src='https://i.pinimg.com/originals/c0/9f/29/c09f29209dcadcf184899b6981bff403.jpg'></img>
					</div>
					<div>
						<img height='100px' width='200px' src='https://coderit.org/assets/images/coderit/coderit_logo.svg'></img>
						<img height='100px' width='200px' src='https://lh3.googleusercontent.com/proxy/KXknzB57NqtxLvC3OvWWRh68dK1so7ag2c0QyQJILzELlRs0Q99QTJfNhXQ38yDpt8TuIv7dLKXrUZI1QpUgWcEddvwwFPk'></img>
					</div>

					
				</Tab>
				<Tab label={'Charts'}>
					<h1 className='charts-header' >Voting breakdown</h1>
					<PieChart
						options={pieChartOptions}
						data={data}>
					</PieChart>
				</Tab>
			</Tabs>
			
		);
	}
}
export default Play;
