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
  useToast,
} from '@chakra-ui/react'
import { useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useFormik } from 'formik'
import axios from 'axios'

import Logo from 'assets/LOGO.png'
import config from 'config/index'

export default function Signup() {
  const { account } = useWeb3React()
  const navigate = useNavigate()
  const toast = useToast()
  const employeeReducer = useSelector((state) => state.employeeReducer)

  useEffect(() => {
    if (!account) {
      navigate('/')
    }
  }, [account])

  const formik = useFormik({
    initialValues: {
      department: employeeReducer.department[0].id,
      role: employeeReducer.role[0].id,
      name: '',
    },
    onSubmit: async (values) => {
      if (values.name === '') {
        toast({
          title: `Name must not be empty!`,
          position: 'top-right',
          isClosable: true,
        })
        return
      }
      const { name, department, role } = values
      const options = {
        method: 'POST',
        url: `${config.apiEndpoint}/api/employee/create`,
        headers: {
          'content-type': 'application/json',
          Accept: 'application/json',
        },
        data: {
          name: name,
          departmentId: parseInt(department),
          roleId: parseInt(role),
          accountAddr: account,
          isApproved: false,
          isManager: false,
        },
      }
      await axios
        .request(options)
        .then(function (response) {
          if (response.data.id) {
            toast({
              title: `Please wait until approved.`,
              position: 'top-right',
              isClosable: true,
            })
            navigate('/proposal/public')
          }
        })
        .catch(function (error) {
          console.error(error)
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
