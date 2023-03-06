import { useEffect, useState } from 'react'
import { Layout, ProposalPanel } from 'components'
import { Flex, Text, VStack } from '@chakra-ui/react'
import SideBar from './sidebar'
import { daoService } from 'services/blockchain/DAOService'
import { fetchFromIPFS } from 'services/api/uploader'
import { findOneByAccountAddr } from 'store/actions/employeeAction'

function PublicProposal() {
  const [proposal, setProposal] = useState([])
  const fetchProposal = async (proposal) => {
    return new Promise((resolve) => {
      ;(async () => {
        try {
          const data = await fetchFromIPFS(proposal.contentURL)
          const _employee = await findOneByAccountAddr(proposal.creator)
          const _proposal = {
            ...proposal,
            metaData: { ...data },
            employee: _employee,
          }
          resolve(_proposal)
        } catch (e) {
          console.log(e)
        }
      })()
    })
  }

  const getAllProposal = async () => {
    const totalCount = await daoService.getProposalCount()
    const _proposals = await daoService.getAllProposal(0, totalCount)
    const publicProposal = _proposals.filter((item) => item.isPublic)
    const promises = []

    for (let i = 0; i < publicProposal.length; i++) {
      promises.push(fetchProposal(publicProposal[i]))
    }
    const result = await Promise.all(promises)
    console.log(result)
    setProposal(result)
  }

  useEffect(() => {
    getAllProposal()
  }, [])
  return (
    <Layout activeId="proposal">
      <Flex mt="24px">
        <SideBar activeId="public" />
        <VStack
          paddingLeft="32px"
          pr="20px"
          pb="30px"
          w="100%"
          maxH="calc(100vh - 150px)"
          overflowY="scroll"
          sx={{
            '&::-webkit-scrollbar': {
              width: '16px',
              borderRadius: '8px',
              backgroundColor: `rgba(40, 40, 40, 0.5)`,
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: `rgba(20, 20, 20, 0.8)`,
            },
          }}
        >
          <Flex>
            <Text fontSize="28px" color="whiteAlpha.900">
              Public Proposal
            </Text>
          </Flex>
          {proposal.map((item) => (
            <ProposalPanel key={item.contentURL} proposal={item} />
          ))}
        </VStack>
      </Flex>
    </Layout>
  )
}

export default PublicProposal
