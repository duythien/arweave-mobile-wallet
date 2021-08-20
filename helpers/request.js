import { API } from '@env'


const getKey = async (props) => {

  const url = `${API}/arweave/key`
  const response = await fetch(url, {
    method: 'GET',
    // headers: {
    //   key: API_KEY
    // }
  })
  const json = await response

  if (json.ok) {
      return json.blob()

  }
}

export {
  getKey
}