const express = require('express');

const { generateId } = require('../dist/index.js');

const app = express();
const port = Number(process.env.PORT) || 3000;

const validCaseStyles = new Set([
	'titlecase',
	'camelcase',
	'uppercase',
	'lowercase',
	'togglecase',
]);

app.use(express.json());

app.get('/health', (_req, res) => {
	res.json({ status: 'ok' });
});

app.get('/id', (req, res) => {
	try {
		const seed = req.query.seed ?? null;
		const options = parseOptions(req.query);
		const id = generateId(seed, options);
		res.json({ id });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

app.post('/id', (req, res) => {
	try {
		const seed = req.body?.seed ?? null;
		const options = parseOptions(req.body?.options || {});
		const id = generateId(seed, options);
		res.json({ id });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

function parseOptions(source) {
	const options = {};

	if (source.numAdjectives != null) {
		const numAdjectives = Number.parseInt(source.numAdjectives, 10);
		if (!Number.isInteger(numAdjectives) || numAdjectives < 0) {
			throw new Error('numAdjectives must be a non-negative integer');
		}
		options.numAdjectives = numAdjectives;
	}

	if (source.delimiter != null) {
		options.delimiter = String(source.delimiter);
	}

	if (source.caseStyle != null) {
		if (!validCaseStyles.has(source.caseStyle)) {
			throw new Error(
				"caseStyle must be one of 'titlecase', 'camelcase', 'uppercase', 'lowercase', 'togglecase'"
			);
		}
		options.caseStyle = source.caseStyle;
	}

	return options;
}

function startServer() {
	return app.listen(port, () => {
		console.log(`zoo-ids API listening on http://localhost:${port}`);
	});
}

if (require.main === module) {
	startServer();
}

module.exports = {
	app,
	startServer,
};
