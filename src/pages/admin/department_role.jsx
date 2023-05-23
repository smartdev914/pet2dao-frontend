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
} from '@chakra-ui/react'
import { AddIcon, CloseIcon } from '@chakra-ui/icons'
import { useSelector, useDispatch } from 'react-redux'
import { getAllDepartment, getAllRole } from 'store/actions/employeeAction'
import SideBar from './sidebar'
import { api } from 'services/api/useApi'
import { toastSuccess, toastError } from 'utils/log'

function DeparmentRole() {
  const dispatch = useDispatch()
  const [_department, setDepartment] = useState('')
  const [_role, setRole] = useState('')
  const employeeReducer = useSelector((state) => state.employeeReducer)
  const { department, role } = employeeReducer

  const handleDepartmentAdd = async () => {
    if (_department == '') {
      toastError(`Please input the department name.`)
      return
    }
    api
      .post('/api/department/create', {
        name: _department,
      })
      .then(function (response) {
        if (response.data.id) {
          toastSuccess(`New Department added Successfully.`)
          dispatch(getAllDepartment())
          setDepartment('')
        }
      })
      .catch(function (error) {
        console.error(error)
      })
  }

  const handleDepartmentDelete = (item) => {
    api
      .delete(`/department/delete/${item.id}`)
      .then(function (response) {
        if (response.data) {
          toastSuccess(`Department deleted Successfully.`)
          dispatch(getAllDepartment())
        }
      })
      .catch(function (error) {
        console.error(error)
      })
  }

  const handleRoleAdd = async () => {
    if (_role == '') {
      toastError(`Please input the role name.`)
      return
    }
    api
      .post('/role/create', {
        name: _role,
      })
      .then(function (response) {
        if (response.data.id) {
          toastSuccess(`New Role added Successfully.`)
          dispatch(getAllRole())
          setRole('')
        }
      })
      .catch(function (error) {
        console.error(error)
      })
  }

  const handleRoleDelete = (item) => {
    api
      .delete(`/role/delete/${item.id}`)
      .then(function (response) {
        if (response.data) {
          toastSuccess(`Role deleted Successfully.`)
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
