import { chakra, Box as ContainerUI } from '@chakra-ui/react'

export const Container = chakra(ContainerUI, {
  baseStyle: {
    background: 'primaryBackground',
    minH: '100vh',
  },
})
