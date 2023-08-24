# Welcome to Blkchn

Blkchn is a Layer-2 Blockchain built on Stellar for faster transaction processing. It uses Proof of Work as consesus mechanism and Stellar as its execution layer

# How it works

Blkchn runs on stellar blkchn, and issues WiseMrMusa token at the genesis block. The transactions on the chain are basically the trading of this asset among different users

The working mechanism is in 3 categories: 
- The user
- The miner 
- The execution layer

The user creates transaction on the blockchain by sending the asset to whoever they desire. The transaction is then stored in a queue data structure (First In First Out). For a transaction to be valid, it must be signed using the private key of the user.

A miner batches up a number of transactions in a block and solves for the nonce that satisfies the block difficulty. The transactions are then sent to the execution layer and their status is recorded on the blockchain. 

A simulation of these can be seen by running

```
    npm run cli
```