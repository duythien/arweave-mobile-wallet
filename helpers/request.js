import { API } from '@env'


const getKey = async (props) => {

  const url = `${API}/arweave/key`
  const response = await fetch(url, {
    method: 'GET',
    // headers: {
    //   key: API_KEY
    // }
  })
  const json = await response.json();

  if (json) {
    return json
  }
}


const getAddress = async (props) => {
  const url = `${API}/arweave/address`
  console.log(props)
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer xxxx'
    },
    body: props
  })
  const json = await response.json()
  if (json) {
    return json
  }
}



export {
  getKey,
  getAddress
}