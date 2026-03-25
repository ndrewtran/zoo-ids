import { generateId } from './src';

const randomId = generateId();
const deterministicA = generateId('my-seed');
const deterministicB = generateId('my-seed');
const customId = generateId({ userId: 42 }, {
  numAdjectives: 3,
  delimiter: '-',
  caseStyle: 'lowercase',
});

console.log('randomId:', randomId);
console.log('deterministicA:', deterministicA);
console.log('deterministicB:', deterministicB);
console.log('same deterministic seed:', deterministicA === deterministicB);
console.log('customId:', customId);
