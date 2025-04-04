import { useEffect, useState } from 'react';

import './VoteContainer.css';

const VotingContainer = ({ handleVotes, votingStarted }) => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		if (votingStarted) {
			fetch('/api/request-users')
				.then((res) => res.json())
				.then((data) => {
					if (votingStarted && data.users) {
						setUsers(data.users);
					}
				})
				.catch((err) => {
					console.error('Error fetching users:', err);
				});
		} else {
			setUsers([]);
		}
	}, [votingStarted]);

	const handleVote = (index, newVote) => {
		const updatedUsers = [...users];
		const previousVote = updatedUsers[index].vote;

		if (previousVote !== null) {
			if (previousVote === 1) handleVotes('positive', -1);
			if (previousVote === 0) handleVotes('negative', -1);
		}

		updatedUsers[index].vote = newVote;
		setUsers(updatedUsers);

		if (newVote === 1) handleVotes('positive', 1);
		if (newVote === 0) handleVotes('negative', 1);

		fetch('/api/vote', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				id: updatedUsers[index].id,
				vote: newVote,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				if (!data.success) {
					console.error('Failed to update vote');
				}

				console.log('Vote updated successfully');
			})
			.catch((err) => {
				console.error('Error updating vote:', err);
			});
	};

	return (
		<div className='voting-container w-full bg-neutral-800 h-full'>
			{!votingStarted ? (
				<div className='flex items-center justify-center h-full'>
					<h1 className='text-4xl text-white'>
						Voting has not started yet.
					</h1>
				</div>
			) : (
				<div className='flex flex-col items-center justify-center h-full p-4'>
					<div className='w-full max-w-4xl bg-neutral-700  shadow-lg overflow-auto  border-2 border-neutral-900 rounded-md'>
						<table className='w-full border-collapse '>
							<thead>
								<tr className='bg-neutral-800'>
									<th className='text-center p-4 text-xl font-bold text-white border-b-2 border-neutral-600'>
										Täisnimi
									</th>
									<th className='text-center p-4 text-xl font-bold text-white border-b-2 border-neutral-600'>
										Valik
									</th>
								</tr>
							</thead>
							<tbody>
								{users.map((user, index) => (
									<tr
										key={index}
										className={
											index % 2 === 0
												? 'bg-neutral-700'
												: 'bg-neutral-600'
										}
									>
										<td className='p-4 text-lg font-medium text-center text-white border-b border-neutral-600'>
											{user.firstname} {user.lastname}
										</td>
										<td className='p-4 border-b border-neutral-600'>
											<div className='flex gap-4 justify-center'>
												<button
													onClick={() =>
														handleVote(index, 1)
													}
													disabled={
														user.vote === 1 ||
														!votingStarted
													}
													className='px-4 py-2 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 transition duration-200 cursor-pointer disabled:opacity-50'
												>
													Davs.
												</button>
												<button
													onClick={() =>
														handleVote(index, 0)
													}
													disabled={
														user.vote === 0 ||
														!votingStarted
													}
													className='px-4 py-2 bg-red-600 text-white rounded-md font-medium hover:bg-red-700 transition duration-200 cursor-pointer disabled:opacity-50'
												>
													Nope.
												</button>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			)}
		</div>
	);
};

export default VotingContainer;
