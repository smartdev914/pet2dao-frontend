import { useEffect, useState } from 'react'
import { Layout } from 'components'
import {
  Flex,
  Text,
  VStack,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  useToast,
} from '@chakra-ui/react'
import { keccak256 } from '@ethersproject/keccak256'
import { toUtf8Bytes } from '@ethersproject/strings'
import { useWeb3React } from '@web3-react/core'
import SideBar from './sidebar'
import { daoService } from 'services/blockchain/DAOService'
import { client } from 'services/api/useApi'
import PermissionTabPanel from 'components/PermissionTabPanel'

function Permission() {
  const [isLoading, setIsLoading] = useState(false)
  const [permissions, setPermissions] = useState({})
  const [currentDepartment, setCurrentDepartment] = useState('')
  const [currentRole, setCurrentRole] = useState('')
  const [currentLevel, setCurrentLevel] = useState(0)

  const toast = useToast()
  const { account } = useWeb3React()

  const fetchPermissionByKeccak256 = async (_keccak256) => {
    return new Promise((resolve, reject) => {
      ;(async () => {
        try {
          const token = JSON.parse(localStorage.getItem('token'))
          const customOption = {
            headers: {
              Authorization: token,
            },
          }
          const _permission = await client(
            `/api/permission/findOneByKeccak256/${_keccak256}`,
            'GET',
            customOption,
          )
          resolve(_permission.data)
        } catch (e) {
          reject()
        }
      })()
    })
  }

  const getAllPermissions = async () => {
    setIsLoading(true)
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
    setPermissions({
      level0: permission0,
      level1: permission1,
      level2: permission2,
      level3: permission3,
    })
    setIsLoading(false)
  }

  const handleDepartmentChange = (e) => {
    setCurrentDepartment(e.target.value)
  }

  const handleRoleChange = (e) => {
    setCurrentRole(e.target.value)
  }

  const addPermissiontoDB = async (_keccak256, _department, _role, _level) => {
    const token = JSON.parse(localStorage.getItem('token'))
    const customOption = {
      headers: {
        Authorization: token,
      },
      data: {
        keccak256: _keccak256,
        department: _department,
        role: _role,
        level: _level,
      },
    }

    client('/api/permission/create', 'POST', customOption)
      .then(function (response) {
        if (response.status === 200) {
          toast({
            title: `New permission added successfully.`,
            position: 'top-right',
            isClosable: true,
          })
        }
      })
      .catch(function (error) {
        console.error(error)
      })
  }

  const handlePermissionAdd = async () => {
    if (currentDepartment == '' || currentRole === '') {
      toast({
        title: `Please select the department and role.`,
        position: 'top-right',
        isClosable: true,
      })
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
      getAllPermissions()
    } else {
      toast({
        title: 'Error occurs in the BlockChain',
        position: 'top-right',
        isClosable: true,
      })
    }
  }

  const handlePermissionDelete = async (index, id) => {
    const hash = await daoService.deletePermission(account, currentLevel, index)
    if (hash) {
      const token = JSON.parse(localStorage.getItem('token'))
      const customOption = {
        headers: {
          Authorization: token,
        },
      }
      client(`/api/permission/delete/${id}`, 'DELETE', customOption)
        .then(function (response) {
          if (response.data) {
            getAllPermissions()
            toast({
              title: `Permission deleted Successfully.`,
              position: 'top-right',
              isClosable: true,
            })
          }
        })
        .catch(function (error) {
          console.error(error)
        })
    } else {
      toast({
        title: 'Error occurs in the BlockChain',
        position: 'top-right',
        isClosable: true,
      })
    }
  }

  useEffect(() => {
    getAllPermissions()
  }, [])

  return (
    <Layout activeId="manager">
      <Flex mt="24px">
        <SideBar activeId="permission" />
        <VStack paddingLeft="32px" width={'78%'}>
          <Flex pb={'20px'} direction="column">
            <Text fontSize="28px" textAlign={'center'} color="whiteAlpha.900">
              Permission
            </Text>
          </Flex>
          <Tabs
            onChange={(index) => setCurrentLevel(index)}
            isFitted
            variant="unstyled"
            w="100%"
            color="whiteAlpha.900"
          >
            <TabList>
              <Tab
                borderBottom="1px"
                borderColor="secondaryBorderColor"
                fontFamily="Robot"
                fontSize="20px"
                _selected={{
                  border: '1px',
                  borderColor: 'secondaryBorderColor',
                  borderTopLeftRadius: '5px',
                  borderTopRightRadius: '5px',
                  borderBottomStyle: 'none',
                }}
              >
                Level 1
              </Tab>
              <Tab
                borderBottom="1px"
                borderColor="secondaryBorderColor"
                fontFamily="Robot"
                fontSize="20px"
                _selected={{
                  border: '1px',
                  borderColor: 'secondaryBorderColor',
                  borderTopLeftRadius: '5px',
                  borderTopRightRadius: '5px',
                  borderBottomStyle: 'none',
                }}
              >
                Level 2
              </Tab>
              <Tab
                borderBottom="1px"
                borderColor="secondaryBorderColor"
                fontFamily="Robot"
                fontSize="20px"
                _selected={{
                  border: '1px',
                  borderColor: 'secondaryBorderColor',
                  borderTopLeftRadius: '5px',
                  borderTopRightRadius: '5px',
                  borderBottomStyle: 'none',
                }}
              >
                Level 3
              </Tab>
              <Tab
                borderBottom="1px"
                borderColor="secondaryBorderColor"
                fontFamily="Robot"
                fontSize="20px"
                _selected={{
                  border: '1px',
                  borderColor: 'secondaryBorderColor',
                  borderTopLeftRadius: '5px',
                  borderTopRightRadius: '5px',
                  borderBottomStyle: 'none',
                }}
              >
                Level 4
              </Tab>
            </TabList>
            <TabPanels
              border="1px"
              borderColor="secondaryBorderColor"
              borderTop="none"
            >
              <PermissionTabPanel
                isLoading={isLoading}
                currentDepartment={currentDepartment}
                handleDepartmentChange={handleDepartmentChange}
                currentRole={currentRole}
                handleRoleChange={handleRoleChange}
                handlePermissionAdd={handlePermissionAdd}
                permissions={permissions.level0}
                handlePermissionDelete={handlePermissionDelete}
              />
              <PermissionTabPanel
                isLoading={isLoading}
                currentDepartment={currentDepartment}
                handleDepartmentChange={handleDepartmentChange}
                currentRole={currentRole}
                handleRoleChange={handleRoleChange}
                handlePermissionAdd={handlePermissionAdd}
                permissions={permissions.level1}
                handlePermissionDelete={handlePermissionDelete}
              />
              <PermissionTabPanel
                isLoading={isLoading}
                currentDepartment={currentDepartment}
                handleDepartmentChange={handleDepartmentChange}
                currentRole={currentRole}
                handleRoleChange={handleRoleChange}
                handlePermissionAdd={handlePermissionAdd}
                permissions={permissions.level2}
                handlePermissionDelete={handlePermissionDelete}
              />
              <PermissionTabPanel
                isLoading={isLoading}
                currentDepartment={currentDepartment}
                handleDepartmentChange={handleDepartmentChange}
                currentRole={currentRole}
                handleRoleChange={handleRoleChange}
                handlePermissionAdd={handlePermissionAdd}
                permissions={permissions.level3}
                handlePermissionDelete={handlePermissionDelete}
              />
            </TabPanels>
          </Tabs>
        </VStack>
      </Flex>
    </Layout>
  )
}

export default Permission
