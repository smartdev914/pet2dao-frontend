import { Layout, RoundButton } from 'components'
import { Flex, Text, VStack, Input, Textarea, Box } from '@chakra-ui/react'
import { AttachmentIcon } from '@chakra-ui/icons'
import SideBar from './sidebar'

function NewProposal() {
  return (
    <Layout activeId="proposal">
      <Flex mt="24px">
        <SideBar activeId="new" />
        <VStack paddingLeft="32px" width={'78%'}>
          <Flex>
            <Text fontSize="28px" color="whiteAlpha.900">
              New Proposal
            </Text>
          </Flex>
          <Flex
            width={'100%'}
            border={'1px'}
            borderColor="borderColor"
            borderRadius="12px"
            color={'whiteAlpha.800'}
          >
            <VStack mx="20px" w="75%" alignItems="flex-start" py={'20px'}>
              <Text fontSize="20px" pl="30px">
                Title
              </Text>
              <Input
                borderColor="borderColor"
                _focus={{
                  borderColor: 'secondaryBorderColor',
                }}
                _focusVisible={{
                  boxShadow: 'none',
                }}
              />
              <Text fontSize="20px" pl="30px">
                Description
              </Text>
              <Box w="100%">
                <Textarea
                  borderColor="borderColor"
                  colo="textColor"
                  _focus={{
                    borderColor: 'secondaryBorderColor',
                  }}
                  _focusVisible={{
                    boxShadow: 'none',
                  }}
                  rows="15"
                  resize="none"
                  borderRadius="10px 10px 0px 0px"
                />
                <label
                  htmlFor="images"
                  style={{
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'right',
                    alignItems: 'center',
                    borderColor: '#2d2d2d',
                    borderWidth: '1px',
                    width: '100%',
                    height: '50px',
                    padding: '20px',
                    borderRadius: '0px 0px 10px 10px',
                    color: '#8b949e',
                    cursor: 'pointer',
                    transition:
                      'background .2s ease-in -out, border .2s ease-in-out',
                  }}
                  className="drop-container"
                >
                  <span className="drop-title">Attach file</span>
                  <AttachmentIcon ml="10px" />
                  <input
                    id="images"
                    type="file"
                    style={{
                      display: 'none',
                    }}
                  />
                </label>
              </Box>
            </VStack>
            <Flex width={'25%'} mx="20px" py={'50px'} direction="column">
              <RoundButton>Mint</RoundButton>
            </Flex>
          </Flex>
        </VStack>
      </Flex>
    </Layout>
  )
}

export default NewProposal
