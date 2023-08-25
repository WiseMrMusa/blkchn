# Welcome to Blkchn

Blkchn is a Layer-2 Blockchain built on Stellar for transaction bundling and processing. It uses Proof of Work as consesus mechanism and Stellar as its execution layer.

# How it works

Blkchn runs on stellar blkchn, and its used to process transactions with WiseMrMusa asset token. The token is created and transfered to a distribution account at the genesis block. The transactions on the chain are basically the trading of this asset among different users

The working mechanism is in 3 categories: 
- The user
- The miner 
- The execution layer

The user creates transaction on the blockchain by sending the asset to whoever they desire. The transaction is then stored in the mempool, a queue data structure (First In First Out). For a transaction to be valid, it must be signed using the private key of the user.

A miner batches up a number of transactions processed from the mempool in a block and solves for the nonce that satisfies the block difficulty. The transactions are then sent to the execution layer and their status is recorded on the blockchain. 

The execution layer is the stellar blockchain.

# A demo

A simulation of these can be seen by running this on the CLI

```
    npm run cli
```

A front-end will be integrated to the project to interact with the blckchn 
