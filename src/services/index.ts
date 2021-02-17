import axios, { AxiosResponse } from 'axios'
// @ts-ignore
import jsonpAdapter from 'axios-jsonp'
import { DataSource } from '../types/app_types'

const getDataSource = (url: string) => {
  return axios({
    url: `https://script.google.com/macros/s/AKfycbwjpBpi125hrW5ihl9zwFqWVT_lBjbJ_-zMyRDN6jA89aphbvZkjw9fpg/exec?url=${encodeURIComponent(url)}`,
    adapter: jsonpAdapter,
  }).then((response: AxiosResponse<DataSource>) => {
    console.log(response)
    return response.data
  })
}

const services = {
  getDataSource
}

export default services
