import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'
import type { CreateAxiosOptions, RequestOptions, Result } from './types'
import { deepMerge } from '~/utils'

export class LKAxios {
  // 建立 Axios 實例
  private axiosInstance: AxiosInstance
  // 初使化的 Axios Options
  private options: CreateAxiosOptions
  // Initial 該 Class 時呼叫
  constructor(options: CreateAxiosOptions) {
    this.options = options
    this.axiosInstance = axios.create(options)
  }

  /*
   * 調用 Axios.request
   * config Axios 支援的設定值
   * option 調用時的額外參數
   */
  request<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    // 要丟入 Axios 的參數，從傳入值先 Copy 出來
    const conf: CreateAxiosOptions = deepMerge({}, config)
    // 把初使化的額外參數取出
    const { requestOptions } = this.options
    // 用調用時的額外參數去蓋掉初使化的（保留初使化中未重覆的）
    const opt: RequestOptions = Object.assign({}, requestOptions, options)
    conf.requestOptions = opt

    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request<any, AxiosResponse<Result>>(conf)
        .then((res: AxiosResponse<Result>) => {
          resolve(res as unknown as Promise<T>)
        })
    })
  }
}
