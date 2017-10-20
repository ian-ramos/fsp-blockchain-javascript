class Block {
  constructor(index, previousHash, timestamp, data, hash) {
    this.index = index;
    this.previousHash = previousHash.toString();
    this.timestamp = timestamp;
    this.data = data;
    this.hash = hash.toString();
  }

  static calculateHash(index, previousHash, timestamp, data) {
    return (index + previousHash + timestamp + data).toString();
  }

  static checkHash(block) { //returns a hash for a given block.  Will be used to check if hash is valid
    return Block.calculateHash(block.index, block.previousHash, block.timestamp, block.data)
  }

  static getGenesisBlock() {
    return new Block(0, "0", 0, "genesis block", "genesisHash");
  }

  static generateNextBlock(blockData) {
    //blockData is provided by end user
    const previousBlock = Block.getLatestBlock();
    const nextIndex = previousBlock.index + 1;
    const nextTimestamp = new Date().getTime() / 1000;
    const nextHash = Block.calculateHash(nextIndex, previousBlock.hash, nextTimestamp, blockData);
    const newBlock = new Block(nextIndex, previousBlock.hash, nextTimestamp, blockData, nextHash);
    return blockchain.push(newBlock);
  }

  static getLatestBlock() {
    return blockchain[blockchain.length - 1];
  }

  static isValidNewBlock(newBlock, previousBlock) {
    if (previousBlock.index + 1 !== newBlock.index) {
        console.log('invalid index');
        return false;
    } else if (previousBlock.hash !== newBlock.previousHash) {
        console.log('invalid previoushash');
        return false;
    } else if (Block.checkHash(newBlock) !== newBlock.hash) {
        console.log('invalid hash');
        return false;
    }
    return true;
  }

}

const blockchain = [Block.getGenesisBlock()];

function runMethod (blockData) {
  Block.generateNextBlock(blockData);
   if (Block.isValidNewBlock(blockchain[blockchain.length - 1], blockchain[blockchain.length - 2])) {
     return blockchain
   } else {
     blockchain.pop()
     return "That was not a valid block"
   }
}
