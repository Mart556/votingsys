import './App.css';

const App = () => {
	return (
		<div className='main flex items-center justify-center h-screen w-full overflow-hidden'>
			<div className='config-container w-[30%] p-2 bg-neutral-700 h-full border-r-2 border-neutral-600'>
				<div className='config-header bg-neutral-800 h-12 flex items-center justify-center mb-20 border-2 border-neutral-900 rounded-md'>
					<h1 className='text-3xl text-neutral-100'>VotingSys</h1>
				</div>

				<div className='config-body h-dvh flex flex-col items-center gap-y-5 text-white'>
					<div className='flex flex-row gap-x-5 w-full text-center font-bold text-lg'>
						<div className='p-2 bg-neutral-600 rounded-md w-1/2 border-2 border-neutral-800'>
							<p className='m-0 text-lg'>Timer: 5:00</p>
						</div>

						<div className='p-2 bg-neutral-600 rounded-md w-1/2 border-2 border-neutral-800'>
							<p className='m-0 text-lg'>Lõppeb: 12:00</p>
						</div>
					</div>

					<div className='flex flex-row gap-x-5 w-full text-center font-bold text-lg'>
						<div className='p-2 bg-green-500/80 rounded-md w-full border-2 border-neutral-800'>
							<p className='m-0 text-lg'>Positiivseid: 0</p>
						</div>

						<div className='p-2 bg-red-500/80 rounded-md w-full border-2 border-neutral-800'>
							<p className='m-0 text-lg'>Negatiivseid: 0</p>
						</div>
					</div>

					<button
						type='button'
						className='p-4 bg-green-600 rounded-md w-1/2 border-2 border-green-800 cursor-pointer text-2xl font-bold hover:bg-green-700 transition duration-200'
					>
						Alusta
					</button>
				</div>
			</div>

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
												<button className='px-4 py-2 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 transition duration-200 cursor-pointer'>
													Davs.
												</button>
												<button className='px-4 py-2 bg-red-600 text-white rounded-md font-medium hover:bg-red-700 transition duration-200 cursor-pointer'>
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
		</div>
	);
};

export default App;
