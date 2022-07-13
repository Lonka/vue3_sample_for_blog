import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import type { RequestOptions, Result } from './types'

export abstract class AxiosTransform {
  // 呼叫 Axios.request 前的轉換函式
  beforeRequestHook?: (config: AxiosRequestConfig, options: RequestOptions) => AxiosRequestConfig
  // 取得 Request Data 後的轉換函式
  transformRequestData?: (res: AxiosResponse<Result>, options: RequestOptions) => any
}
