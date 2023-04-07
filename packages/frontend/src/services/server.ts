import axios, { AxiosResponse } from 'axios'

const SERVER_URL = process.env.REACT_APP_STAGE === 'production' ? 'https://magic3t-backend.onrender.com' : 'http://localhost:4000'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function get<Response = any>(url: string, token?: string): Promise<AxiosResponse> {
  const response = await axios.get<Response>(SERVER_URL + url, {
    validateStatus: () => true,
    headers: {
      Authorization: token
    }
  })
  return response
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function post<Response = any>(url: string, payload: any, token?: string): Promise<AxiosResponse> {
  const response = await axios.post<Response>(SERVER_URL + url, payload, {
    validateStatus: () => true,
    headers: {
      Authorization: token
    }
  })
  return response
}

export { get, post }