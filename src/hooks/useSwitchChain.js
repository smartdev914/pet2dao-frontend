import { convertToHex } from 'utils/utils'

function useSwitchChain() {
  return (chainId) => {
    ;(async function () {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: convertToHex(chainId) }],
      })
    })()
  }
}

export default useSwitchChain
