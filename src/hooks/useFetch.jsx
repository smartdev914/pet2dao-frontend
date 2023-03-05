import axios from 'axios'
import { useEffect, useState } from 'react'

const useFetch = (url) => {
  const [data, setdata] = useState(null)
  const [loading, setloading] = useState(true)
  const [error, seterror] = useState('')
  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setdata(response.data)
        setloading(false)
      })
      .catch((error) => {
        seterror(error)
        setloading(false)
      })
  }, [url])
  return { data, loading, error }
}
export default useFetch
