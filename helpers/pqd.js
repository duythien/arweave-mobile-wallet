const getUserName = async (props, setUsername) => {
  const url = `${apiServerURL}/users/me`
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + props.token,
      key: API_KEY
    }
  })
  const json = await response.json()
  if (json.data) {
    return json.data
  }
}
const formatBalance = (balance, unit) => {

	return balance + 'PQD';

}

export {
	getUserName,
	formatBalance
}
