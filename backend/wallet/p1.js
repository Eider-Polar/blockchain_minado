import Wallet from "./index.js";
import Transaccion from "./transactions.js";
import TransactionsPoll from "./transactions_pool.js";

// const w1 = new Wallet();
// const w2 = new Wallet();
// const amount = 200000;
// const  tx = Transaccion.newTransaction(w1,w2.publicKey,amount)
// tx.update(w1,w2.publicKey,500)
// tx.update(w1,w2.publicKey,300)
// console.log(tx)
// console.log('Transaction verify is '+Transaccion.verifyTransaction(tx))

const wallet = new Wallet();
const tp = new TransactionsPoll();
const tx = Transaccion.newTransaction(wallet, 'laksdfaksdjf', 30);
tp.updateOrAddTransaction(tx);
console.log(tp.transactions.find((t) => t.id === tx.id) === tx);
console.log(tx)
const newtx = tx.update(wallet, 'laksdfaksdjf', 50);

tp.updateOrAddTransaction(newtx);
console.log(tp.transactions.find((t) => t.id === newtx.id) === newtx);
