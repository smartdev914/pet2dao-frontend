import React, { useEffect, useState } from 'react'
import {
  Flex,
  Text,
  VStack,
  Image,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  useDisclosure,
} from '@chakra-ui/react'
import { ModalContent } from './style'
import { RoundButton } from 'components'
import PropTypes from 'prop-types'
import config from 'config'
import { fetchFromIPFS } from 'services/api/uploader'

function NFTCard({ nft, mint, burn }) {
  const [metaData, setMetaData] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    ;(async function () {
      const data = await fetchFromIPFS(nft.metaDataURI)
      setMetaData(data)
    })()
  }, [])

  const handleMint = async (event) => {
    event.stopPropagation()
    await mint(
      nft.employee.accountAddr,
      config.baseUrl + nft.metaDataURI,
      nft.employee.department.name,
      nft.employee.role.name,
      nft.id,
    )
  }

  const handleBurn = async (event) => {
    event.stopPropagation()
    burn(nft.id)
  }

  return (
    <VStack
      border={'1px'}
      bg="#282c34"
      w={{ base: '240px', sm: '250px' }}
      maxW="250px"
      borderColor="secondaryBorderColor"
      borderRadius="12px"
      p={'10px'}
      color={'whiteAlpha.800'}
      cursor="pointer"
      maxH="350px"
      minH="350px"
      onClick={onOpen}
      sx={{
        background:
          'linear-gradient(0deg, #282c34 0%, rgba(17, 0, 32, 0.5) 100%)',
        boxShadow: '0 7px 20px 5px #00000088',
        overflow: 'hidden',
      }}
      _hover={{
        border: '1px solid #ffffff44',
        boxShadow: '0 7px 50px 10px #000000aa',
        transform: 'scale(1.015)',
        filter: 'brightness(1.3)',
      }}
    >
      <VStack width={'100%'}>
        <Image h="200px" w="100%" src={metaData.image} />
      </VStack>
      <VStack width={'100%'}>
        {nft.employee !== '' && (
          <React.Fragment>
            <Text fontFamily="Robot" color="white" fontSize="25px">
              {nft.employee.name}
            </Text>
            <Flex justifyContent="space-evenly" w="100%">
              <Text>{nft.employee.department.name}</Text>
              <Text>{nft.employee.role.name}</Text>
            </Flex>
          </React.Fragment>
        )}
        {mint && (
          <RoundButton theme="purple" w="100%" onClick={handleMint}>
            Mint
          </RoundButton>
        )}
        {burn && (
          <RoundButton theme="purple" w="100%" onClick={handleBurn}>
            Burn
          </RoundButton>
        )}
      </VStack>

      <Modal
        isOpen={isOpen}
        size={{ base: 'sm', md: '3xl' }}
        onClose={onClose}
        variant="primary"
      >
        <ModalOverlay />
        <ModalContent bg="primaryBackground" overflow="hidden">
          <ModalHeader
            fontFamily="Robot"
            fontSize="28px"
            color="whiteAlpha.900"
          >
            {metaData.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex
              width={'100%'}
              borderBottom={'1px'}
              borderColor="secondaryBorderColor"
              color={'whiteAlpha.800'}
              direction={{ base: 'column', md: 'row' }}
            >
              <VStack
                width={{ base: '100%', md: '40%' }}
                px={{ base: '10px', md: '20px' }}
                py={'20px'}
              >
                <Image h="250px" objectFit="cover" src={metaData.image} />
              </VStack>
              {nft.employee !== '' && (
                <Flex
                  width={{ base: '100%', md: '60%' }}
                  px="10px"
                  py={'20px'}
                  direction="column"
                  justifyContent={'space-evenly'}
                >
                  <FormControl id="account">
                    <FormLabel
                      fontSize={{ base: '16px', md: '20px' }}
                      mb="0px"
                      color="white"
                    >
                      Department
                    </FormLabel>
                    <Text type="text">{nft.employee.department.name}</Text>
                  </FormControl>
                  <FormControl id="account">
                    <FormLabel
                      fontSize={{ base: '16px', md: '20px' }}
                      mt="10px"
                      mb="0px"
                      color="white"
                    >
                      Role
                    </FormLabel>
                    <Text type="text">{nft.employee.role.name}</Text>
                  </FormControl>
                  <FormControl id="account">
                    <FormLabel
                      fontSize={{ base: '16px', md: '20px' }}
                      mt="10px"
                      mb="0px"
                      color="white"
                    >
                      Owner
                    </FormLabel>
                    <Text type="text">{nft.employee.name}</Text>
                  </FormControl>
                  <FormControl id="account">
                    <FormLabel
                      fontSize={{ base: '16px', md: '20px' }}
                      mt="10px"
                      mb="0px"
                      color="white"
                    >
                      Account Address
                    </FormLabel>
                    <Text type="text">{nft.employee.accountAddr}</Text>
                  </FormControl>
                  <FormControl id="account">
                    <FormLabel
                      fontSize={{ base: '16px', md: '20px' }}
                      mt="10px"
                      mb="0px"
                      color="white"
                    >
                      Description
                    </FormLabel>
                    <Text type="text">{metaData.description}</Text>
                  </FormControl>
                </Flex>
              )}
            </Flex>
          </ModalBody>

          <ModalFooter>
            {mint && (
              <RoundButton theme="purple" onClick={handleMint} variant="ghost">
                Mint
              </RoundButton>
            )}
            {burn && (
              <RoundButton theme="purple" w="100%" onClick={handleBurn}>
                Burn
              </RoundButton>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  )
}

NFTCard.propTypes = {
  nft: PropTypes.object.isRequired,
  mint: PropTypes.func,
  burn: PropTypes.func,
}

export default NFTCard
