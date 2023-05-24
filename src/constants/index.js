const DEFAULT_ADMIN_ROLE =
  '0x0000000000000000000000000000000000000000000000000000000000000000'
const HeaderItems = [
  {
    title: 'Proposal',
    subtitles: [
      { text: 'Public Proposal', path: '/proposal/public' },
      { text: 'Private Proposal', path: '/proposal/private' },
      { text: 'New Proposal', path: '/proposal/new' },
    ],
  },
  {
    title: 'NFT',
    subtitles: [
      { text: 'NFTs', path: '/nft/viewnft' },
      { text: 'Mint NFT', path: '/nft/mint' },
    ],
  },
  {
    title: 'Manager',
    subtitles: [
      { text: 'Employee', path: '/admin/employee' },
      { text: 'NFT', path: '/admin/nft' },
      { text: 'Permission', path: '/admin/permission' },
      { text: 'Department & Role', path: '/admin/depart_role' },
      { text: 'Administrator', path: '/admin/admin' },
    ],
  },
]

const ManagerSideBarItems = {
  title: 'Administrator',
  items: [
    {
      id: 'employee',
      path: '/admin/employee',
      text: 'Employee',
    },
    {
      id: 'nft',
      path: '/admin/nft',
      text: 'NFT',
    },
    {
      id: 'permission',
      path: '/admin/permission',
      text: 'Permission',
    },
    {
      id: 'depart_role',
      path: '/admin/depart_role',
      text: 'Department & Role',
    },
    {
      id: 'admin',
      path: '/admin/admin',
      text: 'Administrator',
    },
  ],
}

const ProposalSidebarItems = {
  title: 'Proposal',
  items: [
    {
      id: 'public',
      path: '/proposal/public',
      text: 'Public Proposal',
    },
    {
      id: 'private',
      path: '/proposal/private',
      text: 'Private Proposal',
    },
    {
      id: 'new',
      path: '/proposal/new',
      text: 'New proposal',
    },
  ],
}

export {
  DEFAULT_ADMIN_ROLE,
  HeaderItems,
  ManagerSideBarItems,
  ProposalSidebarItems,
}
