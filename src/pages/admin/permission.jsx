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
} from '@chakra-ui/react'
import { keccak256 } from '@ethersproject/keccak256'
import { toUtf8Bytes } from '@ethersproject/strings'
import { useWeb3React } from '@web3-react/core'
import SideBar from './sidebar'
import { daoService } from 'services/blockchain/DAOService'
import { api } from 'services/api/useApi'
import PermissionTabPanel from 'components/PermissionTabPanel'
import { toastSuccess, toastBlockchainError } from 'utils/log'
import { getAllPermissions } from 'services/api/adminApi'

function Permission() {
  const [isLoading, setIsLoading] = useState(false)
  const [permissions, setPermissions] = useState({})
  const [currentDepartment, setCurrentDepartment] = useState('')
  const [currentRole, setCurrentRole] = useState('')
  const [currentLevel, setCurrentLevel] = useState(0)

  const { account } = useWeb3React()

  const setAllPermissions = async () => {
    setIsLoading(true)
    setPermissions(getAllPermissions())
    setIsLoading(false)
  }

  const handleDepartmentChange = (e) => {
    setCurrentDepartment(e.target.value)
  }

  const handleRoleChange = (e) => {
    setCurrentRole(e.target.value)
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
        console.error(error)
      })
  }

  const handlePermissionAdd = async () => {
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
      setAllPermissions()
    } else {
      toastBlockchainError()
    }
  }

  const handlePermissionDelete = async (index, id) => {
    const hash = await daoService.deletePermission(account, currentLevel, index)
    if (hash) {
      api
        .delete(`/permission/delete/${id}`)
        .then(function (response) {
          if (response.data) {
            setAllPermissions()
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

  useEffect(() => {
    setAllPermissions()
  }, [])

  return (
    <Layout activeId="manager">
      <Flex mt={{ base: '10px', md: '24px' }}>
        <SideBar activeId="permission" />
        <VStack
          px={{ base: '10px', md: '32px' }}
          width={{ base: '100%', lg: '78%' }}
        >
          <Flex pb={{ base: '10px', md: '20px' }} direction="column">
            <Text
              fontSize={{ base: '24px', md: '28px' }}
              textAlign={'center'}
              color="whiteAlpha.900"
            >
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
                fontSize={{ base: '16px', md: '20px' }}
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
                fontSize={{ base: '16px', md: '20px' }}
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
                fontSize={{ base: '16px', md: '20px' }}
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
                fontSize={{ base: '16px', md: '20px' }}
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
