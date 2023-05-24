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

import { useWeb3React } from '@web3-react/core'
import SideBar from './sidebar'
import PermissionTabPanel from 'components/PermissionTabPanel'
import {
  getAllPermissions,
  handlePermissionAdd,
  handlePermissionDelete,
} from 'services/api/permissionApi'

function Permission() {
  const [isLoading, setIsLoading] = useState(false)
  const [permissions, setPermissions] = useState({})
  const [currentDepartment, setCurrentDepartment] = useState('')
  const [currentRole, setCurrentRole] = useState('')
  const [currentLevel, setCurrentLevel] = useState(0)

  const { account } = useWeb3React()

  const setAllPermissions = async () => {
    setIsLoading(true)
    setPermissions(await getAllPermissions())
    setIsLoading(false)
  }

  const handleDepartmentChange = (e) => {
    setCurrentDepartment(e.target.value)
  }

  const handleRoleChange = (e) => {
    setCurrentRole(e.target.value)
  }

  const permissionAdd = () =>
    handlePermissionAdd({
      account,
      currentLevel,
      currentDepartment,
      currentRole,
      successCallback: setAllPermissions,
    })

  const permissionDelete = (index, id) => {
    handlePermissionDelete({
      account,
      currentLevel,
      index,
      id,
      setAllPermissions,
    })
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
                handlePermissionAdd={permissionAdd}
                permissions={permissions.level0}
                handlePermissionDelete={permissionDelete}
              />
              <PermissionTabPanel
                isLoading={isLoading}
                currentDepartment={currentDepartment}
                handleDepartmentChange={handleDepartmentChange}
                currentRole={currentRole}
                handleRoleChange={handleRoleChange}
                handlePermissionAdd={permissionAdd}
                permissions={permissions.level1}
                handlePermissionDelete={permissionDelete}
              />
              <PermissionTabPanel
                isLoading={isLoading}
                currentDepartment={currentDepartment}
                handleDepartmentChange={handleDepartmentChange}
                currentRole={currentRole}
                handleRoleChange={handleRoleChange}
                handlePermissionAdd={permissionAdd}
                permissions={permissions.level2}
                handlePermissionDelete={permissionDelete}
              />
              <PermissionTabPanel
                isLoading={isLoading}
                currentDepartment={currentDepartment}
                handleDepartmentChange={handleDepartmentChange}
                currentRole={currentRole}
                handleRoleChange={handleRoleChange}
                handlePermissionAdd={permissionAdd}
                permissions={permissions.level3}
                handlePermissionDelete={permissionDelete}
              />
            </TabPanels>
          </Tabs>
        </VStack>
      </Flex>
    </Layout>
  )
}

export default Permission
