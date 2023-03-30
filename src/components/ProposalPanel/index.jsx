// import { useEffect, useState } from 'react'
import { VStack, Flex, Text, Badge } from '@chakra-ui/react'

// import { RoundButton } from 'components'
import PropTypes from 'prop-types'

function ProposalPanel({ proposal, onClick, index }) {
  const { isRejected, level, employee, metaData } = proposal
  return (
    <VStack
      border="1px"
      borderColor="borderColor"
      borderRadius="12px"
      p={'20px'}
      cursor="pointer"
      maxH="350px"
      w="100%"
      alignItems="left"
      _hover={{
        borderColor: 'secondaryBorderColor',
      }}
      onClick={() => onClick(index)}
    >
      <Flex
        color="white"
        width={'100%'}
        justifyContent="space-between"
        alignItems="center"
        fontSize="18px"
      >
        <Text>{`${employee.name} (${employee.department.name}  ${employee.role.name})`}</Text>
        <Badge
          color="white"
          padding="5px 10px"
          borderRadius="20px"
          bg={isRejected ? 'rgb(124 58 237)' : 'rgb(33 182 111)'}
        >
          {isRejected ? 'Closed' : `Level ${parseInt(level) + 1}`}
        </Badge>
      </Flex>
      <Text
        color="white"
        fontWeight="bold"
        fontSize="24px"
        overflow="hidden"
        sx={{
          display: '-webkit-box',
          '-webkit-box-orient': 'vertical',
          '-webkit-line-clamp': '2',
        }}
      >
        {metaData.title.toUpperCase()}
      </Text>
      <Text
        color="textColor"
        fontSize="20px"
        overflow="hidden"
        sx={{
          display: '-webkit-box',
          '-webkit-box-orient': 'vertical',
          '-webkit-line-clamp': '2',
        }}
      >
        {metaData.description}
      </Text>
    </VStack>
  )
}

ProposalPanel.propTypes = {
  proposal: PropTypes.object.isRequired,
  index: PropTypes.any.isRequired,
  onClick: PropTypes.func,
}

export default ProposalPanel
