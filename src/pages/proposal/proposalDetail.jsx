import { Layout } from 'components'
import { Flex, Text, VStack } from '@chakra-ui/react'
import { useParams, useNavigate, useLocation } from 'react-router'

function ProposalDetail() {
  const params = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  console.log(params, location)
  return (
    <Layout activeId="proposal">
      <Flex mt="24px">
        <VStack paddingLeft="32px">
          <Flex>
            <Text onClick={() => navigate(-1)}>Back</Text>
            <Text fontSize="28px" color="whiteAlpha.900">
              Detail
            </Text>
          </Flex>
        </VStack>
      </Flex>
    </Layout>
  )
}

export default ProposalDetail
