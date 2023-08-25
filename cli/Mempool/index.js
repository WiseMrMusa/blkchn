// The mempool is the dataStructure that stores un-executed transaction

class Mempool {
    constructor(){
    }

    transactions = []

    addTransaction(transaction) {
        this.transactions.push(transaction);
    }

    processTransaction() {
        return this.transactions.shift()
    }
}