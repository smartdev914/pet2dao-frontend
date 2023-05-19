import React from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { VStack, Image, Text, Box } from '@chakra-ui/react'
import Logo from 'assets/LOGO2.png'

const BaseSideBar = ({ title, items, activeId }) => {
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
          {title}
        </Text>
      </VStack>
      <VStack w="100%" py="20px" fontFamily="Helvetica" cursor="pointer">
        {items.map(({ id, path, text }) => (
          <Box
            key={id + text}
            width="100%"
            fontSize="18px"
            px="24px"
            py="8px"
            borderLeft={activeId === id ? '4px' : 'none'}
            color="primaryBlue"
            onClick={() => {
              navigate(path)
            }}
          >
            {text}
          </Box>
        ))}
      </VStack>
    </VStack>
  )
}

BaseSideBar.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      path: PropTypes.string,
      text: PropTypes.string,
    }),
  ),
  activeId: PropTypes.string.isRequired,
}

export default BaseSideBar
