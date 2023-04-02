import React from 'react'
import { Button } from '@chakra-ui/react'
import PropTypes from 'prop-types'

const RoundButton = ({ children, onClick, theme, width }) => {
  return (
    <Button
      border="1px"
      borderColor={theme === 'purple' ? '#384aff' : 'borderColor'}
      height="46px"
      fontSize="18px"
      borderRadius="23px"
      px="22px"
      py="10px"
      bg={theme === 'purple' ? '#384aff' : 'transparent'}
      fontFamily="inherit"
      color="white"
      w={width}
      onClick={onClick}
      _hover={
        theme === 'purple' ? { bg: '#464fff' } : { borderColor: 'textColor' }
      }
    >
      {children}
    </Button>
  )
}

RoundButton.defaultProps = {
  theme: 'primary',
}

RoundButton.propTypes = {
  children: PropTypes.any.isRequired,
  onClick: PropTypes.func.isRequired,
  theme: PropTypes.string,
  width: PropTypes.string,
}

export default RoundButton
