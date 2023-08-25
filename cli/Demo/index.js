import { forEach } from 'ramda';
import { createAccount, getRandomAccount } from '../Account/index.js';
import { Block } from '../Block/index.js';
import { Blockchain } from '../Blockchain/index.js'
import { Transaction } from '../Transaction/index.js';


// Instantiate a blockchain
const wiseChain = new Blockchain('WiseMrMusa');

// Create the Genesis Block
wiseChain.createGenesisBlock();


let mempool = wiseChain.mempool;

// Create different identities
const Olivia = getRandomAccount();
const Liam = getRandomAccount();
const Sophia = getRandomAccount();
const Noah = getRandomAccount();
const Emma = getRandomAccount();
const Jackson = getRandomAccount();
const Ava = getRandomAccount();
const Aiden = getRandomAccount();
const Isabella = getRandomAccount();
const Lucas = getRandomAccount();
const Tosin = getRandomAccount();

await createAccount(Olivia);
await createAccount(Liam);
await createAccount(Sophia);
await createAccount(Noah);
await createAccount(Emma);
await createAccount(Jackson);
await createAccount(Ava);
await createAccount(Aiden);
await createAccount(Isabella);
await createAccount(Lucas);
await createAccount(Tosin);


// Fund all the accounts
// identities.forEach(async (e) => {
//     await createAccount(e)
// })

// create transactions
mempool.addTransaction(new Transaction(Olivia.publicKey(), Liam.publicKey(), 100, 20, Olivia.secret()))
mempool.addTransaction(new Transaction(Olivia.publicKey(), Liam.publicKey(), 100, 20, Olivia.secret()))
mempool.addTransaction(new Transaction(Olivia.publicKey(), Liam.publicKey(), 100, 20, Olivia.secret()))
mempool.addTransaction(new Transaction(Olivia.publicKey(), Liam.publicKey(), 100, 20, Olivia.secret()))
mempool.addTransaction(new Transaction(Olivia.publicKey(), Liam.publicKey(), 100, 20, Olivia.secret()))
mempool.addTransaction(new Transaction(Olivia.publicKey(), Liam.publicKey(), 100, 20, Olivia.secret()))
mempool.addTransaction(new Transaction(Olivia.publicKey(), Liam.publicKey(), 100, 20, Olivia.secret()))
mempool.addTransaction(new Transaction(Olivia.publicKey(), Liam.publicKey(), 100, 20, Olivia.secret()))
mempool.addTransaction(new Transaction(Olivia.publicKey(), Liam.publicKey(), 100, 20, Olivia.secret()))
mempool.addTransaction(new Transaction(Olivia.publicKey(), Liam.publicKey(), 100, 20, Olivia.secret()))

console.log(wiseChain.mempool.transactions.length)
// create Block
let block2 = wiseChain.createBlock();
block2.addTransaction(mempool.processTransaction())
block2.addTransaction(mempool.processTransaction())
block2.addTransaction(mempool.processTransaction())
block2.addTransaction(mempool.processTransaction())
console.log(wiseChain.mempool.transactions.length)
block2.mine()

wiseChain.addBlock(block2)

let block3 = wiseChain.createBlock();
block3.addTransaction(mempool.processTransaction())
block3.addTransaction(mempool.processTransaction())
block3.addTransaction(mempool.processTransaction())
block3.addTransaction(mempool.processTransaction())
block3.addTransaction(mempool.processTransaction())
console.log(wiseChain.mempool.transactions.length)
block3.mine()
wiseChain.addBlock(block3)

console.log(wiseChain.blocks)

