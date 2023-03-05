import axios from 'axios'
import config from 'config'

export const _uploadPinata = async (file) => {
  var formData = new FormData()
  formData.append('file', file)

  try {
    let response = await axios.post(
      'https://api.pinata.cloud/pinning/pinFileToIPFS',
      formData,
      {
        maxBodyLength: 'Infinity', // this is needed to prevent axios from erroring out with large files
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          // eslint-disable-next-line camelcase
          pinata_api_key: config.pinataApiKey,
          // eslint-disable-next-line camelcase
          pinata_secret_api_key: config.pinataSecretApiKey,
        },
      },
    )
    const ImgHash = config.baseUrl + response.data.IpfsHash
    return ImgHash
  } catch (e) {
    console.log(e)
    return
  }
}

export const createAndUploadNFTMetaData = async (user, ipfsUrl, imgName) => {
  let data = {
    name: `Pet2DAO-${user.id}`,
    description: 'This is the NFT of employee in Oncotelic',
    image: ipfsUrl,
    // eslint-disable-next-line camelcase
    external_link: 'https://www.oncotelic.com/',
    // eslint-disable-next-line camelcase
    background_color: 'ffffff',
    attributes: [
      {
        // eslint-disable-next-line camelcase
        trait_type: 'Lottery Category',
        value: 'Identity Card',
      },
      {
        // eslint-disable-next-line camelcase
        trait_type: 'Current Status',
        value: 'Minted',
      },
      {
        // eslint-disable-next-line camelcase
        trait_type: 'Type',
        value: 'Ticket',
      },
      {
        // eslint-disable-next-line camelcase
        trait_type: 'Prize Type',
        value: 'Unknown',
      },
      {
        // eslint-disable-next-line camelcase
        trait_type: 'Brand',
        value: 'Pet2DAO',
      },
      {
        // eslint-disable-next-line camelcase
        trait_type: 'Permission',
        value: 'Approver',
      },
      {
        // eslint-disable-next-line camelcase
        trait_type: 'Level',
        value: 1,
      },
    ],
  }

  let pinataData = {
    pinataMetadata: {
      name: imgName + '.json',
      keyvalues: {},
    },
    pinataContent: data,
  }

  let response = await axios.post(
    'https://api.pinata.cloud/pinning/pinJSONToIPFS',
    pinataData,
    {
      headers: {
        // eslint-disable-next-line camelcase
        pinata_api_key: config.pinataApiKey,
        // eslint-disable-next-line camelcase
        pinata_secret_api_key: config.pinataSecretApiKey,
      },
    },
  )
  return response
}

export const uploadIPFS = async (user, file) => {
  const imgHash = await _uploadPinata(file)
  const metaDataHash = await createAndUploadNFTMetaData(
    user,
    imgHash,
    file.name,
  )
  return metaDataHash
}

export const uploadProposaltoIPFS = async (title, description, file) => {
  console.log(title, description, file)
}
