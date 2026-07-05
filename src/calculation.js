/** @typedef {import('./types').Block} Block */

import {
  HASH_PREFIX,
  BLOCK_REWARD,
  sha256OfBlock,
  getBalanceFromMap,
} from './shared.js'

const isValidHash = (block, previousHash) =>
  block.previousHash === previousHash &&
  block.hash.startsWith(HASH_PREFIX) &&
  block.hash === sha256OfBlock(block)

/** @param {Block} block */
export const calculateBalancesAfterBlock = (balances, block, previousHash) => {
  if (!isValidHash(block, previousHash)) {
    return null
  }

  let fees = 0

  for (const transaction of block.transactions) {
    const amountWithFee = transaction.amount + transaction.fee
    const senderBalance = getBalanceFromMap(balances, transaction.from)
    const recepientBalance = getBalanceFromMap(balances, transaction.to)

    if (senderBalance < amountWithFee) {
      return null
    }

    balances.set(transaction.from, senderBalance - amountWithFee)
    balances.set(transaction.to, recepientBalance + transaction.amount)

    fees += transaction.fee
  }

  const minerBalance = getBalanceFromMap(balances, block.miner)

  balances.set(block.miner, minerBalance + BLOCK_REWARD + fees)

  return balances
}

/** @param {Block[]} chain */
export const calculateBalancesFromStratch = chain => {
  let balances = new Map()
  let previousHash = ''

  for (const block of chain) {
    balances = calculateBalancesAfterBlock(balances, block, previousHash)

    if (balances === null) {
      return null
    }

    previousHash = block.hash
  }

  return balances
}
