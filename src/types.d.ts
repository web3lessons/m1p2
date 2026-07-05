interface Transaction {
  from: string
  to: string
  amount: number
  fee: number
}

export interface Block {
  miner: string
  previousHash: string
  hash: string
  nonce: number
  transactions: Transaction[]
}
