import { TokenListToken } from '@/store/modules/assets/types'
import { web3 } from '@/evm'
import { BN } from 'avalanche'
import { bnToBig } from '@/helpers/helper'
import Big from 'big.js'

import ERC20Abi from '@openzeppelin/contracts/build/contracts/ERC20.json'

class Erc20Token {
    data: TokenListToken
    address: string
    contract: any
    balanceRaw: string
    balanceBN: BN
    balanceBig: Big

    constructor(tokenData: TokenListToken) {
        this.data = tokenData
        this.balanceRaw = '0'
        this.balanceBN = new BN('0')
        this.balanceBig = Big(0)
        this.address = tokenData.address

        //@ts-ignore
        const tokenInst = new web3.eth.Contract(ERC20Abi.abi, tokenData.address)
        this.contract = tokenInst
    }

    // Returns a new instance of the token, given only the erc20 address
    static fromAddress(address: string) {
        //@ts-ignore
        const tokenInst = new web3.eth.Contract(ERC20Abi.abi, address)
    }

    refreshInst() {
        //@ts-ignore
        const tokenInst = new web3.eth.Contract(ERC20Abi.abi, this.address)
        this.contract = tokenInst
    }

    createTransferTx(to: string, amount: BN) {
        return this.contract.methods.transfer(to, amount.toString())
    }

    setGasPrice(gasPrice: BN) {
        this.contract.options.gasPrice = gasPrice
    }

    setGasLimit(gasLimit: number) {
        this.contract.options.gas = gasLimit
    }

    async updateBalance(address: string) {
        const bal = await this.contract.methods.balanceOf('0x' + address).call()
        this.balanceRaw = bal
        this.balanceBN = new BN(bal)
        this.balanceBig = bnToBig(this.balanceBN, parseInt(this.data.decimals as string))
    }
}

export default Erc20Token
