// Transactions are signed messages originated by an externally owned account, transmitted by the Ethereum network, and recorded on the Ethereum blockchain.

// https://developers.stellar.org/docs/fundamentals-and-concepts/stellar-data-structures/operations-and-transactions

import  sha256  from "crypto-js/sha256.js"
import { verifySignature } from "../utils/crypto.js";

export class Transaction {
    constructor(nonce, addressFrom, addressTo, amount, fee, signature) {
        this.nonce = nonce,
        this.addressFrom = addressFrom,
        this.addressTo = addressTo,
        this.amount = amount,
        this.fee = fee,
        this.signature = signature,
        this.hash = _calculateHash()
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

    hasValidSignature() {
        return this.signature !== undefined && verifySignature(this.hash, this.signature, this.addressFrom)
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