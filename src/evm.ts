import Web3 from 'web3'

const defaultRpcUrl = `https://testnet-rpc.geeblock.io/ext/bc/C/rpc`

export let web3 = new Web3(defaultRpcUrl)
export const changeRpc = (rpcProvider: any) => {
    web3 = new Web3(rpcProvider)
}
