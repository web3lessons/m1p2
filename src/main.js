/** @typedef {import('./types').Block} Block */

import { Blockchain } from './Blockchain.js'
import { sha256OfBlock, HASH_PREFIX } from './shared.js'

const myAddress = '0x054070b165ec2a4ec1ea'
const friendAddress = '0xb22cc6da24ccd8c9e3a4'
const blockchain = new Blockchain('data.json')

/** @type {Block} */
const block = {
  miner: myAddress,
  previousHash:
    '000000001387f13e25774d75d40814ea84cbfe830737e21e6a4c5e7db34e59f4',
  transactions: [
    {
      to: myAddress,
      from: friendAddress,
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
