import { useEffect, useState, useCallback } from 'react'
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
  Spinner,
} from '@chakra-ui/react'
import { AddIcon, CloseIcon } from '@chakra-ui/icons'
import SideBar from './sidebar'
import { useWeb3React } from '@web3-react/core'
import {
  fetchAddr,
  handleAddAdmin,
  handleDeleteAdmin,
} from 'services/api/adminApi'

function Admin() {
  const [address, setAddress] = useState('')
  const [admins, setAdmins] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const { account } = useWeb3React()

  const fetchAddress = async () => {
    setIsLoading(true)
    const _addresses = await fetchAddr()
    setAdmins(_addresses || [])
    setIsLoading(false)
  }

  const handleAdd = useCallback(
    () => handleAddAdmin({ account, address, fetchAddress }),
    [account, address],
  )

  const handleDelete = useCallback(
    (_address) => handleDeleteAdmin({ account, _address, fetchAddress }),
    [account],
  )
  useEffect(() => {
    fetchAddress()
  }, [])

  return (
    <Layout activeId="manager">
      <Flex mt={{ base: '10px', md: '24px' }}>
        <SideBar activeId="admin" />
        <VStack
          px={{ base: '10px', md: '32px' }}
          width={{ base: '100%', lg: '78%' }}
        >
          <Flex pb={'20px'}>
            <Text
              fontSize={{ base: '24px', md: '28px' }}
              color="whiteAlpha.900"
            >
              Administartor
            </Text>
          </Flex>
          <VStack
            width={{ base: '100%', md: '80%' }}
            border={'1px'}
            borderColor="secondaryBorderColor"
            borderRadius="12px"
            py={'20px'}
            color={'whiteAlpha.800'}
          >
            {/* <Text fontSize={'20px'}>Accounts</Text> */}
            <HStack w="80%" justifyContent={'space-evenly'}>
              <Input
                placeholder="Input account address"
                borderColor="secondaryBorderColor"
                _placeholder={{ color: 'textColor' }}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <IconButton
                bg="secondaryBorderColor"
                borderRadius={'20px'}
                _hover={{
                  bg: 'primaryBlue',
                  color: 'primaryBlack',
                }}
                icon={<AddIcon />}
                onClick={handleAdd}
              />
            </HStack>
            <Divider />
            {isLoading ? (
              <Flex
                justifyContent="center"
                height="calc(100vh - 300px)"
                alignItems="center"
              >
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  size="xl"
                  color="primaryBlue"
                />
              </Flex>
            ) : (
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
                {admins.map((item, id) => (
                  <Flex
                    w={'100%'}
                    alignItems="center"
                    justifyContent="space-evenly"
                    key={id}
                    px="40px"
                    py="5px"
                    cursor="pointer"
                    _hover={{ bg: 'primaryBlack', color: 'primaryBlue' }}
                  >
                    <Box flex={1}>{item}</Box>
                    <IconButton
                      bg="secondaryBorderColor"
                      borderRadius={'20px'}
                      size="xs"
                      _hover={{
                        bg: 'primaryBlue',
                        color: 'primaryBlack',
                      }}
                      icon={<CloseIcon />}
                      onClick={() => handleDelete(item)}
                    />
                  </Flex>
                ))}
              </VStack>
            )}
          </VStack>
        </VStack>
      </Flex>
    </Layout>
  )
}

export default Admin
