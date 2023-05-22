import React from 'react'
// import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
// import { VStack } from '@chakra-ui/react'
import { BaseSideBar } from 'components'
// import Logo from 'assets/LOGO2.png'
import { ManagerSideBarItems } from 'constants'

const SideBar = ({ activeId }) => {
  const { title, items } = ManagerSideBarItems
  return (
    // <VStack
    //   dir="column"
    //   w="22%"
    //   border="1px"
    //   borderRadius="12px"
    //   borderColor="borderColor"
    //   color="white"
    //   maxH={'500px'}
    //   display={{ base: 'none', lg: 'flex' }}
    // >
    <BaseSideBar title={title} items={items} activeId={activeId} />
    // </VStack>
  )
}

SideBar.propTypes = {
  activeId: PropTypes.string.isRequired,
}

export default SideBar
