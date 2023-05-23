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

const toastServerError = () => {}

const toastBlockchainError = () => {}

const toastSuccess = (title) => {
  toast({
    title: `${title}`,
    status: 'warning',
    position: 'top-right',
    isClosable: true,
  })
}

export { toastError, toastSuccess, toastServerError, toastBlockchainError }
