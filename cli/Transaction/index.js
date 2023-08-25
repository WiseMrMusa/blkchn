// Transactions are signed messages originated by an externally owned account, transmitted by the Ethereum network, and recorded on the Ethereum blockchain.

// https://developers.stellar.org/docs/fundamentals-and-concepts/stellar-data-structures/operations-and-transactions

import sha256 from "crypto-js/sha256.js"
// import { verifySignature } from "../utils/crypto.js";
import  stellarSDK, { Server } from "stellar-sdk";

export class Transaction {
    constructor(addressFrom, addressTo, amount, fee, secretKey) {
        this.addressFrom = addressFrom;
        this.addressTo = addressTo;
        this.amount = amount;
        this.fee = fee;
        this.hash = this._calculateHash();
        this.signature = this._signTransaction(secretKey);
        this.hasValidSignature = this._hasValidSignature(secretKey);
        console.log("A new transaction initiated");
    }

    _calculateHash() {
        return sha256(
            this.nonce +
            this.addressFrom +
            this.addressTo +
            this.amount +
            this.fee
        ).toString();
    }

    async _signTransaction(secretKey) {
        let signKey = stellarSDK.Keypair.fromSecret(secretKey);

        const server = new Server("https://horizon-testnet.stellar.org");

        const senderAccount = await server.loadAccount(this.addressFrom);

        const transaction = new stellarSDK.TransactionBuilder(senderAccount, {
            timebounds: await server.fetchTimebounds(100),
            fee: Math.max(stellarSDK.BASE_FEE, this.fee),
            networkPassphrase: stellarSDK.Networks.TESTNET,
        })
            .addOperation(
                stellarSDK.Operation.payment({
                    destination: this.addressTo,
                    // Because Stellar allows transaction in many currencies, you must
                    // specify the asset type. The special "native" asset represents Lumens.
                    asset: new stellarSDK.Asset.native(),
                    amount: "10",
                }),)
            .build()

        return transaction.sign(signKey);
    }

    // hasValidSignature() {
    //     return this.hasValidSignature
    // }


    _hasValidSignature(secretKey) {
        let signKey = stellarSDK.Keypair.fromSecret(secretKey);
        return signKey.publicKey() == this.addressFrom;
    }

}

export function transactionFromJSON(transaction) {
    return new Transaction(
        transaction.inputPublicKey,
        transaction.outputPublicKey,
        transaction.amount,
        transaction.fee,
        transaction.signature
    );
}