// The mempool is the dataStructure that stores un-executed transaction

export class Mempool {
    constructor(opts){
    const {
        blockchain,
    } = {
        ...opts
    }
    this.blockchain = blockchain 
    }

    transactions = []

    addTransaction(transaction) {
        this.transactions.push(transaction);
    }

    processTransaction() {
        return this.transactions.shift()
    }
}