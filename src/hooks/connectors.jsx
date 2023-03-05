import config from 'config'

import { InjectedConnector } from '@web3-react/injected-connector'

export const injected = new InjectedConnector({
  supportedchainIds: [config.chainId],
})

export const connectorsByName = {
  Injected: injected,
}

export const connectorName = 'Injected'
