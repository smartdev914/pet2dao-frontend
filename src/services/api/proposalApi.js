import { api } from './useApi'
const encrypt = async (text) => {
  try {
    const response = await api.post('/proposal/encrypt', {
      text: text,
    })
    return response.data.text
  } catch (e) {
    console.log('Encrypt Error:', e)
  }
}

export { encrypt }
