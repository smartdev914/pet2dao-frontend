import React, { useEffect } from 'react'
import Header from 'components/Header'
import PropTypes from 'prop-types'
import { useWeb3React } from '@web3-react/core'
import { useNavigate } from 'react-router-dom'
import { Box } from '@chakra-ui/react'
import { Container } from './styles'

const Layout = ({ children, activeId }) => {
  const { account } = useWeb3React()
  const navigate = useNavigate()
  useEffect(() => {
    if (!account) {
      navigate('/')
    }
  }, [account])
  return (
    <Container>
      <Header activeId={activeId} />
      <Box maxW="1200px" m="auto">
        {children}
      </Box>
    </Container>
  )
}

Layout.propTypes = {
  children: PropTypes.any,
  activeId: PropTypes.string.isRequired,
}

export default Layout
