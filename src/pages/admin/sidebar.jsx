import React from 'react'
import PropTypes from 'prop-types'
import { BaseSideBar } from 'components'
import { ManagerSideBarItems } from 'constants'

const SideBar = ({ activeId }) => {
  const { title, items } = ManagerSideBarItems
  return <BaseSideBar title={title} items={items} activeId={activeId} />
}

SideBar.propTypes = {
  activeId: PropTypes.string.isRequired,
}

export default SideBar
