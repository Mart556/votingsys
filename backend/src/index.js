import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

import db from './utils/db.js';
import cors from 'express-cors';
import path from 'path';
import { fileURLToPath } from 'url';

app.use(cors());

const getlastVotingSessionId = async () => {
	const [rows] = await db.query('SELECT MAX(id) AS id FROM tulemused');
	return rows[0].id;
};

let CURRENT_VOTING_SESSION_ID = getlastVotingSessionId();

app.get('/api/request-users', (req, res) => {
	db.query('SELECT * FROM haaletus')
		.then((results) => {
			res.json({ users: results[0] });
		})
		.catch((err) => {
			console.error('Error querying database:', err);
			res.status(500).json({
				error: 'Database query failed',
				message: err.message,
			});
		});
});

app.post('/api/vote', (req, res) => {
	const { id, vote } = req.body;

	db.query('UPDATE haaletus SET vote = ? WHERE id = ?', [vote, id])
		.then(() => {
			console.log('Vote updated successfully');
			res.json({ success: true });
		})
		.catch((err) => {
			console.error('Error updating vote:', err);
			res.status(500).json({
				error: 'Failed to update vote',
				message: err.message,
			});
		});
});

app.post('/api/voting-started', (req, res) => {
	const { votingStarted } = req.body;
	console.log('Voting started:', votingStarted);

	if (votingStarted) {
		db.query(
			'INSERT INTO tulemused (voting_start, for_count, against_count) VALUES (NOW(), 0, 0)'
		)
			.then((result) => {
				CURRENT_VOTING_SESSION_ID = result[0].insertId;

				console.log('New voting session created in tulemused table');
				res.json({ success: true, id: result[0].insertId });
			})
			.catch((err) => {
				console.error('Error creating new voting session:', err);
				res.status(500).json({
					error: 'Failed to create voting session',
					message: err.message,
				});
			});
	} else {
		db.query('UPDATE haaletus SET vote = NULL')
			.then(() => {
				console.log('Votes reset successfully');
				res.json({ success: true });
			})
			.catch((err) => {
				console.error('Error resetting votes:', err);
				res.status(500).json({
					error: 'Failed to reset votes',
					message: err.message,
				});
			});
	}
});

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the Vite build output directory
const distPath = path.join(__dirname, '../../frontend/dist');
app.use(express.static(distPath));

app.get('*', (req, res) => {
	// Send the index.html for any route not explicitly defined (SPA client-side routing)
	res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
