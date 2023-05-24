import { DEFAULT_ADMIN_ROLE } from 'constants'
import { roleNFTService } from 'services/blockchain/roleNFTService'
import {
  toastError,
  toastSuccess,
  toastServerError,
  toastBlockchainError,
} from 'utils/log'
import { validateEthAddr } from 'utils/utils'
import { api } from './useApi'

// ////////////////// ADMIN ////////////////////
const fetchAddressByID = async (ID) => {
  return new Promise((resolve, reject) => {
    ;(async () => {
      try {
        const accountAddr = await roleNFTService.getRoleMember(
          DEFAULT_ADMIN_ROLE,
          ID,
        )
        console.log('Account Address', accountAddr)

        resolve(accountAddr)
      } catch (e) {
        reject()
      }
    })()
  })
}

const fetchAddr = async () => {
  const count = await roleNFTService.getRoleMemberCount(DEFAULT_ADMIN_ROLE)
  console.log('Role Member Count:', count)
  const promises = []
  for (let i = 0; i < count; i++) {
    promises.push(fetchAddressByID(i))
  }
  const result = await Promise.allSettled(promises)
  const _addresses = result.map((item) => item.value)
  console.log('Fetched Addresses', _addresses)

  return _addresses
}

const handleAddAdmin = async ({ account, address, successCallback }) => {
  if (address === '') {
    toastError(`Please input the account address.`)
    return
  } else {
    const validation = validateEthAddr(address)
    if (validation !== null) {
      toastError(validation)
      return
    }
  }

  const hash = await roleNFTService.addAdmin(account, address)
  if (hash) {
    successCallback()
    // fetchAddress()
    toastSuccess(`New address is added successfully`)
  } else {
    toastBlockchainError()
  }
}

const handleDeleteAdmin = async ({ account, _address, successCallback }) => {
  const hash = await roleNFTService.revokeRole(
    account,
    DEFAULT_ADMIN_ROLE,
    _address,
  )
  if (hash) {
    successCallback()
    // fetchAddress()
    toastSuccess(`Address is deleted successfully`)
  } else {
    toastBlockchainError()
  }
}

// ///// NFT /////////
const updateDBNFT = async (id, customData) => {
  api
    .put(`/nft/update/${id}`, customData)
    .then(function (response) {
      if (response.status === 200) {
        toastSuccess(`NFT minted Successfully.`)
      } else {
        toastServerError()
      }
    })
    .catch(function (error) {
      console.error('NFT Update Error:', error)
    })
}

const findOneByAccountAddr = async (accountAddr) => {
  const respones = await api.get(
    `/employee/findOneByAccountAddr/${accountAddr}`,
  )
  return respones.data
}

const fetchNFTByID = async (ID) => {
  return new Promise((resolve, reject) => {
    ;(async () => {
      try {
        const tokenURI = await roleNFTService.tokenURI(ID)
        const hash = tokenURI.split('/')[tokenURI.split('/').length - 1]
        const accountAddr = await roleNFTService.ownerOf(ID)
        const employee = await findOneByAccountAddr(accountAddr)
        const _nft = {
          metaDataURI: hash,
          employee: employee,
          id: ID,
        }
        resolve(_nft)
      } catch (e) {
        reject()
      }
    })()
  })
}

export {
  fetchAddr,
  fetchAddressByID,
  updateDBNFT,
  findOneByAccountAddr,
  fetchNFTByID,
  handleAddAdmin,
  handleDeleteAdmin,
}
