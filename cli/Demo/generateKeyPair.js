// https://developers.stellar.org/docs/fundamentals-and-concepts/stellar-data-structures/assets

import StellarSdk from 'stellar-sdk';
var server = new StellarSdk.Server("https://horizon-testnet.stellar.org");

const issuingPair = StellarSdk.Keypair.random();

console.log(issuingPair.secret())
console.log(issuingPair.publicKey())