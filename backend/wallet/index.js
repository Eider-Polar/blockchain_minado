import ChainUtil from "./chain_ultis.js";
import Transaccion from "./transactions.js";
class Wallet {
  constructor() {
    this.balance = 1000000;
    this.keyPair = ChainUtil.genKeyPair();
    this.publicKey = this.keyPair.getPublic("hex");
  }

  toString() {
    return `Wallet-.--
    Publickey:  ${this.publicKey}
    balance:    ${this.balance}
    
    `;
  }

  sing(datahash) {
    return this.keyPair.sign(datahash);
  }

  createTransaction(recipient, amount, transactionPool) {
    console.log(recipient)
    console.log(amount)
    console.log(transactionPool)

    if (amount > this.balance) {
      console.log(`Amount ${amount} exceeds balance ${this.balance}`);
      return;
    }
    let transaction = transactionPool.existingTransaction(this.publicKey);
    if (transaction) {
      transaction.update(this, recipient, amount);
    }else{
      transaction=Transaccion.newTransaction(this,recipient,amount);
      transactionPool.updateOrAddTransaction(transaction);
    }
    return transaction
  }
}

export default Wallet;
