import React, { useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Text } from '@chakra-ui/react'

import RoundButton from 'components/RoundButton'
import { shortWeb3Acount } from 'utils/utils'
import { useConnectWallet, useSwitchChain } from 'hooks'
import config from 'config'

const ConnectWalletButton = () => {
  const connectWallet = useConnectWallet()
  const switchChain = useSwitchChain()
  const { account, chainId } = useWeb3React()
  const handleConnect = async () => {
    await connectWallet()
  }

  useEffect(() => {
    if (chainId && chainId !== config.chainId) {
      switchChain(config.chainId)
    }
  }, [chainId, switchChain])

  return (
    <React.Fragment>
      {account ? (
        <div>
          <Text fontSize="20px" color="primaryBlue">
            {shortWeb3Acount(account)}
          </Text>
        </div>
      ) : (
        <RoundButton onClick={handleConnect}>Connect wallet</RoundButton>
      )}
    </React.Fragment>
  )
}

export default ConnectWalletButton
