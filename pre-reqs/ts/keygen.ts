import { Keypair } from "@solana/web3.js";
import bs58 from 'bs58'
// let kp = Keypair.generate()
// console.log(`You've generated a new Solana wallet: ${kp.publicKey.toBase58()}`)
// console.log(`[${kp.secretKey}]`)

let key="secret key";
let kk = Keypair.fromSecretKey(bs58.decode(key));
console.log(`Your wallet address is: ${kk.publicKey.toBase58()}`);
console.log(`Your secret key is: [${kk.secretKey}]`);
console.log(`Your secret key in base58 is: ${bs58.encode(kk.secretKey)}`);