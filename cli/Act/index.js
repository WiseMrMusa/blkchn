import { createAccount, getRandomAccount } from '../Account/index.js';
import { Block } from '../Block/index.js';
import { Blockchain } from '../Blockchain/index.js'
import { Transaction } from '../Transaction/index.js';

const wiseChain = new Blockchain();
wiseChain.createGenesisBlock();

let block2 = new Block({
    blockchain: wiseChain,
    parentHash: wiseChain.genesis.hash,
    height: 2
})

const ide1 = getRandomAccount();
const ide2 = getRandomAccount();

const acc1 = await createAccount(ide1);
const acc2 = await createAccount(ide2);

let trans1 = new Transaction(ide1.publicKey(), ide2.publicKey(), 100, 20, ide1.secret())
// let trans2 = new Transaction(ide1.publicKey(), ide2.publicKey(), 50, 2,'hello')
// let trans3 = new Transaction( 1, ide1.publicKey(), ide2.publicKey(), 50, 2,'hello')

block2.addTransaction(trans1)
// block2.addTransaction(trans2)
// block2.addTransaction(trans3)

block2.mine()

wiseChain.addBlock(
    block2
)

console.log(wiseChain.blocks)
