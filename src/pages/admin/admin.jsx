import { useEffect, useState } from 'react'
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
  useToast,
} from '@chakra-ui/react'
import { AddIcon, CloseIcon } from '@chakra-ui/icons'
import SideBar from './sidebar'
import { DEFAULT_ADMIN_ROLE } from 'constants'
import { roleNFTService } from 'services/blockchain/roleNFTService'
import { useWeb3React } from '@web3-react/core'

function Admin() {
  const [address, setAddress] = useState('')
  const [admins, setAdmins] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const { account } = useWeb3React()

  const toast = useToast()
  const fetchAddressByID = async (ID) => {
    return new Promise((resolve, reject) => {
      ;(async () => {
        try {
          const accountAddr = await roleNFTService.getRoleMember(
            DEFAULT_ADMIN_ROLE,
            ID,
          )
          console.log(accountAddr)

          resolve(accountAddr)
        } catch (e) {
          reject()
        }
      })()
    })
  }

  const fetchAddress = async () => {
    setIsLoading(true)
    const count = await roleNFTService.getRoleMemberCount(DEFAULT_ADMIN_ROLE)
    console.log(count)
    const promises = []
    for (let i = 0; i < count; i++) {
      promises.push(fetchAddressByID(i))
    }
    const result = await Promise.allSettled(promises)
    const _address = result.map((item) => item.value)
    console.log(_address)

    setAdmins(_address)
    setIsLoading(false)
  }

  const handleAdd = async () => {
    if (address === '') {
      toast({
        title: `Please input the account address.`,
        position: 'top-right',
        isClosable: true,
      })
      return
    }

    const hash = await roleNFTService.addAdmin(account, address)
    if (hash) {
      fetchAddress()
      toast({
        title: `New address is added successfully`,
        position: 'top-right',
        isClosable: true,
      })
    } else {
      toast({
        title: 'Error occurs in the BlockChain',
        position: 'top-right',
        isClosable: true,
      })
    }
  }
  const handleDelete = async (_address) => {
    const hash = await roleNFTService.revokeRole(
      account,
      DEFAULT_ADMIN_ROLE,
      _address,
    )
    if (hash) {
      fetchAddress()
      toast({
        title: `Address is deleted successfully`,
        position: 'top-right',
        isClosable: true,
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
