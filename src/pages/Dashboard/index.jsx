import React, { useEffect } from 'react'
import { Center, Image, VStack } from '@chakra-ui/react'
import { useWeb3React } from '@web3-react/core'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import ConnectWalletButton from 'components/ConnectWalletButton'
import Logo from 'assets/LOGO.png'
import { signIn } from 'store/actions/userAction'
import { getAllDepartment, getAllRole } from 'store/actions/employeeAction'

const DashBoard = () => {
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const { account } = useWeb3React()

  useEffect(() => {
    if (account) {
      dispatch(getAllDepartment())
      dispatch(getAllRole())
      dispatch(signIn(account, navigate))
    }
  }, [account])

  return (
    <Center bg="primaryBlack" minH="100vh">
      <VStack>
        <Image src={Logo} width={{ md: '60%', base: '100%' }} alt="Logo" />
        <ConnectWalletButton />
      </VStack>
    </Center>
  )
}

export default DashBoard
