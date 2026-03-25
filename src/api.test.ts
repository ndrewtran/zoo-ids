import request from 'supertest';

const { app } = require('../api/server');

describe('REST API', () => {
	test('GET /health returns ok status', async () => {
		const response = await request(app).get('/health');
		expect(response.status).toBe(200);
		expect(response.body).toEqual({ status: 'ok' });
	});

	test('GET /id with same seed is deterministic', async () => {
		const first = await request(app).get('/id').query({
			seed: 'my-seed',
			numAdjectives: 3,
			delimiter: '-',
			caseStyle: 'lowercase',
		});

		const second = await request(app).get('/id').query({
			seed: 'my-seed',
			numAdjectives: 3,
			delimiter: '-',
			caseStyle: 'lowercase',
		});

		expect(first.status).toBe(200);
		expect(second.status).toBe(200);
		expect(first.body.id).toBe(second.body.id);
	});

	test('POST /id generates id from json payload', async () => {
		const response = await request(app)
			.post('/id')
			.send({
				seed: { userId: 42 },
				options: {
					numAdjectives: 3,
					delimiter: '-',
					caseStyle: 'lowercase',
				},
			});

		expect(response.status).toBe(200);
		expect(response.body.id).toMatch(/^[a-z]+(-[a-z]+){3}$/);
	});

	test('GET /id rejects invalid caseStyle', async () => {
		const response = await request(app).get('/id').query({
			caseStyle: 'invalid-style',
		});

		expect(response.status).toBe(400);
		expect(response.body.error).toContain('caseStyle must be one of');
	});
});
