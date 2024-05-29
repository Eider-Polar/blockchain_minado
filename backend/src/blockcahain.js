import Block from"./block.js"

class Blockchain {
  constructor() {
    this.chain = [Block.genesis];
  }

  getLastBLock() {
    return this.chain[this.chain.length - 1];
  }
  addBlock(data) {
    const block = Block.mine(this.getLastBLock(), data);
    this.chain.push(block);
    return block;
  }

  isValidChain(chain) {
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis)) {
      return false;
    }
    for (let i = 1; i < chain.length; i++) {
      const block = chain[i];
      const lastBLock = chain[i - 1];
      if (
        block.previousHash !== lastBLock.hash ||
        block.hash !== Block.blockHash(block)
      ) {
        return false;
      }
    }
    return true;
  }

  remplaceChain(newChain) {
    if (newChain.length <= this.chain.length) {
      console.log("Receiced chain is not  longer than the current chain ");
    } else if (!this.isValidChain(newChain)) {
      console.log("the received chain is not valid");
    } else {
      console.log("Replacing the received chain . .");
      this.chain = newChain;
    }
  }
}

export  default Blockchain