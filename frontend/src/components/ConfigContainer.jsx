const ConfigContainer = ({
	positiveVotes,
	negativeVotes,
	handleVoting,
	votingStarted,
	timer,
	endTime,
}) => {
	return (
		<div className='config-container w-[30%] p-2 bg-neutral-700 h-full border-r-2 border-neutral-600'>
			<div className='config-header bg-neutral-800 h-12 flex items-center justify-center mb-10 border-2 border-neutral-900 rounded-md'>
				<h1 className='text-3xl text-neutral-100'>VotingSys</h1>
			</div>

			<div className='config-body h-dvh flex flex-col items-center gap-y-5 text-white'>
				<div className='flex flex-row gap-x-5 w-full text-center font-bold text-lg'>
					<div className='p-2 bg-neutral-600 rounded-md w-1/2 border-2 border-neutral-800'>
						<p className='m-0 text-lg'>Timer: {timer}</p>
					</div>

					<div className='p-2 bg-neutral-600 rounded-md w-1/2 border-2 border-neutral-800'>
						<p className='m-0 text-lg'>
							Lõppeb:{' '}
							{new Date(endTime).toLocaleTimeString([], {
								hour: '2-digit',
								minute: '2-digit',
								hour12: false,
							})}
						</p>
					</div>
				</div>

				<div className='flex flex-row gap-x-5 w-full text-center font-bold text-lg'>
					<div className='p-2 bg-green-500/80 rounded-md w-full border-2 border-neutral-800'>
						<p className='m-0 text-lg'>
							Positiivseid: {positiveVotes}
						</p>
					</div>

					<div className='p-2 bg-red-500/80 rounded-md w-full border-2 border-neutral-800'>
						<p className='m-0 text-lg'>
							Negatiivseid: {negativeVotes}
						</p>
					</div>
				</div>

				{!votingStarted ? (
					<button
						type='button'
						onClick={handleVoting}
						className='p-4 bg-green-600 rounded-md w-1/2 border-2 border-green-800 cursor-pointer text-2xl font-bold hover:bg-green-700 transition duration-200'
					>
						Alusta
					</button>
				) : (
					<button
						type='button'
						onClick={handleVoting}
						className='p-4 bg-red-600 rounded-md w-1/2 border-2 border-red-800 cursor-pointer text-2xl font-bold hover:bg-red-700 transition duration-200'
					>
						Lõpeta
					</button>
				)}
			</div>
		</div>
	);
};

export default ConfigContainer;
