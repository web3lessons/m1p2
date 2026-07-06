/** @import { Block } from './types' */

import { Blockchain } from './Blockchain.js'
import { sha256OfBlock, HASH_PREFIX } from './shared.js'

const myAddress = '0x054070b165ec2a4ec1ea'
const friendAddress = '0xb22cc6da24ccd8c9e3a4'
const blockchain = new Blockchain('data.json')

/** @type {Block} */
const block = {
  miner: myAddress,
  previousHash:
    '0000006080adafa493b762ac4cc6e1ff55e33b9d64face45a02eb5a5f30bb99a',
  transactions: [
    {
      from: myAddress,
      to: friendAddress,
      amount: 10,
      fee: 5,
    }
  ],
}

for (let i = 0; i < 1e8; i++) {
  const blockWithNonce = { ...block, nonce: i }
  const hash = sha256OfBlock(blockWithNonce)

  if (hash.startsWith(HASH_PREFIX)) {
    blockchain.addBlock({ ...blockWithNonce, hash })

    break
  }
}

console.log('myAddress', blockchain.getBalance(myAddress))
console.log('friendAddress', blockchain.getBalance(friendAddress))
