import { actionTypes } from './types'
import { fetchFromIPFS } from 'services/api/uploader'
import { api } from 'services/api/useApi'

const createProposal = (employeeId, contentURL, isPublic) => {
  return async () => {
    await api
      .post(`/proposal/create`, {
        employeeId,
        contentURL,
        isPublic,
      })
      .then(function (response) {
        console.log('New Proposal Created', response)
        // dispatch(getAllPublicProposal())
      })
      .catch(function (error) {
        console.error('Proposal Creation Error:', error)
      })
  }
}

const fetchProposal = async (proposal) => {
  return new Promise((resolve) => {
    ;(async () => {
      try {
        const data = await fetchFromIPFS(proposal.contentURL)
        const _proposal = {
          ...proposal,
          metaData: { ...data },
        }
        resolve(_proposal)
      } catch (e) {
        console.log('Fetch Propoal Error:', e)
      }
    })()
  })
}

const getAllPublicProposal = () => {
  return async (dispatch) => {
    await api
      .get(`/proposal/getAllPublic`)
      .then(async (response) => {
        const promises = []
        response.data.forEach((item) => {
          promises.push(fetchProposal(item))
        })
        const result = await Promise.all(promises)
        dispatch({
          type: actionTypes.updateAllPublicProposal,
          data: result,
        })
      })
      .catch(function (error) {
        console.error('Get Public Proposal Error: ', error)
      })
  }
}

const getAllPrivateProposal = () => {
  return async (dispatch) => {
    await api
      .get(`/proposal/getAllPrivate`)
      .then(async (response) => {
        const promises = []
        response.data.forEach((item) => {
          promises.push(fetchProposal(item))
        })
        const result = await Promise.all(promises)
        dispatch({
          type: actionTypes.updateAllPrivateProposal,
          data: result,
        })
      })
      .catch(function (error) {
        console.error('Get Private Proposal Error : ', error)
      })
  }
}

export { createProposal, getAllPublicProposal, getAllPrivateProposal }
