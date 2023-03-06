import React, { useState, useEffect } from 'react'
import { Flex, Text, VStack, FormControl, FormLabel } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import SideBar from './sidebar'
import { Layout } from 'components'
import { client } from 'services/api/useApi'

function MyNFT() {
  const user = useSelector((state) => state.userReducer)
  const [isApproved, setIsApproved] = useState(null)

  const fetchNFTAPI = async () => {
    const token = JSON.parse(localStorage.getItem('token'))
    const customOption = {
      headers: {
        Authorization: token,
      },
    }
    client(`/api/nft/findOneByUserID/${user.id}`, 'GET', customOption)
      .then(function (response) {
        if (response.data) {
          setIsApproved(response.data.isApproved)
        }
      })
      .catch(function (error) {
        console.error(error)
      })
  }

  useEffect(() => {
    fetchNFTAPI()
  }, [])

  return (
    <Layout activeId="nft">
      <Flex mt="24px">
        <SideBar activeId="mynft" />
        <VStack paddingLeft="32px" width={'78%'}>
          <Flex pb={'20px'}>
            <Text fontSize="28px" color="whiteAlpha.900">
              My NFT
            </Text>
          </Flex>
          <Flex
            width={'100%'}
            border={'1px'}
            borderColor="secondaryBorderColor"
            borderRadius="12px"
            color={'whiteAlpha.800'}
          >
            {isApproved && (
              <React.Fragment>
                <VStack width={'50%'} mx="20px" py={'20px'}>
                  <img
                    // src={mydata.imagePreview}
                    style={{
                      margin: '10px',
                      height: '100%',
                    }}
                  />
                </VStack>
                <Flex
                  width={'50%'}
                  mx="20px"
                  py={'20px'}
                  direction="column"
                  justifyContent={'space-evenly'}
                >
                  <FormControl id="account">
                    <FormLabel fontSize="20px" color="white">
                      Department
                    </FormLabel>
                    <Text type="text">{user.department}</Text>
                  </FormControl>
                  <FormControl id="account">
                    <FormLabel fontSize="20px" color="white">
                      Role
                    </FormLabel>
                    <Text type="text">{user.role}</Text>
                  </FormControl>
                  <FormControl id="account">
                    <FormLabel fontSize="20px" color="white">
                      Account
                    </FormLabel>
                    {/* <Text type="text">{account}</Text> */}
                  </FormControl>
                </Flex>
              </React.Fragment>
            )}
          </Flex>
        </VStack>
      </Flex>
    </Layout>
  )
}

export default MyNFT
