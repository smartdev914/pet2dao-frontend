import { useState, useEffect } from 'react'
import { Layout, NFTCard } from 'components'
import {
  Flex,
  Text,
  VStack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  SimpleGrid,
  Spinner,
} from '@chakra-ui/react'
import { useWeb3React } from '@web3-react/core'
import SideBar from './sidebar'
import { api } from 'services/api/useApi'
import { roleNFTService } from 'services/blockchain/roleNFTService'
import { toastSuccess, toastError, toastBlockchainError } from 'utils/log'
import { updateDBNFT, fetchNFTByID } from 'services/api/adminApi'

function NFT() {
  const [pendingNFT, setPendingNFT] = useState([])
  const [approvedNFT, setApprovedNFT] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const { account } = useWeb3React()

  const fetchPendingNFT = async () => {
    api
      .get('/nft/findAll')
      .then(function (response) {
        if (response.status === 200) {
          setPendingNFT(response.data)
        }
      })
      .catch(function (error) {
        console.error('Fetch Pending NFT Error:', error)
      })
  }

  const handleMint = async (to, _tokenURI, _department, _role, nftId) => {
    setIsLoading(true)
    const hash = await roleNFTService.mintNFT(
      account,
      to,
      _tokenURI,
      _department,
      _role,
    )
    if (hash) {
      updateDBNFT(nftId, { isApproved: true })
      fetchPendingNFT()
      fetchMintedNFT()
    } else {
      toastBlockchainError()
    }
    setIsLoading(false)
  }

  const handleBurn = async (tokenId) => {
    if (!tokenId || tokenId < 1) {
      toastError('Invalid Token Id')
      return
    }

    setIsLoading(true)
    const hash = await roleNFTService.burnNFT(account, tokenId)
    if (hash) {
      await fetchMintedNFT()
      toastSuccess(`NFT is successfully burnt.`)
    } else {
      console.log('Hash', hash)
      toastBlockchainError()
    }
    setIsLoading(false)
  }

  const fetchMintedNFT = async () => {
    setIsLoading(true)
    const count = await roleNFTService.getTotalTokenCount()
    const promises = []
    for (let i = 1; i <= count; i++) {
      promises.push(fetchNFTByID(i))
    }
    const result = await Promise.allSettled(promises)
    const _approvedNFT = result
      .filter((item) => item.status === 'fulfilled')
      .map((item) => item.value)

    setApprovedNFT(_approvedNFT)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchPendingNFT()
    fetchMintedNFT()
  }, [])

  return (
    <Layout activeId="manager">
      <Flex mt={{ base: '10px', md: '24px' }}>
        <SideBar activeId="nft" />
        <VStack
          px={{ base: '10px', md: '32px' }}
          width={{ base: '100%', lg: '78%' }}
        >
          <Flex pb={'20px'} direction="column">
            <Text
              fontSize={{ base: '24px', md: '28px' }}
              textAlign={'center'}
              color="whiteAlpha.900"
            >
              NFT
            </Text>
          </Flex>
          <Tabs isFitted variant="unstyled" w="100%" color="whiteAlpha.900">
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
                Approved
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
                Pending
              </Tab>
            </TabList>
            <TabPanels
              border="1px"
              borderColor="secondaryBorderColor"
              borderTop="none"
            >
              <TabPanel>
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
                  <SimpleGrid
                    columns={3}
                    spacing={10}
                    maxH="calc(100vh - 300px)"
                    h="calc(100vh - 300px)"
                    p="10px"
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
                    {approvedNFT.map((nft) => (
                      <NFTCard
                        key={nft.metaDataURI}
                        nft={nft}
                        burn={handleBurn}
                      />
                    ))}
                  </SimpleGrid>
                )}
              </TabPanel>
              <TabPanel>
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
                  <SimpleGrid
                    columns={3}
                    spacing={10}
                    maxH="calc(100vh - 300px)"
                    h="calc(100vh - 300px)"
                    p="10px"
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
                    {pendingNFT
                      .filter((nft) => !nft.isApproved)
                      .map((nft) => (
                        <NFTCard key={nft.id} nft={nft} mint={handleMint} />
                      ))}
                  </SimpleGrid>
                )}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>
      </Flex>
    </Layout>
  )
}

export default NFT
