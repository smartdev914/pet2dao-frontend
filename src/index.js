import React from 'react'
import ReactDOM from 'react-dom/client'
import reportWebVitals from './reportWebVitals'
import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import './index.css'

import {
  PublicProposal,
  PrivateProposal,
  NewProposal,
  ProposalDetail,
  MyNFT,
  MintNFT,
  DepartmentRole,
  Employee,
  NFT,
  Permission,
  DashBoard,
  Signup,
} from 'pages'
import { theme } from 'theme'
import { store } from 'store'

function getLibrary(provider) {
  var library

  if (provider?.chainType === 'hmy') {
    library = provider.blockchain
  } else {
    library = new Web3Provider(provider)
    library.pollingInterval = 8000
  }

  return library
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <ChakraProvider theme={theme}>
        <Provider store={store}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<DashBoard />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/admin/employee" element={<Employee />} />
              <Route path="/admin/nft" element={<NFT />} />
              <Route path="/admin/permission" element={<Permission />} />
              <Route path="/admin/depart_role" element={<DepartmentRole />} />
              <Route path="/nft/mynft" element={<MyNFT />} />
              <Route path="/nft/mint" element={<MintNFT />} />
              <Route path="/proposal/public" element={<PublicProposal />} />
              <Route path="/proposal/private" element={<PrivateProposal />} />
              <Route path="/proposal/new" element={<NewProposal />} />
              <Route
                path="/proposal/detail/:proposalId"
                element={<ProposalDetail />}
              />
            </Routes>
          </BrowserRouter>
        </Provider>
      </ChakraProvider>
    </Web3ReactProvider>
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
