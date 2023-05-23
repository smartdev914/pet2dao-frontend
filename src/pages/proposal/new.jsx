import { useState } from 'react'
import { Layout, RoundButton } from 'components'
import {
  Flex,
  Text,
  Stack,
  VStack,
  Input,
  Textarea,
  Box,
  Spinner,
  Radio,
  RadioGroup,
} from '@chakra-ui/react'
import { useWeb3React } from '@web3-react/core'
import { AttachmentIcon } from '@chakra-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import SideBar from './sidebar'
import { uploadProposaltoIPFS } from 'services/api/uploader'
import { daoService } from 'services/blockchain/DAOService'
import { api } from 'services/api/useApi'
import { createProposal } from 'store/actions/proposalAction'
import { toastSuccess, toastError } from 'utils/log'

const visibleType = {
  private: 'private',
  public: 'public',
}

function NewProposal() {
  const [fileData, setData] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [visible, setVisible] = useState(visibleType.private)
  const [isLoading, setIsLoading] = useState(false)

  const dispatch = useDispatch()
  const user = useSelector((state) => state.userReducer)
  const { account } = useWeb3React()

  const onTitleChange = (e) => {
    setTitle(e.target.value)
  }

  const onDescriptionChange = (e) => {
    setDescription(e.target.value)
  }

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader()
      let file = event.target.files[0]
      reader.onloadend = () => {
        setData({
          ...fileData,
          imagePreview: reader.result,
          file: file,
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const encrypt = async (text) => {
    try {
      const response = await api.post('/api/proposal/encrypt', {
        text: text,
      })
      return response.data.text
    } catch (e) {
      console.log(e)
    }
  }

  const handleCreate = async () => {
    if (title === '') {
      toastError(`Title is required`)
      return
    }
    const isPublic = visible === visibleType.public
    setIsLoading(true)
    const response = await uploadProposaltoIPFS(
      title,
      description,
      fileData.file,
      isPublic,
    )

    let ipfsHash = response.data.IpfsHash
    if (!isPublic) {
      ipfsHash = await encrypt(response.data.IpfsHash)
    }
    const hash = await daoService.createProposal(account, ipfsHash, isPublic)

    setIsLoading(false)

    if (hash) {
      dispatch(createProposal(user.id, ipfsHash, isPublic))
      setData('')
      setTitle('')
      setDescription('')
      setVisible(visibleType.private)
      toastSuccess(`New proposal created successfully`)
    }
  }

  return (
    <Layout activeId="proposal">
      <Flex mt={{ base: '10px', md: '24px' }}>
        <SideBar activeId="new" />
        <VStack
          px={{ base: '10px', lg: '32px' }}
          width={{ base: '100%', lg: '78%' }}
        >
          <Flex>
            <Text
              fontSize={{ base: '24px', md: '28px' }}
              color="whiteAlpha.900"
            >
              New Proposal
            </Text>
          </Flex>
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
            <Flex
              width={'100%'}
              border={'1px'}
              borderColor="borderColor"
              borderRadius="12px"
              color={'whiteAlpha.800'}
              direction={{ base: 'column', md: 'row' }}
            >
              <VStack
                px={{ base: '10px', lg: '20px' }}
                w={{ base: '100%', lg: '75%' }}
                alignItems="flex-start"
                py={{ base: '10px', md: '20px' }}
              >
                <Text fontSize={{ base: '16px', md: '20px' }} pl="30px">
                  Title
                </Text>
                <Input
                  borderColor="borderColor"
                  _focus={{
                    borderColor: 'secondaryBorderColor',
                  }}
                  _focusVisible={{
                    boxShadow: 'none',
                  }}
                  value={title}
                  onChange={onTitleChange}
                />
                <RadioGroup onChange={setVisible} value={visible}>
                  <Stack direction="row" gap="20px">
                    <Radio value={visibleType.private}>Private</Radio>
                    <Radio value={visibleType.public}>Public</Radio>
                  </Stack>
                </RadioGroup>
                <Text fontSize={{ base: '16px', md: '20px' }} pl="30px">
                  Description
                </Text>
                <Box w="100%">
                  <Textarea
                    borderColor="borderColor"
                    colo="textColor"
                    _focus={{
                      borderColor: 'secondaryBorderColor',
                    }}
                    _focusVisible={{
                      boxShadow: 'none',
                    }}
                    rows="15"
                    resize="none"
                    borderRadius="10px 10px 0px 0px"
                    value={description}
                    onChange={onDescriptionChange}
                  />
                  <label
                    htmlFor="images"
                    style={{
                      position: 'relative',
                      display: 'flex',
                      justifyContent: 'right',
                      alignItems: 'center',
                      borderColor: '#2d2d2d',
                      borderWidth: '1px',
                      width: '100%',
                      height: '50px',
                      padding: '20px',
                      borderRadius: '0px 0px 10px 10px',
                      color: '#8b949e',
                      cursor: 'pointer',
                      transition:
                        'background .2s ease-in -out, border .2s ease-in-out',
                    }}
                    className="drop-container"
                  >
                    <span className="drop-title">
                      {fileData.file ? fileData.file.name : 'Attach file'}
                    </span>
                    <AttachmentIcon ml="10px" />
                    <input
                      id="images"
                      type="file"
                      style={{
                        display: 'none',
                      }}
                      onChange={onImageChange}
                    />
                  </label>
                </Box>
              </VStack>
              <Flex
                width={{ base: '100%', md: '25%' }}
                px="20px"
                py={{ base: '20px', md: '50px' }}
                direction="column"
              >
                <RoundButton onClick={handleCreate}>Create</RoundButton>
              </Flex>
            </Flex>
          )}
        </VStack>
      </Flex>
    </Layout>
  )
}

export default NewProposal
