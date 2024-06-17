class Miner {
  constructor(blockchain, transactionPool, wallet, p2pServer) {
    this.blockchain = blockchain;
    this.transactionPool = transactionPool;
    this.wallet = wallet;
    this.p2pServer = p2pServer;
  }
  mine(){
    const validTransactions=this.transactionPool.validTransactions();
    //include a reward for the miner 
    
    //create a block consisting of the valids transactions
    //synchronize the chains in the peep to peer server  
    //clean the transactions pool 
    //brooadcast to every miner to clear the transactions pool
  }
}

export default Miner 