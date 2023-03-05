import React from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { VStack, Image, Text, Box } from '@chakra-ui/react'
import Logo from 'assets/LOGO2.png'

const SideBar = ({ activeId }) => {
  const navigate = useNavigate()
  return (
    <VStack
      dir="column"
      w="22%"
      border="1px"
      borderRadius="12px"
      borderColor="borderColor"
      color="white"
    >
      <VStack w="100%">
        <Image name="logo" src={Logo} height="70px" my="20px" />
        <Text
          textAlign="center"
          fontWeight="bold"
          fontSize="24px"
          pt="10px"
          fontFamily="geomatikBold"
        >
          Proposal
        </Text>
      </VStack>
      <VStack w="100%" py="20px" fontFamily="Helvetica" cursor="pointer">
        <Box
          width="100%"
          fontSize="18px"
          px="24px"
          py="8px"
          borderLeft={activeId === 'public' ? '4px' : 'none'}
          color="primaryBlue"
          onClick={() => {
            navigate('/proposal')
          }}
        >
          Public Proposals
        </Box>

        <Box
          width="100%"
          fontSize="18px"
          px="24px"
          py="8px"
          borderLeft={activeId === 'private' ? '4px' : 'none'}
          onClick={() => {
            navigate('/proposal')
          }}
        >
          Private Proposals
        </Box>

        <Box width="100%" fontSize="18px" px="24px" py="8px">
          New proposal
        </Box>
        {/* <Box
          width="100%"
          fontSize="18px"
          px="24px"
          py="8px"
          borderLeft={activeId === 'nft' ? '4px' : 'none'}
          onClick={() => {
            navigate('/nft')
          }}
        >
          NFT
        </Box>
        <Box
          width="100%"
          fontSize="18px"
          px="24px"
          py="8px"
          borderLeft={activeId === 'manager' ? '4px' : 'none'}
          onClick={() => {
            navigate('/admin')
          }}
        >
          Manager
        </Box> */}
      </VStack>
    </VStack>
  )
}

SideBar.propTypes = {
  activeId: PropTypes.string.isRequired,
}

export default SideBar
