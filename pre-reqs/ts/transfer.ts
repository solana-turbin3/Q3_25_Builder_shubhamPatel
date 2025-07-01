import { Transaction, SystemProgram, Connection, Keypair,
LAMPORTS_PER_SOL, sendAndConfirmTransaction, PublicKey } from
"@solana/web3.js"
import wallet from "./dev_wallet.json";

const from = Keypair.fromSecretKey(new Uint8Array(wallet));
// Define our Turbin3 public key
const to = new
PublicKey("7nsSD1wnDvmq7LtF2ZXK8aiNowzMbnEkxDqjCHqYyuvh");

const connection = new Connection("https://api.devnet.solana.com");
(async () => {
try {
// Get balance of dev wallet
const balance = await connection.getBalance(from.publicKey)
// Create a test transaction to calculate fees
const transaction = new Transaction().add(
SystemProgram.transfer({
fromPubkey: from.publicKey,
toPubkey: to,
lamports: balance,
})
);
transaction.recentBlockhash = (await
connection.getLatestBlockhash('confirmed')).blockhash;
transaction.feePayer = from.publicKey;

const fee = (await
connection.getFeeForMessage(transaction.compileMessage(),
'confirmed')).value || 0;
// Remove our transfer instruction to replace it
transaction.instructions.pop();
transaction.add(
SystemProgram.transfer({
fromPubkey: from.publicKey,
toPubkey: to,
lamports: balance - fee,
})
);
// Sign transaction, broadcast, and confirm
const signature = await sendAndConfirmTransaction(
connection,
transaction,
[from]
);
console.log(`Success! Check out your TX here:
https://explorer.solana.com/tx/${signature}?cluster=devnet`)
} catch(e) {
console.error(`Oops, something went wrong: ${e}`)
}
})();