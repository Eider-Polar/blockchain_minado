import ChainUtil from "./chain_ultis.js";
import Wallet from "./index.js";

class Transaccion {
  constructor() {
    this.id = ChainUtil.id();
    this.input = null;
    this.outputs = [];
  }
  update(senderWallet, recipient, amount) {
    // console.log(this.outputs)
    const senderOutput = this.outputs.find(
      (output) => output.address === senderWallet.publicKey
    );
    console.log(senderOutput)
    if (amount > senderOutput.amount) {
      console.log(`Amount ${amount} exceeds balance`);
      return;
    }
    senderOutput.amount = senderOutput.amount - amount;
    this.outputs.push({ amount, addres: recipient });
    Transaccion.singTransaction(this, senderWallet);
    return Transaccion;
  }

  static newTransaction(senderWallet, recipient, amount) {
    const transaction = new this();
    if (amount > senderWallet.balance) {
      console.log(`Amont ${amount} exceeds balance`);
      return;
    }
    transaction.outputs.push(
      {
        amount: senderWallet.balance - amount,
        address: senderWallet.publicKey,
      },
      { amount, address: recipient }
    );
    Transaccion.singTransaction(transaction, senderWallet);
    return transaction;
  }
  static singTransaction(transaction, senderWallet) {
    transaction.input = {
      timestamp: Date.now(),
      amout: senderWallet.balance,
      addres: senderWallet.publicKey,
      signature: senderWallet.sing(ChainUtil.hash(transaction.outputs)),
    };
  }

  static verifyTransaction(transaction) {
    return ChainUtil.verifySignature(
      transaction.input.addres,
      transaction.input.signature,
      ChainUtil.hash(transaction.outputs)
    );
  }
}

export default Transaccion;
