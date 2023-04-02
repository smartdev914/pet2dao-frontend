import { useEffect } from 'react'
import { Layout, ProposalPanel } from 'components'
import { Flex, Text, VStack } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import SideBar from './sidebar'
import { useNavigate } from 'react-router'
import { getAllPrivateProposal } from 'store/actions/proposalAction'

function PrivateProposal() {
  const dispatch = useDispatch()
  const PrivateProposal = useSelector(
    (state) => state.proposalReducer,
  ).privateProposal

  const navigate = useNavigate()

  const handleClick = (index) => {
    navigate(`/proposal/detail/${index}`, { state: 'private' })
  }

  useEffect(() => {
    dispatch(getAllPrivateProposal())
  }, [dispatch])

  return (
    <Layout activeId="proposal">
      <Flex mt="24px">
        <SideBar activeId="private" />
        <VStack
          paddingLeft="32px"
          pr="20px"
          pb="30px"
          width={'78%'}
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
              Private Proposal
            </Text>
          </Flex>
          {PrivateProposal.map((item, index) => (
            <ProposalPanel
              key={item.contentURL}
              proposal={item}
              index={index}
              onClick={handleClick}
            />
          ))}
        </VStack>
      </Flex>
    </Layout>
  )
}

export default PrivateProposal
