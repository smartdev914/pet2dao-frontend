import { DEFAULT_ADMIN_ROLE } from 'constants'
import { roleNFTService } from 'services/blockchain/roleNFTService'
import { daoService } from 'services/blockchain/DAOService'
import { toastSuccess, toastServerError } from 'utils/log'
// import { validateEthAddr } from 'utils/utils'
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

// ////////////////////////// Permission //////////////////////
const fetchPermissionByKeccak256 = async (_keccak256) => {
  return new Promise((resolve, reject) => {
    ;(async () => {
      try {
        const _permission = await api.get(
          `/permission/findOneByKeccak256/${_keccak256}`,
        )
        resolve(_permission.data)
      } catch (e) {
        reject()
      }
    })()
  })
}

const getAllPermissions = async () => {
  const hash0 = await daoService.getPermissionsOfLevel(0)
  const promises0 = []
  for (let i = 0; i < hash0.length; i++) {
    promises0.push(fetchPermissionByKeccak256(hash0[i]))
  }
  const permission0 = await Promise.all(promises0)

  const hash1 = await daoService.getPermissionsOfLevel(1)
  const promises1 = []
  for (let i = 0; i < hash1.length; i++) {
    promises1.push(fetchPermissionByKeccak256(hash1[i]))
  }
  const permission1 = await Promise.all(promises1)

  const hash2 = await daoService.getPermissionsOfLevel(2)
  const promises2 = []
  for (let i = 0; i < hash2.length; i++) {
    promises2.push(fetchPermissionByKeccak256(hash2[i]))
  }
  const permission2 = await Promise.all(promises2)

  const hash3 = await daoService.getPermissionsOfLevel(3)
  const promises3 = []
  for (let i = 0; i < hash3.length; i++) {
    promises3.push(fetchPermissionByKeccak256(hash3[i]))
  }
  const permission3 = await Promise.all(promises3)
  return {
    level0: permission0,
    level1: permission1,
    level2: permission2,
    level3: permission3,
  }
}

export {
  fetchAddr,
  fetchAddressByID,
  updateDBNFT,
  findOneByAccountAddr,
  fetchNFTByID,
  fetchPermissionByKeccak256,
  getAllPermissions,
}
