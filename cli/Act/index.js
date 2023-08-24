import { Block } from '../Block/index.js';
import { Blockchain } from '../Blockchain/index.js'

const wiseChain = new Blockchain();
wiseChain.createGenesisBlock();
// console.log(wiseChain.genesis.parent)

let block2 = new Block({
    blockchain: wiseChain,
    parentHash: wiseChain.genesis.hash,
    height: 2
})

block2.mine()

wiseChain.addBlock(
    block2
)

console.log(wiseChain.blocks)
