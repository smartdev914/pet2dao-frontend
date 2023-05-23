import React, { useEffect, useState } from 'react'
import { Layout, RoundButton } from 'components'
import {
  Flex,
  Text,
  VStack,
  Button,
  Badge,
  Link,
  HStack,
  useToast,
  Spinner,
} from '@chakra-ui/react'
import { ArrowBackIcon, AttachmentIcon } from '@chakra-ui/icons'
import { useParams, useNavigate, useLocation } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { useWeb3React } from '@web3-react/core'
import { daoService } from 'services/blockchain/DAOService'
import { api } from 'services/api/useApi'
import {
  getAllPrivateProposal,
  getAllPublicProposal,
} from 'store/actions/proposalAction'
import { shortWeb3Acount } from 'utils/utils'

function ProposalDetail() {
  const { proposalId } = useParams()
  const navigate = useNavigate()
  const { state } = useLocation()
  const toast = useToast()
  const proposalReducer = useSelector((state) => state.proposalReducer)
  const user = useSelector((state) => state.userReducer)
  const dispatch = useDispatch()

  const { account } = useWeb3React()
  const proposal =
    state === 'private'
      ? proposalReducer.privateProposal[parseInt(proposalId)]
      : proposalReducer.publicProposal[parseInt(proposalId)]

  const { id, isRejected, metaData, level, employee } = proposal

  const [isLoading, setIsLoading] = useState(false)
  const [voteHistory, setVoteHistory] = useState([])

  const handleVote = async () => {
    setIsLoading(true)
    const hash = await daoService.approveProposal(account, id - 1)
    console.log(hash)
    if (hash) {
      api
        .put(`/api/proposal/approve/${id}`, {
          level: parseInt(level),
          employeeId: user.id,
          proposalId: id,
        })
        .then(function (response) {
          if (response.status === 200) {
            if (state === 'public') {
              dispatch(getAllPublicProposal())
            } else {
              dispatch(getAllPrivateProposal())
            }
            getVoteHistory()
            toast({
              title: `Proposal approved Successfully.`,
              position: 'top-right',
              isClosable: true,
            })
          } else {
            toast({
              title: 'Error occurs in the Server',
              position: 'top-right',
              isClosable: true,
            })
          }
        })

        .catch(function (error) {
          console.error(error)
        })
    } else {
      toast({
        title: 'Error occurs in the BlockChain',
        position: 'top-right',
        isClosable: true,
      })
    }
    setIsLoading(false)
  }

  const handleReject = async () => {
    setIsLoading(true)
    const hash = await daoService.rejectProposal(account, id - 1)
    if (hash) {
      api
        .put(`/proposal/reject/${id}`, {
          level: parseInt(level),
          employeeId: user.id,
          proposalId: id,
        })
        .then(function (response) {
          if (response.status === 200) {
            if (state === 'public') {
              dispatch(getAllPublicProposal())
            } else {
              dispatch(getAllPrivateProposal())
            }
            getVoteHistory()
            toast({
              title: `Proposal rejected Successfully.`,
              position: 'top-right',
              isClosable: true,
            })
          } else {
            toast({
              title: 'Error occurs in the Server',
              position: 'top-right',
              isClosable: true,
            })
          }
        })
        .catch(function (error) {
          console.error(error)
        })
    } else {
      toast({
        title: 'Error occurs in the BlockChain',
        position: 'top-right',
        isClosable: true,
      })
    }
    setIsLoading(false)
  }

  const getVoteHistory = async () => {
    api
      .get(`/vote/findAllByProposal/${id}`)
      .then(function (response) {
        setVoteHistory(response.data)
      })
      .catch(function (error) {
        console.error(error)
      })
  }

  useEffect(() => {
    getVoteHistory()
  }, [])

  return (
    <Layout activeId="proposal">
      {isLoading ? (
        <Flex
          justifyContent="center"
          height="calc(100vh - 300px)"
          alignItems="center"
        >
          <Spinner
            thickness="4px"
            speed="0.65s"
            size="xl"
            color="primaryBlue"
          />
        </Flex>
      ) : (
        <Flex
          mt={{ base: '10px', md: '24px' }}
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
          <VStack
            paddingLeft={{ base: '10px', lg: '32px' }}
            gap={{ base: '5px', md: '10px' }}
            alignItems="baseline"
            w={{ base: '100%', lg: '66.66%' }}
          >
            <Button
              onClick={() => navigate(-1)}
              color="textColor"
              fontSize={{ base: '16PX', md: '20px' }}
              background="transparent"
              _hover={{ color: 'white' }}
            >
              <ArrowBackIcon />
              <Text marginLeft="4px">Back</Text>
            </Button>
            <VStack gap="10px" alignItems="baseline" paddingBottom="40px">
              <Text
                fontSize={{ base: '26px', md: '36px' }}
                fontWeight="600"
                color="white"
              >
                {metaData.title}
              </Text>
              <Flex
                w="100%"
                gap="10px"
                alignItems="center"
                justifyContent="flex-start"
              >
                <Badge
                  color="white"
                  padding="5px 10px"
                  borderRadius="20px"
                  fontSize={{ base: '8px', md: '12px' }}
                  bg={isRejected ? 'rgb(124 58 237)' : 'rgb(33 182 111)'}
                >
                  {isRejected ? 'Closed' : `Level ${parseInt(level) + 1}`}
                </Badge>
                <Text color="textColor" fontSize={{ base: '14px', md: '18px' }}>
                  {'Created By '}
                  <span
                    style={{ color: 'white' }}
                  >{`${employee.name} (${employee.department.name} ${employee.role.name})`}</span>
                </Text>
              </Flex>
              <Text
                fontSize={{ base: '20px', md: '24px' }}
                fontWeight="600"
                color="textColor"
              >
                {metaData.description}
              </Text>
              {metaData.file && (
                <Link
                  href={metaData.file}
                  isExternal
                  color="textColor"
                  fontSize={{ base: '16px', md: '20px' }}
                  background="transparent"
                  _hover={{ color: 'white' }}
                >
                  <HStack>
                    <AttachmentIcon />
                    <Text marginLeft="4px">View attached file</Text>
                  </HStack>
                </Link>
              )}
            </VStack>
            {user.approvePermission.some((item) => item.level == level) &&
              isRejected !== true && (
                <React.Fragment>
                  <RoundButton width="100%" onClick={handleReject}>
                    Reject
                  </RoundButton>
                  <RoundButton theme="purple" width="100%" onClick={handleVote}>
                    Vote
                  </RoundButton>
                </React.Fragment>
              )}
            <VStack
              borderRadius="16px"
              color="white"
              borderWidth="1px"
              borderColor="borderColor"
              w="100%"
              alignItems="baseline"
            >
              <Text
                borderWidth="1px"
                borderTopRadius="16px"
                w="100%"
                fontSize={{ base: '16px', md: '20px' }}
                paddingBottom={{ base: '8px', md: '12px' }}
                paddingTop={{ base: '12px', md: '16px' }}
                paddingX="20px"
                borderColor="borderColor"
                fontWeight="600"
              >
                Votes
              </Text>
              {voteHistory.length == 0 ? (
                <Text
                  w="100%"
                  fontSize={{ base: '16px', md: '20px' }}
                  paddingBottom="12px"
                  paddingTop="16px"
                  paddingX="20px"
                  borderColor="borderColor"
                  fontWeight="600"
                  color="textColor"
                  textAlign="center"
                >
                  No History
                </Text>
              ) : (
                voteHistory.map(({ id, level, employee, isApprove }) => (
                  <Flex
                    key={id}
                    paddingY="14px"
                    fontSize={{ base: '14px', md: '18px' }}
                    paddingX="16px"
                    w="100%"
                    justifyContent="space-between"
                  >
                    <Text>{`LEVEL-${parseInt(level) + 1}`}</Text>
                    <Text>{`${employee.name} (${employee.department.name} ${employee.role.name})`}</Text>
                    <Text>{shortWeb3Acount(employee.accountAddr)}</Text>
                    <Badge
                      color="white"
                      padding="5px 10px"
                      borderRadius="20px"
                      bg={isApprove ? 'rgb(33 182 111)' : 'rgb(124 58 237)'}
                    >
                      {isApprove ? 'Approve' : `Reject`}
                    </Badge>
                  </Flex>
                ))
              )}
            </VStack>
          </VStack>
          <VStack w={{ base: '0%', lg: '33.33%' }}></VStack>
        </Flex>
      )}
    </Layout>
  )
}

export default ProposalDetail
