import type { AxiosRequestConfig } from 'axios'
import type { AxiosTransform } from './axiosTransform'

// 繼承 AxiosRequestConfig 並添加自訂的條件，在 Axios 調用或攔截器（Interceptors）中可以使用
export interface CreateAxiosOptions extends AxiosRequestConfig {
  // 轉換函式
  transform?: AxiosTransform
  // 客製化設定參數
  requestOptions?: RequestOptions
}

// 自訂 Axios Request 觸發時的一些參數
export interface RequestOptions {
  // ----↓ beforeRequestHook 中使用 ↓----
  // RESTful API 的 Host URL
  apiUrl?: string
  // URL 的前綴值（/api/v1）
  urlPrefix?: string
  // 在 QueryString 後加入 timestamp
  joinTime?: boolean
  // ----↑ beforeRequestHook 中使用 ↑----

  // ----↓ transformRequestData 中使用 ↓----
  // 直接回傳原始 AxiosResponse
  isReturnNativeResponse?: boolean
  // 需要對 AxiosResponse 進行解析並只回傳 Result ，如果為 false 時會回傳 AxiosResponse.data
  isTransformResponse?: boolean
  // 是否顯示成功或失敗訊息（需 isReturnNativeResponse = false 且 isTransformResponse = true 才會運行）
  isShowMessage?: boolean
  // ----↑ transformRequestData 中使用 ↑----
}

// 定義回傳的 res.data 格式，這部份要配合 API 的回傳格式，方便取值
export interface Result<T = any> {
  code: number
  type?: 'success' | 'error' | 'warning'
  message: string
  result?: T
}

