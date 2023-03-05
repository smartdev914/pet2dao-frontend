import { connectorName, connectorsByName } from 'hooks/connectors'

import { useWeb3React } from '@web3-react/core'

function useConnectWallet() {
  const { activate } = useWeb3React()
  return () => {
    activate(connectorsByName[connectorName])
  }
}

export default useConnectWallet
