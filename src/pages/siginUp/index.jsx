import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Text,
  Stack,
  Button,
  Heading,
  Image,
  Select,
} from '@chakra-ui/react'
import { useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useFormik } from 'formik'
import { api } from 'services/api/useApi'
import { toastSuccess, toastError } from 'utils/log'

import Logo from 'assets/LOGO.png'

export default function Signup() {
  const { account } = useWeb3React()
  const navigate = useNavigate()
  const employeeReducer = useSelector((state) => state.employeeReducer)

  useEffect(() => {
    if (!account) {
      navigate('/')
    }
  }, [account])

  const formik = useFormik({
    initialValues: {
      department:
        employeeReducer.department.length > 0
          ? employeeReducer.department[0].id
          : '',
      role: employeeReducer.role.length > 0 ? employeeReducer.role[0].id : '',
      name: '',
    },
    onSubmit: async (values) => {
      if (values.name === '') {
        toastError(`Name must not be empty!`)
        return
      }
      const { name, department, role } = values
      const newEmployee = {
        name: name,
        departmentId: parseInt(department),
        roleId: parseInt(role),
        accountAddr: account,
        isApproved: false,
        isManager: false,
      }

      api
        .post('/employee/create', newEmployee)
        .then(function (response) {
          if (response.data.id) {
            toastSuccess(`Please wait until approved.`)
            navigate('/proposal/public')
          }
        })
        .catch(function (error) {
          toastError('Sign Up Error', 'Sign Up Error', error)
        })
    },
  })

  return (
    <Flex minH={'100vh'} align={'center'} justify={'center'} bg="primaryBlack">
      <Stack
        spacing={8}
        mx={'auto'}
        maxW={'lg'}
        py={12}
        px={6}
        border="2px"
        color="primaryBlue"
        rounded={'lg'}
        borderColor="borderColor"
      >
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            <Image src={Logo} height={20} alt="Logo" />
          </Heading>
        </Stack>
        <form onSubmit={formik.handleSubmit}>
          <Box boxShadow={'lg'} p={8}>
            <Stack spacing={4}>
              <FormControl id="department">
                <FormLabel>Department</FormLabel>
                <Select
                  id="department"
                  type="text"
                  borderColor="borderColor"
                  onChange={formik.handleChange}
                  value={formik.values.department}
                >
                  {employeeReducer.department.map((item) => (
                    <option
                      key={item.id}
                      style={{
                        color: 'rgb(75, 174, 226)',
                        background: 'rgb(0, 5, 5)',
                        fontSize: '20px',
                      }}
                      value={item.id}
                    >
                      {item.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl id="role">
                <FormLabel>Role</FormLabel>
                <Select
                  type="text"
                  id="role"
                  borderColor="borderColor"
                  onChange={formik.handleChange}
                  value={formik.values.role}
                >
                  {employeeReducer.role.map((item) => (
                    <option
                      key={item.id}
                      style={{
                        color: 'rgb(75, 174, 226)',
                        background: 'rgb(0, 5, 5)',
                        fontSize: '20px',
                      }}
                      value={item.id}
                    >
                      {item.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl id="name">
                <FormLabel>Name</FormLabel>
                <Input
                  id="name"
                  type="text"
                  borderColor="borderColor"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
              </FormControl>
              <FormControl id="account">
                <FormLabel>Account</FormLabel>
                <Text type="text">{account}</Text>
              </FormControl>
              <Flex spacing={10} pt={2} justifyContent="space-between">
                <Button
                  type="submit"
                  loadingText="Submitting"
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                >
                  Sign up
                </Button>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  onClick={() => navigate('/proposal/public')}
                >
                  Not Now
                </Button>
              </Flex>
            </Stack>
          </Box>
        </form>
      </Stack>
    </Flex>
  )
}
