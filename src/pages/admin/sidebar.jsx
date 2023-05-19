import React from 'react'
// import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
// import { VStack, Image, Text, Box } from '@chakra-ui/react'
import { BaseSideBar } from 'components'
// import Logo from 'assets/LOGO2.png'
import { ManagerSideBarItems } from 'constants'

const SideBar = ({ activeId }) => {
  const { title, items } = ManagerSideBarItems
  return <BaseSideBar title={title} items={items} activeId={activeId} />
}

SideBar.propTypes = {
  activeId: PropTypes.string.isRequired,
}

export default SideBar
