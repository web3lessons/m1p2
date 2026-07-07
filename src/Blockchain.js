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

  getBalance(address) {
    return this.#balances.get(address) || 0
  }

  getLastHash() {
    return this.#blocks.at(-1)?.hash || ''
  }

  addBlock(block) {
    const balances = calculateBalancesAfterBlock(
      new Map(this.#balances),
      block,
      this.getLastHash(),
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
