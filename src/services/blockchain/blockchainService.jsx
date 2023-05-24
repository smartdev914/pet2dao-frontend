import config from 'config'
import Web3 from 'web3'

class BlockchainService {
  constructor() {
    const blockchainProvider = config.chainRpcUrl

    this.web3 = new Web3(new Web3.providers.HttpProvider(blockchainProvider))
    this.chainId = config.chainId
  }

  getNonce = async (address) => this.web3.eth.getTransactionCount(address)

  getEthBalance = async (address) => this.web3.eth.getBalance(address)

  // sign transaction using metamask
  signTransaction = async (address, dataABI, _etherAmount) => {
    const transactionParameters = {
      to: this.contractAddress, // Required except during contract publications.
      from: address, // must match user's active address.
      data: dataABI,
      chainId: this.chainId,
      value: parseInt(_etherAmount).toString(16), // this should be hex !!!!
    }

    // sign the transaction
    try {
      const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      })
      return await this.checkTx(txHash)
    } catch (error) {
      // alert('There was an error in sending transaction. Please try again.')
      console.log(error)
      return null
    }
  }

  checkTx = async (txHash) => {
    // let result = await web3.eth.getTransaction(txHash)
    let result = null
    while (result == null) {
      result = await this.web3.eth.getTransactionReceipt(txHash.toString())
    }
    if (result.status) return txHash
    else return null
  }

  checkIsAddress = (address) => this.web3.utils.isAddress(address)
}

const blockchainService = new BlockchainService()

export default BlockchainService
export { blockchainService }
