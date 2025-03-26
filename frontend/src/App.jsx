import { useState, useEffect } from 'react';

import './App.css';

import ConfigContainer from './components/ConfigContainer';
import VoteContainer from './components/VoteContainer';

const VotingTime = 5 * 60000;

const App = () => {
	const [positiveVotes, setPositiveVotes] = useState(0);
	const [negativeVotes, setNegativeVotes] = useState(0);

	const handlePositiveVote = () => {
		setPositiveVotes(positiveVotes + 1);
	};

	const handleNegativeVote = () => {
		setNegativeVotes(negativeVotes + 1);
	};

	const [votingStarted, setVotingStarted] = useState(false);
	const [timer, setTimer] = useState(VotingTime / 1000);

	const [entTime, setEndTime] = useState(new Date().getTime() + VotingTime);

	const handleVoting = () => {
		setVotingStarted(!votingStarted);
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
			setEndTime(new Date().getTime());
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
				setNegativeVote={handleNegativeVote}
				setPositiveVote={handlePositiveVote}
			/>
		</div>
	);
};

export default App;
