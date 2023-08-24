import StellarSdk from 'stellar-sdk'
import { createAccount } from '../Account/index.js';

const pair = StellarSdk.Keypair.random();

pair.secret();
pair.publicKey();

await createAccount(pair);