import DAOAbi from 'abi/DAO.json'
import config from 'config'

import BlockchainService from './blockchainService'

class DAOService extends BlockchainService {
  constructor(DAOAddress) {
    super()
    this.contractAddress = DAOAddress
    this.contract = new this.web3.eth.Contract(DAOAbi, DAOAddress)
  }

  getAllProposal = async () => this.contract.methods.getAllProposal().call()

  getPermissionsOfLevel = async (level) =>
    this.contract.methods.getPermissionsOfLevel(level).call()

  addPermission = async (from, _level, _role) => {
    try {
      const dataAbi = this.contract.methods
        .addPermission(_level, _role)
        .encodeABI()
      const txHash = await this.signTransaction(from, dataAbi, 0)
      return txHash
    } catch (err) {
      console.log(err)
      return null
    }
  }

  approveProposal = async (from, index) => {
    try {
      const dataAbi = this.contract.methods.approveProposal(index).encodeABI()
      const txHash = await this.signTransaction(from, dataAbi, 0)
      return txHash
    } catch (err) {
      console.log(err)
    }
  }

  createProposal = async (from, _contentURI, _isPublic) => {
    try {
      const dataAbi = this.contract.methods
        .createProposal(_contentURI, _isPublic)
        .encodeABI()
      const txHash = await this.signTransaction(from, dataAbi, 0)
      return txHash
    } catch (err) {
      console.log(err)
    }
  }
}

const daoService = new DAOService(config.dao)

export default DAOService
export { daoService }
