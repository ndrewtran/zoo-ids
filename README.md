![zoo-ids](https://user-images.githubusercontent.com/42545742/102789911-b5b15d80-43df-11eb-9f42-7bfe245f7bf4.png)

[![npm version](http://img.shields.io/npm/v/zoo-ids.svg)](https://www.npmjs.com/package/zoo-ids)
[![npm downloads](https://img.shields.io/npm/dm/zoo-ids.svg)](https://www.npmjs.com/package/zoo-ids)
![license](https://img.shields.io/npm/l/zoo-ids)
![build](https://img.shields.io/github/actions/workflow/status/bryanmylee/zoo-ids/publish.yml)
[![coverage](https://coveralls.io/repos/github/bryanmylee/zoo-ids/badge.svg)](https://coveralls.io/github/bryanmylee/zoo-ids?branch=master)
[![size](https://img.shields.io/bundlephobia/min/zoo-ids)](https://bundlephobia.com/result?p=zoo-ids)

Generate **predictable** and **unique** identifiers composed of adjectives and animal names, with the ability to seed the random identifiers.

## Range of IDs

Currently, there are 1347 adjectives and 221 animals. The more adjectives used, the more possible combinations of IDs available.

For a quick reference, with 2 adjectives used, there are 400,984,389 possible unique IDs.

With 3 adjectives, there are 540,125,971,983 possible unique IDs.

## Installation

```bash
$ npm install zoo-ids
```

## Usage

### Examples

```js
import { generateId } from 'zoo-ids';

generateId('short seed'); // KnobbyNauticalKingfisher

// Any object can be used as a seed.
generateId(
	{ key: 'value' },
	{
		caseStyle: 'camelcase',
	}
); // weeklyGreatRacoon

// Defaults to the current time if seed is null.
generateId(null, {
	caseStyle: 'lowercase',
	delimiter: '🍓',
}); // enchanted🍓narrow🍓wallaby
```

### Documentation

#### `generateId(seed, opts?)`

##### `seed: any`

The seed used to generate the id. This allows us to generate predictable, but
random and unique identifiers.

Defaults to the current time in milliseconds.

##### `opts.numAdjectives: number`

The number of adjectives to use in the identifier.

Defaults to `2`.

##### `opts.delimiter: string`

The delimiter used between words. The delimiter will also be used between
multi-word adjectives.

Defaults to `''`.

##### `opts.caseStyle: string`

The case style for the words. Possible options are `'titlecase'`, `'camelcase'`, `'uppercase'`, `'lowercase'`, and `'togglecase'`.

```js
generateId('titlecase', { caseStyle: 'titlecase' }); // FineAntiqueElk

generateId('camelcase', { caseStyle: 'camelcase' }); // pertinentPoshGoldfinch

generateId('uppercase', { caseStyle: 'uppercase' }); // PIERCINGRESPONSIBLECAMEL

generateId('lowercase', { caseStyle: 'lowercase' }); // imaginarywingedsalamander

generateId('togglecase', { caseStyle: 'togglecase' }); // sTuNnInGdEsCrIpTiVepEaFoWl
```

Defaults to `'titlecase'`.

## REST API

Run a local API server:

```bash
$ npm run api
```

The server starts on `http://localhost:3000` by default. Set `PORT` to use a different port.

### Endpoints

#### `GET /health`

Returns API health status.

#### `GET /id`

Generate an ID with query parameters.

Supported query parameters:

- `seed`
- `numAdjectives`
- `delimiter`
- `caseStyle` (`titlecase`, `camelcase`, `uppercase`, `lowercase`, `togglecase`)

Example:

```bash
$ curl "http://localhost:3000/id?seed=my-seed&numAdjectives=3&delimiter=-&caseStyle=lowercase"
```

#### `POST /id`

Generate an ID with JSON body.

Example:

```bash
$ curl -X POST "http://localhost:3000/id" \
	-H "Content-Type: application/json" \
	-d '{"seed":{"userId":42},"options":{"numAdjectives":3,"delimiter":"-","caseStyle":"lowercase"}}'
```

### Test API Endpoints

```bash
$ npm run test:api
```

## Docker

Build and run the API container:

```bash
$ docker build -t zoo-ids-api .
$ docker run --rm -p 3000:3000 zoo-ids-api
```

Then call the API:

```bash
$ curl "http://localhost:3000/health"
```

## Credits

This project was inspired by the url ids used by [gfycat.com](https://gfycat.com).

The seeded random number generator used is powered by the alea algorithm by
Johannes Baagøe `<baagoe@baagoe.com>`, ported by [nquinlan/better-random-numbers-for-javascript-mirror](https://github.com/nquinlan/better-random-numbers-for-javascript-mirror/blob/master/support/js/Alea.js).
