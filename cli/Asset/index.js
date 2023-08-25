// https://developers.stellar.org/docs/fundamentals-and-concepts/stellar-data-structures/assets

import StellarSdk  from 'stellar-sdk';
var server = new StellarSdk.Server("https://horizon-testnet.stellar.org");

import dotenv from 'dotenv'
import { createAccount } from '../Account/index.js';
dotenv.config()

let SECRET_KEY = process.env.ASSET_SECRET;
let DISTRIBUTE = process.env.DISTRIBUTOR;

console.log(SECRET_KEY)
console.log(DISTRIBUTE)

const issuingPair = StellarSdk.Keypair.fromSecret(SECRET_KEY);
const distributingPair = StellarSdk.Keypair.fromSecret(DISTRIBUTE);

await createAccount(issuingPair)
await createAccount(distributingPair)

// Keys for accounts to issue and receive the new asset
var issuingKeys = StellarSdk.Keypair.fromSecret(
    issuingPair.secret(),
);
var receivingKeys = StellarSdk.Keypair.fromSecret(
    distributingPair.secret(),
);

// Create an object to represent the new asset
var WiseMrMusa = new StellarSdk.Asset("WiseMrMusa", issuingKeys.publicKey());

// First, the receiving account must trust the asset
server
    .loadAccount(receivingKeys.publicKey())
    .then(function (receiver) {
        var transaction = new StellarSdk.TransactionBuilder(receiver, {
            fee: 100,
            networkPassphrase: StellarSdk.Networks.TESTNET,
        })
            // The `changeTrust` operation creates (or alters) a trustline
            // The `limit` parameter below is optional
            .addOperation(
                StellarSdk.Operation.changeTrust({
                    asset: WiseMrMusa,
                    limit: "1000",
                }),
            )
            // setTimeout is required for a transaction
            .setTimeout(100)
            .build();
        transaction.sign(receivingKeys);
        return server.submitTransaction(transaction);
    })
    .then(console.log)

    // Second, the issuing account actually sends a payment using the asset
    .then(function () {
        return server.loadAccount(issuingKeys.publicKey());
    })
    .then(function (issuer) {
        var transaction = new StellarSdk.TransactionBuilder(issuer, {
            fee: 100,
            networkPassphrase: StellarSdk.Networks.TESTNET,
        })
            .addOperation(
                StellarSdk.Operation.payment({
                    destination: receivingKeys.publicKey(),
                    asset: WiseMrMusa,
                    amount: "10",
                }),
            )
            // setTimeout is required for a transaction
            .setTimeout(100)
            .build();
        transaction.sign(issuingKeys);
        return server.submitTransaction(transaction);
    })
    .then(console.log)
    .catch(function (error) {
        console.error("Error!", error);
    });