import React from 'react'
import {
  Flex,
  Container,
  Image,
  Box,
  IconButton,
  Stack,
  Text,
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import Logo from 'assets/LOGO.png'

const Header = ({ activeId }) => {
  const navigate = useNavigate()
  const user = useSelector((state) => state.userReducer)

  return (
    <Flex
      as="nav"
      bg="primaryBlack"
      borderBottom="1px"
      borderColor="borderColor"
      color="white"
      py={{ base: 2 }}
      px={{ base: 4 }}
    >
      <Container maxW="1200px">
        <Flex
          flex={{ base: 1 }}
          ml={{ base: -2 }}
          alignItems="center"
          justify="space-between"
          direction={{ sm: 'row', base: 'column' }}
        >
          <Box flex={1}>
            <Image src={Logo} height={14} alt="Logo" />
          </Box>
          <Stack
            direction={'row'}
            align={'center'}
            fontFamily="Helvetica"
            color="primaryBlue"
            cursor="pointer"
          >
            <Box
              px={6}
              py={4}
              borderBottom={activeId === 'proposal' ? '2px' : 'now'}
              onClick={() => {
                navigate('/proposal/public')
              }}
            >
              <Text fontSize="18px">Proposal</Text>
            </Box>
            {user.isApproved && (
              <Box
                px={6}
                py={4}
                borderBottom={activeId === 'viewnft' ? '2px' : 'now'}
                onClick={() => {
                  navigate('/nft/viewnft')
                }}
              >
                <Text fontSize="18px">NFT</Text>
              </Box>
            )}
            {user.permission === 'admin' && (
              <Box
                px={6}
                py={4}
                borderBottom={activeId === 'manager' ? '2px' : 'now'}
                onClick={() => {
                  navigate('/admin/employee')
                }}
              >
                <Text fontSize="18px">Manager</Text>
              </Box>
            )}
          </Stack>
          <Box pl={6} py={4}>
            <Text fontSize="18px">{user.name}</Text>
          </Box>
          <IconButton
            // onClick={}
            icon={<ChevronDownIcon w={10} h={10} />}
            aria-label="Toggle Navigation"
            mx="30px"
            bg="transparent"
            border="2px"
            borderRadius="full"
            borderColor="borderColor"
            color="primaryBlue"
            _hover={{
              borderColor: 'primaryBlue',
            }}
          />
        </Flex>
      </Container>
    </Flex>
  )
}

Header.propTypes = {
  children: PropTypes.any,
  activeId: PropTypes.string.isRequired,
}

export default Header
