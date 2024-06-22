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

  createTransaction(recipient, amount, blockchain, transactionPool) {
    this.balance = this.calculateBalance(blockchain, this.publicKey);
    if (amount > this.balance) {
      console.log(`Amount ${amount} exceeds balance ${this.balance}`);
      return;
    }
    let transaction = transactionPool.existingTransaction(this.publicKey);

    if (transaction) {
      transaction.update(this, recipient, amount);
    } else {
      transaction = Transaccion.newTransaction(this, recipient, amount);
      transactionPool.updateOrAddTransaction(transaction);
    }
    return transaction;
  }

  static blockchainWallet() {
    const blockchainWallet = new this();
    blockchainWallet.address = "Coinbase-0000XXX";
    return blockchainWallet;
  }

  calculateBalance(blockchain, address) {
    let balance = this.balance;
    let transactions = [];

    if (blockchain.length <= 1) {
      return balance;
    } else {
      const bcCopy = blockchain.chain.slice(1);
      bcCopy.forEach((block) => {
        block.data.forEach((transaction) => {
          transactions.push(transaction);
        });
      });
    }

    const walletInputs = transactions.filter(
      (transaction) => transaction.input.address === address
    );
    let startTime = 0;

    if (walletInputs.length > 0) {
      const recentInput = walletInputs.reduce((prev, current) =>
        prev.input.timestamp > current.input.timestamp ? prev : current
      );
      balance = recentInput.outputs.find(
        (output) => output.address === address
      ).amount;
      startTime = recentInput.input.timestamp;
    }

    transactions.forEach((transaction) => {
      if (transaction.input.timestamp > startTime) {
        transaction.outputs.forEach((output) => {
          if (output.address === address) {
            balance += output.amount; // Sumar el monto de salida al balance
          } else if (transaction.input.address === address) {
            balance -= output.amount; // Restar el monto de salida del balance si la transacción fue enviada desde la cartera
          }
        });
      }
    });

    return balance;
  }
}
export default Wallet;
