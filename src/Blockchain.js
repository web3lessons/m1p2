import {
  calculateBalancesAfterBlock,
  calculateBalancesFromStratch,
} from './calculation.js'

import { readJson, writeJson } from './shared.js'

export class Blockchain {
  #blocks = []
  #filename = ''
  #balances = new Map()

  constructor(filename) {
    this.#filename = filename

    const blocks = readJson(filename)
    const balances = calculateBalancesFromStratch(blocks)

    if (balances === null) {
      throw new Error('Invalid blockchain data')
    }

    this.#blocks = blocks
    this.#balances = balances
  }

  getBalance = address => {
    return this.#balances.get(address) || 0
  }

  addBlock = block => {
    const previousHash = this.#blocks.at(-1)?.hash || ''

    const balances = calculateBalancesAfterBlock(
      new Map(this.#balances),
      block,
      previousHash,
    )

    if (balances === null) {
      return false
    }

    this.#blocks.push(block)
    this.#balances = balances

    writeJson(this.#filename, this.#blocks)

    return true
  }
}
