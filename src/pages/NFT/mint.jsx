import { useState } from 'react'
import { Layout, RoundButton } from 'components'
import {
  Flex,
  Text,
  VStack,
  FormControl,
  FormLabel,
  Spinner,
} from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import SideBar from './sidebar'
import { useWeb3React } from '@web3-react/core'
import { uploadIPFS } from 'services/api/uploader'
import { api } from 'services/api/useApi'
import { useNavigate } from 'react-router-dom'
import { toastError, toastSuccess } from 'utils/log'

function MintNFT() {
  const [mydata, setData] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const user = useSelector((state) => state.userReducer)
  const { account } = useWeb3React()
  const navigate = useNavigate()

  const requestMint = async () => {
    if (!mydata.file) {
      toastError(`Please select image.`)
      return
    }

    if (user.permission === 'admin') {
      toastError(`You are administrator, you don't need to mint`)
      return
    } else if (!user.isManager) {
      toastError(`You are not manager`)
      return
    }

    setIsLoading(true)
    const ipfsHash = await uploadIPFS(user, mydata.file)
    setIsLoading(false)
    api
      .post('/nft/create', {
        metaDataURI: ipfsHash.data.IpfsHash,
        employeeId: user.id,
        isApproved: false,
      })
      .then(function (response) {
        console.log(response)
        if (response.status === 200) {
          toastSuccess(`Minting request is made successfully`)
          navigate('/nft/viewnft')
        }
      })
      .catch(function (error) {
        console.error(error)
      })
  }

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader()
      let file = event.target.files[0]
      console.log(file)
      reader.onloadend = () => {
        setData({
          ...mydata,
          imagePreview: reader.result,
          file: file,
        })
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Layout activeId="nft">
      <Flex mt={{ base: '10px', md: '24px' }}>
        <SideBar activeId="mint" />
        <VStack
          px={{ base: '10px', lg: '32px' }}
          width={{ base: '100%', lg: '78%' }}
        >
          <Flex pb={'20px'}>
            <Text
              fontSize={{ base: '24px', md: '28px' }}
              color="whiteAlpha.900"
            >
              Mint NFT
            </Text>
          </Flex>
          {isLoading ? (
            <Flex justifyContent="center" height="100%" alignItems="center">
              <Spinner
                thickness="4px"
                speed="0.65s"
                size="xl"
                color="primaryBlue"
              />
            </Flex>
          ) : (
            <Flex
              width={'100%'}
              border={'1px'}
              borderColor="secondaryBorderColor"
              borderRadius="12px"
              color={'whiteAlpha.800'}
              direction={{ base: 'column', md: 'row' }}
            >
              <VStack width={{ base: '100%', md: '50%' }} px="20px" py={'20px'}>
                <label
                  htmlFor="images"
                  style={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: '300px',
                    padding: '20px',
                    borderRadius: '10px',
                    border: '2px dashed #555',
                    color: '#444',
                    cursor: 'pointer',
                    transition:
                      'background .2s ease-in -out, border .2s ease-in-out',
                  }}
                  className="drop-container"
                >
                  {!mydata.imagePreview && (
                    <span className="drop-title">Select image</span>
                  )}
                  <input
                    id="images"
                    type="file"
                    style={{
                      display: 'none',
                    }}
                    onChange={onImageChange}
                  />
                  <img
                    src={mydata.imagePreview}
                    style={{
                      margin: '10px',
                      height: '100%',
                    }}
                  />
                </label>
              </VStack>
              <Flex
                width={{ base: '100%', md: '50%' }}
                px="20px"
                py={'20px'}
                direction="column"
                justifyContent={'space-evenly'}
                gap="20px"
              >
                <FormControl id="account">
                  <FormLabel
                    fontSize={{ base: '16px', md: '20px' }}
                    color="white"
                  >
                    Department
                  </FormLabel>
                  <Text type="text">{user.department}</Text>
                </FormControl>
                <FormControl id="account">
                  <FormLabel
                    fontSize={{ base: '16px', md: '20px' }}
                    color="white"
                  >
                    Role
                  </FormLabel>
                  <Text type="text">{user.role}</Text>
                </FormControl>
                <FormControl id="account">
                  <FormLabel
                    fontSize={{ base: '16px', md: '20px' }}
                    color="white"
                  >
                    Account
                  </FormLabel>
                  <Text type="text">{account}</Text>
                </FormControl>
                <RoundButton onClick={requestMint}>Request Mint</RoundButton>
              </Flex>
            </Flex>
          )}
        </VStack>
      </Flex>
    </Layout>
  )
}

export default MintNFT
