import Transaccion from "../wallet/transactions.js";
import Wallet from "../wallet/index.js";
class Miner {
  constructor(blockchain, transactionPool, wallet, p2pServer) {
    this.blockchain = blockchain;
    this.transactionPool = transactionPool;
    this.wallet = wallet;
    this.p2pServer = p2pServer;
  }
  mine() {
    const validTransactions = this.transactionPool.validTransactions();
    console.log(validTransactions.map(item=>item.outputs))

    validTransactions.push(Transaccion.rewardTransaction(this.wallet, Wallet.blockchainWallet()));
    console.log(validTransactions.map(item=>item.outputs))
    const block = this.blockchain.addBlock(validTransactions);
    //include a reward for the miner

    //create a block consisting of the valids transactions
    //synchronize the chains in the peep to peer server
    this.p2pServer.syncChains();
    //clean the transactions pool
    this.transactionPool.clear();
    //brooadcast to every miner to clear the transactions pool
    this.p2pServer.broadcastClearTransactions();
    return block;
  }
}

export default Miner;
