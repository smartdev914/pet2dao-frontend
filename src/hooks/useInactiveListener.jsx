import { useEffect } from 'react'

import { useWeb3React } from '@web3-react/core'

import { injected } from './connectors'

const useInactiveListener = (suppress) => {
  const { active, error, activate } = useWeb3React()

  useEffect(() => {
    const { ethereum } = window
    if (ethereum && ethereum.on && !active && !error && !suppress) {
      const handleConnect = () => {
        activate(injected)
      }
      // const handleChainChanged = (chainId) => {
      //   console.log("Handling 'chainChanged' event with payload", chainId)
      //   if (chainId==97) activate(injected)
      // }
      // const handleAccountsChanged = (accounts) => {
      //   console.log("Handling 'accountsChanged' event with payload", accounts)
      //   if (accounts.length > 0) {
      //     activate(injected)
      //   }
      // }
      // const handleNetworkChanged = (networkId) => {
      //   console.log("Handling 'networkChanged' event with payload", networkId)
      //   activate(injected)
      // }

      ethereum.on('connect', handleConnect)
      // ethereum.on('chainChanged', handleChainChanged)
      // ethereum.on('accountsChanged', handleAccountsChanged)
      // ethereum.on('networkChanged', handleNetworkChanged)

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('connect', handleConnect)
          // ethereum.removeListener('chainChanged', handleChainChanged)
          // ethereum.removeListener('accountsChanged', handleAccountsChanged)
          // ethereum.removeListener('networkChanged', handleNetworkChanged)
        }
      }
    }
  }, [active, error, suppress, activate])
}

export default useInactiveListener
