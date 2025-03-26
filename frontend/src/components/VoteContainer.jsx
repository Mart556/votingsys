const VotingContainer = ({ setNegativeVote, setPositiveVote }) => {
	return (
		<div className='voting-container w-full bg-neutral-800 h-full'>
			<div className='flex flex-col items-center justify-center h-full p-4'>
				<div className='w-full max-w-4xl bg-neutral-700  shadow-lg overflow-hidden border-2 border-neutral-900 rounded-md'>
					<table className='w-full border-collapse'>
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
							{[
								'John Doe',
								'Jane Smith',
								'David Johnson',
								'Maria Garcia',
								'Robert Wilson',
							].map((name, index) => (
								<tr
									key={index}
									className={
										index % 2 === 0
											? 'bg-neutral-700'
											: 'bg-neutral-600'
									}
								>
									<td className='p-4 text-lg font-medium text-center text-white border-b border-neutral-600'>
										{name}
									</td>
									<td className='p-4 border-b border-neutral-600'>
										<div className='flex gap-4 justify-center'>
											<button
												onClick={setPositiveVote}
												className='px-4 py-2 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 transition duration-200 cursor-pointer'
											>
												Davs.
											</button>
											<button
												onClick={setNegativeVote}
												className='px-4 py-2 bg-red-600 text-white rounded-md font-medium hover:bg-red-700 transition duration-200 cursor-pointer'
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
		</div>
	);
};

export default VotingContainer;
