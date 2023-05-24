import { toast } from 'index'

const toastError = (title, errorType = '', error = '') => {
  toast({
    title: `${title}`,
    status: 'warning',
    position: 'top-right',
    isClosable: true,
  })
  if (errorType !== '') console.error(`${errorType}:`, error)
}

const toastServerError = () =>
  toast({
    title: `Error in Server.`,
    status: 'warning',
    position: 'top-right',
    isClosable: true,
  })

const toastBlockchainError = () =>
  toast({
    title: `Error in Blockchain`,
    status: 'warning',
    position: 'top-right',
    isClosable: true,
  })

const toastSuccess = (title) => {
  toast({
    title: `${title}`,
    status: 'success',
    position: 'top-right',
    isClosable: true,
  })
}

export { toastError, toastSuccess, toastServerError, toastBlockchainError }
