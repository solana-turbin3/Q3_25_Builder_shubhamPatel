import idl from "./idl.json";
import { Connection, Keypair, PublicKey } from "@solana/web3.js"
import { Program, Wallet, AnchorProvider } from "@coral-xyz/anchor"
import { IDL, Turbin3Prereq } from "./programs/Turbin3_prereq";
import wallet from "./turbine_wallet.json"

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
const connection = new Connection("https://api.devnet.solana.com");

let programAddress= new PublicKey("TRBZyQHB3m68FGeVsqTK39Wm4xejadjVhP5MAZaKWDM");
const MPL_CORE_PROGRAM_ID = new
PublicKey("CoREENxT6tW1HoK8ypY1SxRMZTcVPm7R94rH4PZNhX7d");
const mintCollection = new
PublicKey("5ebsp5RChCGK7ssRZMVMufgVZhd2kFbNaotcZ5UvytN2");

const SYSTEM_PROGRAM_ID = new PublicKey("11111111111111111111111111111111");

const provider = new AnchorProvider(connection, new Wallet(keypair), {
commitment: "confirmed"});
const program : Program<Turbin3Prereq> = new Program(IDL, provider);
const account_seeds = [
Buffer.from("prereqs"),
keypair.publicKey.toBuffer(),
];
const [account_key, _account_bump] =
PublicKey.findProgramAddressSync(account_seeds, program.programId);

const account_seeds2 = [
Buffer.from("collection"),
mintCollection.toBuffer(),
];
const [account_key2, _account_bump2] =
PublicKey.findProgramAddressSync(account_seeds2, program.programId);

const mintTs = Keypair.generate();

function submitGithub(){
(async () => {
try {
const txhash = await program.methods
.initialize("aeyshubh")
.accountsPartial({
user: keypair.publicKey,
account: account_key,
system_program: SYSTEM_PROGRAM_ID,
})
.signers([keypair])
.rpc();
console.log(`Success! Check out your TX here:
https://explorer.solana.com/tx/${txhash}?cluster=devnet`);
} catch (e) {
console.error(`Oops, something went wrong: ${e}`);
}
})();

}

// submitGithub();

function mintNft() {
(async () => {
try {
const txhash = await program.methods
.submitTs()
.accountsPartial({
user: keypair.publicKey,
account: account_key,
mint: mintTs.publicKey,
collection: mintCollection,
authority: account_key2,
mpl_core_program: MPL_CORE_PROGRAM_ID,
system_program: SYSTEM_PROGRAM_ID,
})
.signers([keypair, mintTs])
.rpc();
console.log(`Success! Check out your TX here:
https://explorer.solana.com/tx/${txhash}?cluster=devnet`);
} catch (e) {
console.error(`Oops, something went wrong: ${e}`);
}
})();
}

mintNft();