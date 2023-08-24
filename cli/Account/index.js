// https://developers.stellar.org/docs/fundamentals-and-concepts/stellar-data-structures/accounts

import fetch from 'node-fetch';
import StellarSdk from 'stellar-sdk';

// There are two ways to create an acccount: By getting a coinbase from friend bot or by getting payed by another person

export async function createAccount(account) {
    try {
        const response = await fetch(
            `https://friendbot.stellar.org?addr=${encodeURIComponent(
                account.publicKey(),
            )}`,
        );
        const responseJSON = await response.json();
        console.log("SUCCESS! You have a new account :)\n", responseJSON);
    } catch (e) {
        console.error("ERROR!", e);
    }
}

export function getAccount(privateKey) {
    return StellarSdk.Keypair.fromSecret(privateKey);
}