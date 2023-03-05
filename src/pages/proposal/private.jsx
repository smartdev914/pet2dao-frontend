import { Layout } from 'components'
import { Flex, Text, VStack } from '@chakra-ui/react'
import SideBar from './sidebar'

function PrivateProposal() {
  return (
    <Layout activeId="proposal">
      <Flex mt="24px">
        <SideBar activeId="private" />
        <VStack paddingLeft="32px">
          <Flex>
            <Text fontSize="28px" color="whiteAlpha.900">
              Private Proposal
            </Text>
          </Flex>
        </VStack>
      </Flex>
    </Layout>
  )
}

export default PrivateProposal
