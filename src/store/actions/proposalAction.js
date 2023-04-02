import axios from 'axios'
import { actionTypes } from './types'
import config from 'config/index'
import { fetchFromIPFS } from 'services/api/uploader'

const createProposal = (employeeId, contentURL, isPublic) => {
  const token = JSON.parse(localStorage.getItem('token'))

  return async () => {
    const options = {
      method: 'POST',
      url: `${config.apiEndpoint}/api/proposal/create`,
      headers: {
        'content-type': 'application/json',
        Authorization: token,
      },
      data: {
        employeeId,
        contentURL,
        isPublic,
      },
    }
    await axios
      .request(options)
      .then(function (response) {
        console.log(response)
        // dispatch(getAllPublicProposal())
      })
      .catch(function (error) {
        console.error(error)
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
        console.log(e)
      }
    })()
  })
}

const getAllPublicProposal = () => {
  return async (dispatch) => {
    const options = {
      method: 'GET',
      url: `${config.apiEndpoint}/api/proposal/getAllPublic`,
      headers: {
        'content-type': 'application/json',
      },
    }
    await axios
      .request(options)
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
        console.error(error)
      })
  }
}

const getAllPrivateProposal = () => {
  return async (dispatch) => {
    const token = JSON.parse(localStorage.getItem('token'))

    const options = {
      method: 'GET',
      url: `${config.apiEndpoint}/api/proposal/getAllPrivate`,
      headers: {
        'content-type': 'application/json',
        Authorization: token,
      },
    }
    await axios
      .request(options)
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
        console.error(error)
      })
  }
}

export { createProposal, getAllPublicProposal, getAllPrivateProposal }
