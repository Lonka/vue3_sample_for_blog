import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import { isString } from '@vueuse/core'
import { LKAxios } from './Axios'
import type { CreateAxiosOptions, RequestOptions, Result } from './types'
import type { AxiosTransform } from './axiosTransform'
import { isUrl, joinTimestamp } from './helper'
import { ContentTypeEnum, RequestEnum, ResultEnum } from '~/enums/httpEnum'
import { deepMerge } from '~/utils'

const transform: AxiosTransform = {
  beforeRequestHook(config: AxiosRequestConfig, options: RequestOptions) {
    const { apiUrl, urlPrefix, joinTime = true } = options
    // 是否調用的 URL 為完整的 URL（https://... or /partition）
    const isUrlStr = isUrl(config.url as string)

    // 當為參考路徑時，填加前綴值在 URL 前面
    if (!isUrlStr && urlPrefix && isString(urlPrefix))
      config.url = `${urlPrefix}${config.url}`

    // 當為參考路徑時，填加預設的 apiUrl 在 URL 前面
    if (!isUrlStr && apiUrl && isString(apiUrl))
      config.url = `${apiUrl}${config.url}`

    // 取得使用者設定的 params ，沒有的話預設為空物件
    const params = config.params || {}
    // 當 Method 為 GET 時填入 timestamp
    if (config.method?.toUpperCase() === RequestEnum.GET) {
      if (!isString(params)) {
        config.params = Object.assign(params || {}, joinTimestamp(joinTime, false))
      }
      else {
        config.url = `${config.url + params}${joinTimestamp(joinTime, true)}`
        config.params = undefined
      }
    }
    return config
  },
  transformRequestData(res: AxiosResponse<Result>, options: RequestOptions) {
    const {
      isReturnNativeResponse,
      isTransformResponse,
      isShowMessage,
    } = options
    // 當設定為回傳原始 Response 時
    if (isReturnNativeResponse)
      return res
    // 當設定不要對 Response 值進行轉換時
    if (!isTransformResponse)
      return res.data
    const { data } = res
    if (!data)
      throw new Error('request error, please try again later.')
      // 這邊要確保後端回傳的格式是這種，才取的出來
    const { code, result, message } = data
    const hasSuccess = data && Reflect.has(data, 'code') && code === ResultEnum.SUCCESS
    // 如果設定要呈現訊息時
    if (isShowMessage) {
      // TODO: 最好避免用 console 來呈現
      if (hasSuccess)
        console.info(`[axios-request]-${message || 'Successful Operation!'}`)
    }
    // 正確調用時回傳 result
    if (code === ResultEnum.SUCCESS)
      return result

    // 調用失敗時的處理
    let errorMsg = message
    let neededLogout = false
    switch (code) {
      case ResultEnum.ERROR:
        errorMsg = `${errorMsg || 'Operation Failed!'}`
        break
      case ResultEnum.TIMEOUT:
        errorMsg = 'timeout, please login again'
        neededLogout = true
        break
    }

    // 是否要呈現失敗訊息
    if (isShowMessage)
      console.error(`[axios-request]-${errorMsg}`)

    // 是否需要登出
    if (neededLogout)
      window.location.href = '/'

    throw new Error(errorMsg)
  },
}

function createAxios(opt?: Partial<CreateAxiosOptions>) {
  return new LKAxios(
    deepMerge({
      transform,
      timeout: 10 * 1000,
      headers: { 'Content-Type': ContentTypeEnum.JSON },
      // 添加額外的客製參數
      requestOptions: {
        apiUrl: '',
        urlPrefix: '/api/v1',
        joinTime: true,
        isReturnNativeResponse: false,
        isTransformResponse: true,
        isShowMessage: true,
      },
    }, opt || {}))
}

// 公開讓其它頁面去調用
export const http = createAxios()
