import { useState } from 'react'
import { Layout } from 'components'
import {
  Flex,
  Text,
  VStack,
  Box,
  Divider,
  Input,
  IconButton,
  HStack,
  useToast,
} from '@chakra-ui/react'
import { AddIcon, CloseIcon } from '@chakra-ui/icons'
import { useSelector, useDispatch } from 'react-redux'
import { getAllDepartment, getAllRole } from 'store/actions/employeeAction'
import SideBar from './sidebar'
import { client } from 'services/api/useApi'

function DeparmentRole() {
  const toast = useToast()
  const dispatch = useDispatch()
  const [_department, setDepartment] = useState('')
  const [_role, setRole] = useState('')
  const employeeReducer = useSelector((state) => state.employeeReducer)
  const { department, role } = employeeReducer

  const handleDepartmentAdd = async () => {
    if (_department == '') {
      toast({
        title: `Please input the department name.`,
        position: 'top-right',
        isClosable: true,
      })
      return
    }
    const token = JSON.parse(localStorage.getItem('token'))
    const customOption = {
      headers: {
        Authorization: token,
      },
      data: {
        name: _department,
      },
    }

    client('/api/department/create', 'POST', customOption)
      .then(function (response) {
        if (response.data.id) {
          toast({
            title: `New Department added Successfully.`,
            position: 'top-right',
            isClosable: true,
          })
          dispatch(getAllDepartment())
          setDepartment('')
        }
      })
      .catch(function (error) {
        console.error(error)
      })
  }

  const handleDepartmentDelete = (item) => {
    const token = JSON.parse(localStorage.getItem('token'))
    const customOption = {
      headers: {
        Authorization: token,
      },
    }
    client(`/api/department/delete/${item.id}`, 'DELETE', customOption)
      .then(function (response) {
        if (response.data) {
          toast({
            title: `Department deleted Successfully.`,
            position: 'top-right',
            isClosable: true,
          })
          dispatch(getAllDepartment())
        }
      })
      .catch(function (error) {
        console.error(error)
      })
  }

  const handleRoleAdd = async () => {
    if (_role == '') {
      toast({
        title: `Please input the role name.`,
        position: 'top-right',
        isClosable: true,
      })
      return
    }
    const token = JSON.parse(localStorage.getItem('token'))
    const customOption = {
      headers: {
        Authorization: token,
      },
      data: {
        name: _role,
      },
    }
    client('/api/role/create', 'POST', customOption)
      .then(function (response) {
        if (response.data.id) {
          toast({
            title: `New Role added Successfully.`,
            position: 'top-right',
            isClosable: true,
          })
          dispatch(getAllRole())
          setRole('')
        }
      })
      .catch(function (error) {
        console.error(error)
      })
  }

  const handleRoleDelete = (item) => {
    const token = JSON.parse(localStorage.getItem('token'))
    const customOption = {
      headers: {
        Authorization: token,
      },
    }
    client(`/api/role/delete/${item.id}`, 'DELETE', customOption)
      .then(function (response) {
        if (response.data) {
          toast({
            title: `Role deleted Successfully.`,
            position: 'top-right',
            isClosable: true,
          })
          dispatch(getAllRole())
        }
      })
      .catch(function (error) {
        console.error(error)
      })
  }

  return (
    <Layout activeId="manager">
      <Flex mt={{ base: '10px', md: '24px' }}>
        <SideBar activeId="depart_role" />
        <VStack
          px={{ base: '10px', md: '32px' }}
          width={{ base: '100%', lg: '78%' }}
        >
          <Flex pb={'20px'}>
            <Text
              fontSize={{ base: '24px', md: '28px' }}
              color="whiteAlpha.900"
            >
              Department & Role
            </Text>
          </Flex>
          <Flex
            direction={{ base: 'column', md: 'row' }}
            width={'100%'}
            gap="20px"
            color={'whiteAlpha.800'}
          >
            <VStack
              width={{ base: '100%', md: '50%' }}
              border={'1px'}
              borderColor="secondaryBorderColor"
              borderRadius="12px"
              py={'20px'}
            >
              <Text fontSize={'20px'}>Department</Text>
              <Divider />
              <HStack>
                <Input
                  placeholder="Input Departmnet"
                  borderColor="secondaryBorderColor"
                  _placeholder={{ color: 'textColor' }}
                  value={_department}
                  onChange={(e) => setDepartment(e.target.value)}
                />
                <IconButton
                  bg="secondaryBorderColor"
                  borderRadius={'20px'}
                  _hover={{
                    bg: 'primaryBlue',
                    color: 'primaryBlack',
                  }}
                  icon={<AddIcon />}
                  onClick={handleDepartmentAdd}
                />
              </HStack>
              <VStack
                w={'100%'}
                flex={1}
                maxH="400px"
                overflowY={'scroll'}
                sx={{
                  '&::-webkit-scrollbar': {
                    width: '16px',
                    borderRadius: '8px',
                    backgroundColor: `rgba(40, 40, 40, 0.5)`,
                  },
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor: `rgba(20, 20, 20, 0.8)`,
                  },
                }}
              >
                {department.length == 0 ? (
                  <Text>No Department</Text>
                ) : (
                  department.map((item) => (
                    <Flex
                      w={'100%'}
                      alignItems="center"
                      justifyContent="space-evenly"
                      key={item.id}
                      px="40px"
                      py="5px"
                      cursor="pointer"
                      mt={'0px'}
                      _hover={{ bg: 'primaryBlack', color: 'primaryBlue' }}
                    >
                      <Box flex={1}>{item.name}</Box>
                      <IconButton
                        bg="secondaryBorderColor"
                        borderRadius={'20px'}
                        size="xs"
                        _hover={{
                          bg: 'primaryBlue',
                          color: 'primaryBlack',
                        }}
                        icon={<CloseIcon />}
                        onClick={() => handleDepartmentDelete(item)}
                      />
                    </Flex>
                  ))
                )}
              </VStack>
            </VStack>
            <VStack
              width={{ base: '100%', md: '50%' }}
              border={'1px'}
              borderColor="secondaryBorderColor"
              borderRadius="12px"
              py={'20px'}
            >
              <Text fontSize={'20px'}>Role</Text>
              <Divider />
              <HStack>
                <Input
                  placeholder="Input Departmnet"
                  borderColor="secondaryBorderColor"
                  _placeholder={{ color: 'textColor' }}
                  value={_role}
                  onChange={(e) => setRole(e.target.value)}
                />
                <IconButton
                  bg="secondaryBorderColor"
                  borderRadius={'20px'}
                  _hover={{
                    bg: 'primaryBlue',
                    color: 'primaryBlack',
                  }}
                  icon={<AddIcon />}
                  onClick={handleRoleAdd}
                />
              </HStack>
              <VStack
                w={'100%'}
                flex={1}
                maxH="400px"
                overflowY={'scroll'}
                sx={{
                  '&::-webkit-scrollbar': {
                    width: '16px',
                    borderRadius: '8px',
                    backgroundColor: `rgba(40, 40, 40, 0.5)`,
                  },
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor: `rgba(20, 20, 20, 0.8)`,
                  },
                }}
              >
                {role.length == 0 ? (
                  <Text>No Department</Text>
                ) : (
                  role.map((item) => (
                    <Flex
                      w={'100%'}
                      alignItems="center"
                      justifyContent="space-evenly"
                      key={item.id}
                      px="40px"
                      py="5px"
                      cursor="pointer"
                      _hover={{ bg: 'primaryBlack', color: 'primaryBlue' }}
                    >
                      <Box flex={1}>{item.name}</Box>
                      <IconButton
                        bg="secondaryBorderColor"
                        borderRadius={'20px'}
                        size="xs"
                        _hover={{
                          bg: 'primaryBlue',
                          color: 'primaryBlack',
                        }}
                        icon={<CloseIcon />}
                        onClick={() => handleRoleDelete(item)}
                      />
                    </Flex>
                  ))
                )}
              </VStack>
            </VStack>
          </Flex>
        </VStack>
      </Flex>
    </Layout>
  )
}

export default DeparmentRole
