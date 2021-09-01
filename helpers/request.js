import { API } from '@env'


const getKey = async (props) => {

  const url = `${API}/arweave/key`
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer xxxx'
    },
  })
  const json = await response.json();

  if (json) {
    return json
  }
}
const getAddress = async (props) => {
  const url = `${API}/arweave/address`
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer xxxx'
    },
    body: JSON.stringify(props)
  })
  const json = await response.json()
  if (json) {
    return json.data
  }
}
const getBalance = async (address) => {
  const url = `${API}/arweave/balance`
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer xxxx'
    },
    body: JSON.stringify({'address' : address})
  })
  const json = await response.json()
  if (json) {
    return json.data
  }
}
const getLastTransactionID = async (address) => {
  const url = `${API}/arweave/last_transaction`
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer xxxx'
    },
    body: JSON.stringify({'address' : address})
  })
  const json = await response.json();
  if (json) {
    return json.data
  }
}
const createTransaction = async (key, amount, address) => {
  const url = `${API}/arweave/create_transaction`
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer xxxx'
    },
    body: JSON.stringify({
      'address' : address,
      'amount': amount,
      'key': key
    })
  })
  const json = await response.json();
  if (json) {
    return json.data
  }
}




export {
  getKey,
  getAddress,
  getBalance,
  createTransaction,
  getLastTransactionID
}