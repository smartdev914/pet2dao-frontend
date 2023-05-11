import roleNFTAbi from 'abi/RoleNFT.json'
import config from 'config'

import BlockchainService from './blockchainService'

class RoleNFTService extends BlockchainService {
  constructor(roleNFTAddr) {
    super()
    this.contractAddress = roleNFTAddr
    this.contract = new this.web3.eth.Contract(roleNFTAbi, roleNFTAddr)
  }

  getIdentity = async (address) =>
    this.contract.methods.getIdentity(address).call()

  getTotalTokenCount = async () =>
    this.contract.methods.getTotalTokenCount().call()

  idOfIdentity = async (tokenId) =>
    this.contract.methods.idOfIdentity(tokenId).call()

  owner = async () => this.contract.methods.owner().call()

  ownerOf = async (tokenId) => this.contract.methods.ownerOf(tokenId).call()

  tokenIdOf = async (address) => this.contract.methods.tokenIdOf(address).call()

  tokenURI = async (tokenId) => this.contract.methods.tokenURI(tokenId).call()

  getRoleMemberCount = async (role) =>
    this.contract.methods.getRoleMemberCount(role).call()

  getRoleMember = async (role, index) =>
    this.contract.methods.getRoleMember(role, index).call()

  mintNFT = async (from, to, _tokenURI, _department, _role) => {
    try {
      if (_tokenURI === '' || _department === '' || _role === '') return null
      const dataAbi = this.contract.methods
        .mint(to, _tokenURI, _department, _role)
        .encodeABI()
      const txHash = await this.signTransaction(from, dataAbi, 0)
      return txHash
    } catch (err) {
      console.log(err)
      return null
    }
  }

  transferOwnership = async (from, to) => {
    try {
      const dataAbi = this.contract.methods.transferOwnership(to).encodeABI()
      const txHash = await this.signTransaction(from, dataAbi, 0)
      return txHash
    } catch (err) {
      console.log(err)
      return null
    }
  }

  burnNFT = async (from, tokenId) => {
    try {
      if (parseInt(tokenId) < 1) return null
      const dataAbi = this.contract.methods.burnToken(tokenId).encodeABI()
      const txHash = await this.signTransaction(from, dataAbi, 0)
      return txHash
    } catch (err) {
      console.log(err)
      return null
    }
  }

  updateIdentity = async (from, to, _department, _role) => {
    try {
      if (_department === '' || _role === '') {
        console.log('must not be empty')
        return null
      }

      const dataAbi = this.contract.methods
        .updateIdentity(to, _department, _role)
        .encodeABI()
      const txHash = await this.signTransaction(from, dataAbi, 0)
      return txHash
    } catch (err) {
      console.log(err)
    }
  }

  addAdmin = async (from, _address) => {
    try {
      if (_address === '') return null
      const dataAbi = this.contract.methods.addAdmin(_address).encodeABI()
      const txHash = await this.signTransaction(from, dataAbi, 0)
      return txHash
    } catch (err) {
      console.log(err)
      return null
    }
  }

  revokeRole = async (from, _role, _address) => {
    try {
      if (_address === '') return null
      const dataAbi = this.contract.methods
        .revokeRole(_role, _address)
        .encodeABI()
      const txHash = await this.signTransaction(from, dataAbi, 0)
      return txHash
    } catch (err) {
      console.log(err)
      return null
    }
  }
}

const roleNFTService = new RoleNFTService(config.roleNFT)

export default RoleNFTService
export { roleNFTService }
