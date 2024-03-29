import { maxBy, reduce, unfold, reverse, values, prop } from "ramda";
import { Block } from '../Block/index.js'
import { Mempool } from '../Mempool/index.js'

export class Blockchain {
    constructor(name) {
        this.name = name,
        this.genesis = null
        this.blocks = {}
        this.pendingTransactions = {}
        console.log(`Welcome to ${this.name}`);
        console.log(`A new Blockchain has been created`);
        this.createMempool()
    }

    createGenesisBlock(){
        const block = new Block({
            blockchain: this,
            parentHash: "root",
            height: 1,
            nonce: '0'
        });
        this.blocks[block.hash] = block;
        this.genesis = block;
    }

    createBlock(){
        const block = new Block({
            blockchain: this,
            parentHash: this.maxHeightBlock().hash,
            height: this.maxHeightBlock().height + 1
        })
        return block
    }

    createMempool(){
        const mempool = new Mempool({
            blockchain : this.name
        });
        this.mempool = mempool;
    }

    addBlock(newBlock) {
        this._addBlock(newBlock);
    }

    containsBlock(block) {
        return this.blocks[block.hash] !== undefined;
    }

    maxHeightBlock() {
        const blocks = values(this.blocks);
        const maxByHeight = maxBy(prop("height"));
        const maxHeightBlock = reduce(maxByHeight, blocks[0], blocks);
        return maxHeightBlock;
    }

    _addBlock(block) {
        if (!block.isValid()) return;
        if (this.containsBlock(block)) return;
        
        // check that the parent is actually existent and the advertised height is correct
        const parent = this.blocks[block.parentHash];
        console.log(parent)
        console.log(parent?.height)
        console.log(block.height)
        if (parent === undefined && parent?.height + 1 !== block.height) return;
        
        const isParentMaxHeight = this.maxHeightBlock().hash === parent.hash;
        
        // Reapply transactions to validate them
        const transactions = block.transactions;
        block.transactions = {};
        let containsInvalidTransactions = false;
        
        Object.values(transactions).forEach(transaction => {
            if (block.isValidTransaction(transaction)) {
                block.addTransaction(transaction);
                
                // if we have the transaction as a pending one on the chain, remove it from the pending pool if we are at max height
                if (isParentMaxHeight && this.pendingTransactions[transaction.hash])
                delete this.pendingTransactions[transaction.hash];
        } else {
            containsInvalidTransactions = true;
        }
    });
    
    // If we found any invalid transactions, dont add the block
    if (containsInvalidTransactions) return;
    // console.log("D")

        this.blocks[block.hash] = block;
    }
}