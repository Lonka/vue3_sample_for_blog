import type { AxiosRequestConfig } from 'axios'

// 繼承 AxiosRequestConfig 並添加自訂的條件，在 Axios 調用或攔截器（Interceptors）中可以使用
export interface CreateAxiosOptions extends AxiosRequestConfig {
  requestOptions?: RequestOptions // customize setting
}

// 自訂 Axios Request 觸發時的一些參數
export interface RequestOptions {
}

// 定義回傳的 res.data 格式，這部份要配合 API 的回傳格式，方便取值
export interface Result<T = any> {
  code: number
  type?: 'success' | 'error' | 'warning'
  message: string
  result?: T
}

