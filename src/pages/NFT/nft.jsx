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
import SideBar from './sidebar'
import { api } from 'services/api/useApi'
import { roleNFTService } from 'services/blockchain/roleNFTService'
import { fetchNFTByID } from 'services/api/adminApi'

function ViewNFT() {
  const [pendingNFT, setPendingNFT] = useState([])
  const [approvedNFT, setApprovedNFT] = useState([])
  const [isLoading, setIsLoading] = useState([])

  const fetchPendingNFT = async () => {
    api
      .get('/nft/findAll')
      .then(function (response) {
        if (response.status === 200) {
          setPendingNFT(response.data)
        }
      })
      .catch(function (error) {
        console.error(error)
      })
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
    <Layout activeId="viewnft">
      <Flex mt={{ base: '10px', md: '24px' }}>
        <SideBar activeId="viewnft" />
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
                      <NFTCard key={nft.metaDataURI} nft={nft} />
                    ))}
                  </SimpleGrid>
                )}
              </TabPanel>
              <TabPanel>
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
                      <NFTCard key={nft.id} nft={nft} />
                    ))}
                </SimpleGrid>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>
      </Flex>
    </Layout>
  )
}

export default ViewNFT
