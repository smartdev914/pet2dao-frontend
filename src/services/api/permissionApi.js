import { daoService } from 'services/blockchain/DAOService'
import { keccak256 } from '@ethersproject/keccak256'
import { toUtf8Bytes } from '@ethersproject/strings'
import { api } from 'services/api/useApi'
import { toastSuccess, toastBlockchainError } from 'utils/log'

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

const getPermission = async (level) => {
  const hash = await daoService.getPermissionsOfLevel(level)
  const promises = []
  for (let i = 0; i < hash.length; i++) {
    promises.push(fetchPermissionByKeccak256(hash[i]))
  }
  return await Promise.all(promises)
}

const getAllPermissions = async () => {
  const permissions = []
  for (let i = 0; i < 4; i++) {
    permissions.push(await getPermission(i))
  }
  return {
    level0: permissions[0],
    level1: permissions[1],
    level2: permissions[2],
    level3: permissions[3],
  }
}

const addPermissiontoDB = async (_keccak256, _department, _role, _level) => {
  api
    .post('/permission/create', {
      keccak256: _keccak256,
      department: _department,
      role: _role,
      level: _level,
    })
    .then(function (response) {
      if (response.status === 200) {
        toastSuccess(`New permission added successfully.`)
      }
    })
    .catch(function (error) {
      console.error('Add Permission Error:', error)
    })
}

const handlePermissionAdd = async ({
  account,
  currentLevel,
  currentDepartment,
  currentRole,
  successCallback,
}) => {
  if (currentDepartment == '' || currentRole === '') {
    toastSuccess(`Please select the department and role.`)
    return
  }

  const hash = await daoService.addPermission(
    account,
    currentLevel,
    `${currentDepartment}_${currentRole}`,
  )
  if (hash) {
    await addPermissiontoDB(
      keccak256(toUtf8Bytes(`${currentDepartment}_${currentRole}`)),
      currentDepartment,
      currentRole,
      currentLevel,
    )
    successCallback()
    // setAllPermissions()
  } else {
    toastBlockchainError()
  }
}

const handlePermissionDelete = async ({
  account,
  currentLevel,
  index,
  id,
  successCallback,
}) => {
  const hash = await daoService.deletePermission(account, currentLevel, index)
  if (hash) {
    api
      .delete(`/permission/delete/${id}`)
      .then(function (response) {
        if (response.data) {
          successCallback()
          //   setAllPermissions()
          toastSuccess(`Permission deleted Successfully.`)
        }
      })
      .catch(function (error) {
        console.error(error)
      })
  } else {
    toastBlockchainError()
  }
}

export {
  addPermissiontoDB,
  getAllPermissions,
  fetchPermissionByKeccak256,
  handlePermissionAdd,
  handlePermissionDelete,
}
