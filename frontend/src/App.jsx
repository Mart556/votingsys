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

	const [votingStarted, setVotingStarted] = useState(null);
	const [timer, setTimer] = useState(VotingTime / 1000);

	const [entTime, setEndTime] = useState(new Date().getTime() + VotingTime);

	const handleVoting = () => {
		setVotingStarted(!votingStarted);
	};

	const handleVotingEnd = () => {
		// Cache current votes
		const positive = positiveVotes;
		const negative = negativeVotes;

		// Reset votes
		setPositiveVotes(0);
		setNegativeVotes(0);
		setEndTime(new Date().getTime());

		// Display results
		alert(`Voting Results\nPositive: ${positive}\nNegative: ${negative}`);
	};

	useEffect(() => {
		fetch('api/voting-started', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				votingStarted: votingStarted,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.success) {
					console.log('Voting session created:', data.id);
				}
			})
			.catch((err) => {
				console.error('Error updating vote:', err);
			});

		let timerInterval = null;

		if (votingStarted) {
			// Start new voting session
			setTimer(VotingTime / 1000);
			setEndTime(new Date().getTime() + VotingTime);

			timerInterval = setInterval(() => {
				setTimer((prevTime) => {
					if (prevTime <= 1) {
						clearInterval(timerInterval);
						setVotingStarted(false);
						return 0;
					}

					return prevTime - 1;
				});
			}, 1000);
		} else if (votingStarted === false) {
			setTimer(0);
			handleVotingEnd();
		}

		return () => {
			if (timerInterval) clearInterval(timerInterval);
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
