import { blockchainService } from 'services/blockchain/blockchainService'
const convertToHex = (value) => {
  return ['0x', value.toString(16)].join('')
}

function shortWeb3Acount(currentAccount) {
  if (currentAccount) {
    return currentAccount
      .slice(0, 6)
      .concat('...')
      .concat(
        currentAccount.slice(currentAccount.length - 4, currentAccount.length),
      )
  } else {
    return false
  }
}

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

const validateName = (name) => {
  if (!name.match(/^[a-zA-Z ]*$/)) return 'Please input letters and space only'
  return null
}

const validateEthAddr = (address) => {
  if (!blockchainService.checkIsAddress(address))
    return 'Addres format is not valid'
  return null
}

export { convertToHex, shortWeb3Acount, sleep, validateName, validateEthAddr }
