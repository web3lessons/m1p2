import { createHash } from 'crypto'
import { readFileSync, writeFileSync } from 'fs'

export const BLOCK_REWARD = 100
export const HASH_PREFIX = '0'.repeat(6)

const sha256 = value => createHash('sha256')
  .update(value)
  .digest('hex')

export const sha256OfBlock = block => {
  const { hash, ...data } = block

  return sha256(JSON.stringify(data))
}

export const getBalanceFromMap = (balances, address) => balances
  .get(address) || 0

export const readJson = filename => JSON.parse(readFileSync(filename, 'utf8'))

export const writeJson = (filename, data) =>
  writeFileSync(filename, JSON.stringify(data, null, 2), 'utf8')

export const isHashValid = (block, previousHash) =>
  block.previousHash === previousHash &&
  block.hash.startsWith(HASH_PREFIX) &&
  block.hash === sha256OfBlock(block)
