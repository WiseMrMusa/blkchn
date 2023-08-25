import { map } from "ramda";
import { transactionFromJSON } from '../Transaction/index.js'
import sha256 from "crypto-js/sha256.js";

const BLOCK_DIFFICULTY = 2;

export class Block{
    constructor(opts) {
        const {
            blockchain,
            parentHash,
            height,
            nonce,
            transactions
        } = {
            nonce: "",
            transactions: {},
            ...opts
        };
        this.blockchain = blockchain.name,
        this.nonce = nonce,
        this.parentHash = parentHash,
        this.height = height,
        this.transactions = map(transactionFromJSON)(transactions),
        this._setHash();
        this.timestamp = new Date()
    }
    
    isRoot() {
        return this.parentHash == 'root';
    }

    setNonce(nonce) {
        this.nonce = nonce;
        this._setHash();
    }

    isValid() {
        return (
            this.isRoot() ||
            (this.hash.slice(-BLOCK_DIFFICULTY) === "0".repeat(BLOCK_DIFFICULTY) &&
                this.hash === this._calculateHash())
        );
    }

    _setHash() {
        this.hash = this._calculateHash();
    }

    _calculateHash() {
        return sha256(
            this.nonce +
            this.parentHash +
            this.combinedTransactionsHash()
        ).toString();
    }

    createChild() {
        const block = new Block({
            blockchain: this.blockchain.name,
            parentHash: this.hash,
            height: this.height + 1,
        });
        return block;
    }

    addTransaction(transaction) {
        if (!this.isValidTransaction(transaction)) return;
        this.transactions[transaction.hash] = transaction;
        this._setHash();
    }

    isValidTransaction(transaction) {
        return (
            transaction.hasValidSignature
        );
    }

    combinedTransactionsHash() {
        if (Object.values(this.transactions).length === 0)
            return "No Transactions in Block";
        return sha256(
            Object.values(this.transactions)
                .map(tx => tx.hash)
                .join("")
        );
    }


    mine() {
        console.log("Proof of work started")
        // console.log(this.isValid())
        while(!this.isValid()){
            this.setNonce(
                sha256(new Date().getTime().toString()).toString()
            );
            // console.log(sha256(new Date().getTime().toString()).toString())
        }
        console.log(`${this.hash} is the block hash`)
    }
}

export function blockFromJSON(blockchain, data) {
    return new Block({
        ...data,
        blockchain
    });
}