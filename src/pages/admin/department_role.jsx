import { useCallback, useState } from 'react'
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
import SideBar from './sidebar'
import {
  handleDepartmentAdd,
  handleDepartmentDelete,
  handleRoleAdd,
  handleRoleDelete,
} from 'services/api/departmentApi'

function DeparmentRole() {
  const dispatch = useDispatch()
  const [_department, setDepartment] = useState('')
  const [_role, setRole] = useState('')
  const employeeReducer = useSelector((state) => state.employeeReducer)
  const { department, role } = employeeReducer

  const departmentAdd = useCallback(
    () =>
      handleDepartmentAdd(_department, dispatch, () => {
        setDepartment('')
      }),
    [_department],
  )

  const departmentDelete = (item) => handleDepartmentDelete(item, dispatch)

  const roleAdd = () => handleRoleAdd(_role, dispatch, () => setRole(''))

  const roleDelete = (item) => handleRoleDelete(item, dispatch)

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
                  onClick={departmentAdd}
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
                        onClick={() => departmentDelete(item)}
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
                  onClick={roleAdd}
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
                        onClick={() => roleDelete(item)}
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
