/** @import { Block } from './types' */

import { Blockchain } from './Blockchain.js'
import { sha256OfBlock, HASH_PREFIX } from './shared.js'

const myAddress = '0x054070b165ec2a4ec1ea'
const friendAddress = '0xb22cc6da24ccd8c9e3a4'
const blockchain = new Blockchain('data.json')

/** @type {Block} */
const block = {
  miner: myAddress,
  previousHash: blockchain.getLastHash(),
  transactions: [
    {
      from: myAddress,
      to: friendAddress,
      amount: 10,
      fee: 5,
    }
  ],
}

for (let nonce = 0; nonce < 1e8; nonce++) {
  const blockWithNonce = { ...block, nonce }
  const hash = sha256OfBlock(blockWithNonce)

  if (hash.startsWith(HASH_PREFIX)) {
    blockchain.addBlock({ ...blockWithNonce, hash })

    break
  }
}

console.log('myAddress', blockchain.getBalance(myAddress))
console.log('friendAddress', blockchain.getBalance(friendAddress))
