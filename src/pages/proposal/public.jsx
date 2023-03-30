import { useEffect } from 'react'
import { Layout, ProposalPanel } from 'components'
import { Flex, Text, VStack } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import SideBar from './sidebar'
import { useNavigate } from 'react-router'
// import { daoService } from 'services/blockchain/DAOService'
import { getAllPublicProposal } from 'store/actions/proposalAction'

function PublicProposal() {
  // const [proposal, setProposal] = useState([])
  const dispatch = useDispatch()
  const publicProposal = useSelector(
    (state) => state.proposalReducer,
  ).publicProposal

  const navigate = useNavigate()

  const handleClick = (index) => {
    console.log(publicProposal[index])
    navigate(`/proposal/detail/${index}`, { viewType: 'public' })
  }

  useEffect(() => {
    dispatch(getAllPublicProposal())
  }, [dispatch])

  return (
    <Layout activeId="proposal">
      <Flex mt="24px">
        <SideBar activeId="public" />
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
              Public Proposal
            </Text>
          </Flex>
          {publicProposal.map((item, index) => (
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

export default PublicProposal
