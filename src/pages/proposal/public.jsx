import { Layout } from 'components'
import { Flex, Text, VStack } from '@chakra-ui/react'
import SideBar from './sidebar'

function PublicProposal() {
  return (
    <Layout activeId="proposal">
      <Flex mt="24px">
        <SideBar activeId="public" />
        <VStack paddingLeft="32px">
          <Flex>
            <Text fontSize="28px" fontFamily="geomatik" color="whiteAlpha.900">
              Public Proposal
            </Text>
          </Flex>
        </VStack>
      </Flex>
    </Layout>
  )
}

export default PublicProposal
