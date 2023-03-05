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

export { convertToHex, shortWeb3Acount, sleep }
