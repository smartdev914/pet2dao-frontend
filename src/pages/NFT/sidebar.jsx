import React from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { VStack, Image, Text, Box } from '@chakra-ui/react'
import Logo from 'assets/LOGO2.png'
import { useSelector } from 'react-redux'

const SideBar = ({ activeId }) => {
  const navigate = useNavigate()
  const user = useSelector((state) => state.userReducer)
  return (
    <VStack
      dir="column"
      w="22%"
      border="1px"
      borderRadius="12px"
      borderColor="borderColor"
      color="white"
      display={{ base: 'none', lg: 'flex' }}
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
          NFT
        </Text>
      </VStack>
      <VStack w="100%" py="20px" fontFamily="Helvetica" cursor="pointer">
        <Box
          width="100%"
          fontSize="18px"
          px="24px"
          py="8px"
          borderLeft={activeId === 'viewnft' ? '4px' : 'none'}
          onClick={() => {
            navigate('/nft/viewnft')
          }}
        >
          NFTs
        </Box>
        {user.isManager && (
          <Box
            width="100%"
            fontSize="18px"
            px="24px"
            py="8px"
            borderLeft={activeId === 'mint' ? '4px' : 'none'}
            onClick={() => {
              navigate('/nft/mint')
            }}
          >
            Mint NFT
          </Box>
        )}
      </VStack>
    </VStack>
  )
}

SideBar.propTypes = {
  activeId: PropTypes.string.isRequired,
}

export default SideBar
