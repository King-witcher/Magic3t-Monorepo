import axios from 'axios'

const SERVER_URL = process.env.REACT_APP_STAGE === 'production' ? 'https://magic3t-backend.onrender.com' : 'http://localhost:4000'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function get<Response = object>(url: string): Promise<Response> {
  const response = await axios.get<Response>(SERVER_URL + url, {
    validateStatus: () => true,
    headers: {
      Authorization: localStorage.getItem('token')
    }
  })
  return response.data
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function post<Response = object>(url: string, payload: any): Promise<Response> {
  const response = await axios.post<Response>(SERVER_URL + url, payload, {
    validateStatus: () => true,
    headers: {
      Authorization: localStorage.getItem('token')
    }
  })
  return response.data
}

export { get, post }