import ChainUtil from "./chain_ultis.js";
import Wallet from "./index.js";
const MINING_REWARD = 50;
class Transaccion {
  constructor() {
    this.id = ChainUtil.id();
    this.input = null;
    this.outputs = [];
  }
  update(senderWallet, recipient, amount) {
    
    const senderOutput = this.outputs.find((output) => output.address === senderWallet.publicKey);
    if (amount > senderOutput.amount) {
      console.log(`Amount ${amount} exceeds balance`);
      return;
    }
    senderOutput.amount = senderOutput.amount - amount;
    this.outputs.push({ amount, addres: recipient });
    Transaccion.singTransaction(this, senderWallet);
    return Transaccion;
  }

  static transactionWithOutputs(senderWallet, outputs) {
   
    const transaction = new this();
    transaction.outputs.push(...outputs);

    Transaccion.singTransaction(transaction, senderWallet);
    return transaction;
  }

  static newTransaction(senderWallet, recipient, amount) {
    if (amount > senderWallet.balance) {
      console.log(`Amont ${amount} exceeds balance`);
      return;
    }
    return Transaccion.transactionWithOutputs(senderWallet, [
      {
        amount: senderWallet.balance - amount,
        address: senderWallet.publicKey,
      },
      { amount, address: recipient },
    ]);
     
  }

  static rewardTransaction(minerWallet, senderWallet) {
    return Transaccion.transactionWithOutputs(senderWallet, [
      {
        amount: MINING_REWARD,
        address: minerWallet.publicKey,
      },
    ]);
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
