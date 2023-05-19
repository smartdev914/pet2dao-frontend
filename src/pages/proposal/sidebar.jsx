import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { BaseSideBar } from 'components'
import { useSelector } from 'react-redux'
import { ProposalSidebarItems } from 'constants'

const SideBar = ({ activeId }) => {
  const user = useSelector((state) => state.userReducer)
  const [sidebarItems, setSidebarItems] = useState([])

  useEffect(() => {
    const restrictedItemIds = []
    if (!user.isApproved) restrictedItemIds.push('private')
    if (user.permission !== 'admin') restrictedItemIds.push('new')

    const allowedItems = ProposalSidebarItems.items.filter(
      (e) => !restrictedItemIds.includes(e.id),
    )
    setSidebarItems(allowedItems)
  }, [user])

  return (
    <BaseSideBar
      title={ProposalSidebarItems.title}
      items={sidebarItems}
      activeId={activeId}
    />
  )
}

SideBar.propTypes = {
  activeId: PropTypes.string.isRequired,
}

export default SideBar
