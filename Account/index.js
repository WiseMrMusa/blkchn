// https://developers.stellar.org/docs/fundamentals-and-concepts/stellar-data-structures/accounts

import fetch from 'node-fetch';

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