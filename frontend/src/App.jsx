import { useState, useEffect } from 'react';

import './App.css';

import ConfigContainer from './components/ConfigContainer';
import VoteContainer from './components/VoteContainer';

const VotingTime = 1 * 10000;

const App = () => {
	const [positiveVotes, setPositiveVotes] = useState(0);
	const [negativeVotes, setNegativeVotes] = useState(0);

	const handleVotes = (type, amount) => {
		switch (type) {
			case 'positive':
				setPositiveVotes((prev) => prev + amount);
				break;
			case 'negative':
				setNegativeVotes((prev) => prev + amount);
				break;
			default:
				break;
		}
	};

	const [votingStarted, setVotingStarted] = useState(false);
	const [timer, setTimer] = useState(VotingTime / 1000);

	const [entTime, setEndTime] = useState(new Date().getTime() + VotingTime);

	const handleVoting = () => {
		setVotingStarted(!votingStarted);
	};

	const votingEnded = () => {
		setVotingStarted(false);

		const positive = positiveVotes;
		const negative = negativeVotes;

		setPositiveVotes(0);
		setNegativeVotes(0);

		setEndTime(new Date().getTime());

		alert(`Positiivseid: ${positive}\nNegatiivseid: ${negative}`);
	};

	useEffect(() => {
		let interval = null;

		if (votingStarted) {
			setTimer(VotingTime / 1000);

			interval = setInterval(() => {
				setTimer((prev) => {
					if (prev <= 1) {
						clearInterval(interval);

						return 0;
					}
					return prev - 1;
				});
			}, 1000);

			setEndTime(new Date().getTime() + VotingTime);
		} else {
			setTimer(0);
		}

		return () => {
			if (interval) clearInterval(interval);
		};
	}, [votingStarted]);

	const formatTime = () => {
		const minutes = Math.floor(timer / 60);
		const seconds = timer % 60;
		return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
	};

	return (
		<div className='main flex items-center justify-center h-screen w-full overflow-hidden'>
			<ConfigContainer
				positiveVotes={positiveVotes}
				negativeVotes={negativeVotes}
				handleVoting={handleVoting}
				votingStarted={votingStarted}
				timer={formatTime()}
				endTime={entTime}
			/>
			<VoteContainer
				handleVotes={handleVotes}
				votingStarted={votingStarted}
			/>
		</div>
	);
};

export default App;
