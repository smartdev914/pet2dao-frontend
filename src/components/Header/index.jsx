import React from 'react'
import {
  Flex,
  Container,
  Image,
  Box,
  IconButton,
  Stack,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  VStack,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react'
import { ChevronDownIcon, HamburgerIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import Logo from 'assets/LOGO.png'

const Header = ({ activeId }) => {
  const navigate = useNavigate()
  const user = useSelector((state) => state.userReducer)
  const { isOpen, onOpen, onClose } = useDisclosure()

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
        >
          <IconButton
            aria-label="Open Menu"
            size="lg"
            bg="transparent"
            borderRadius="full"
            color="primaryBlue"
            icon={<HamburgerIcon w={6} h={6} />}
            _hover={{
              bg: 'primaryBackground',
            }}
            display={{ base: 'block', lg: 'none' }}
            onClick={onOpen}
          />
          <Box flex={1}>
            <Image src={Logo} height={14} alt="Logo" />
          </Box>
          <Stack
            direction={'row'}
            align={'center'}
            fontFamily="Helvetica"
            color="primaryBlue"
            cursor="pointer"
            display={{
              base: 'none',
              lg: 'flex',
            }}
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
          <Box pl={6} py={4} display={{ base: 'none', md: 'block' }}>
            <Text fontSize="18px">{user.name}</Text>
          </Box>
          <Popover>
            <PopoverTrigger>
              <IconButton
                // onClick={}
                icon={<ChevronDownIcon w={10} h={10} />}
                aria-label="Toggle Navigation"
                mx={{ base: '0px', md: '30px' }}
                bg="transparent"
                border="2px"
                borderRadius="full"
                borderColor="borderColor"
                color="primaryBlue"
                _hover={{
                  borderColor: 'primaryBlue',
                }}
              />
            </PopoverTrigger>
            <PopoverContent
              color="white"
              bg="#1c1b20"
              borderColor="borderColor"
              p="10px"
            >
              <PopoverArrow background="primaryBlue" />
              <PopoverHeader>
                <Text fontSize="26px" fontWeight="500">
                  Profile
                </Text>
              </PopoverHeader>
              <PopoverBody>
                <VStack alignItems="baseline">
                  <Text
                    fontSize="20px"
                    fontWeight="500"
                    display={{ base: 'block', md: 'none' }}
                  >
                    {`Name: ${user.name}`}
                  </Text>
                  <Text fontSize="20px" fontWeight="500">
                    {`Department: ${user.department}`}
                  </Text>
                  <Text fontSize="20px" fontWeight="500">
                    {`Role: ${user.role}`}
                  </Text>
                  <Text fontSize="20px" fontWeight="500">
                    {`Permission: ${user.approvePermission
                      .map((item) => `LEVEL-${parseInt(item.level) + 1}`)
                      .join(', ')}`}
                  </Text>
                </VStack>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Flex>
        <Drawer
          onClose={onClose}
          placement="left"
          isOpen={isOpen}
          size={{ base: 'full', md: 'md' }}
        >
          <DrawerOverlay />
          <DrawerContent bg="primaryBlack">
            <DrawerCloseButton color="primaryBlue" />
            <DrawerHeader>
              <Image src={Logo} height={14} alt="Logo" />
            </DrawerHeader>
            <DrawerBody color="primaryBlue">
              <Accordion defaultIndex={[0]} allowToggle allowMultiple>
                <AccordionItem borderColor="primaryBlue">
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      <Text fontSize="20px" fontWeight="500">
                        Proposal
                      </Text>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4} textAlign="center">
                    <Text
                      fontSize="16px"
                      py="10px"
                      onClick={() => {
                        navigate('/proposal/public')
                      }}
                    >
                      Public Proposal
                    </Text>
                    <Text
                      fontSize="16px"
                      py="10px"
                      onClick={() => {
                        navigate('/proposal/private')
                      }}
                    >
                      Private Proposal
                    </Text>
                    <Text
                      fontSize="16px"
                      py="10px"
                      onClick={() => {
                        navigate('/proposal/new')
                      }}
                    >
                      New Proposal
                    </Text>
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem border="none">
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      <Text fontSize="20px" fontWeight="500">
                        NFT
                      </Text>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4} textAlign="center">
                    <Text
                      fontSize="16px"
                      py="10px"
                      onClick={() => {
                        navigate('/nft/viewnft')
                      }}
                    >
                      NFTs
                    </Text>
                    <Text
                      fontSize="16px"
                      py="10px"
                      onClick={() => {
                        navigate('/nft/mint')
                      }}
                    >
                      Mint NFT
                    </Text>
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem border="none">
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      <Text fontSize="20px" fontWeight="500">
                        Manager
                      </Text>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4} textAlign="center">
                    <Text
                      fontSize="16px"
                      py="10px"
                      onClick={() => {
                        navigate('/admin/employee')
                      }}
                    >
                      Employee
                    </Text>
                    <Text
                      fontSize="16px"
                      py="10px"
                      onClick={() => {
                        navigate('/admin/nft')
                      }}
                    >
                      NFT
                    </Text>
                    <Text
                      fontSize="16px"
                      py="10px"
                      onClick={() => {
                        navigate('/admin/permission')
                      }}
                    >
                      Permission
                    </Text>
                    <Text
                      fontSize="16px"
                      py="10px"
                      onClick={() => {
                        navigate('/admin/depart_role')
                      }}
                    >
                      Department & Role
                    </Text>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Container>
    </Flex>
  )
}

Header.propTypes = {
  children: PropTypes.any,
  activeId: PropTypes.string.isRequired,
}

export default Header
