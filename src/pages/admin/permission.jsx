import { Layout } from 'components'
import { Flex, Text, VStack } from '@chakra-ui/react'
import SideBar from './sidebar'

function Permission() {
  return (
    <Layout activeId="manager">
      <Flex mt="24px">
        <SideBar activeId="permission" />
        <VStack paddingLeft="32px">
          <Flex>
            <Text fontSize="28px" color="whiteAlpha.900">
              Permission
            </Text>
          </Flex>
        </VStack>
      </Flex>
    </Layout>
  )
}

export default Permission
