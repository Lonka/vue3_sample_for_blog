import { LKAxios } from './Axios'
import type { CreateAxiosOptions } from './types'
import { ContentTypeEnum } from '~/enums/httpEnum'
import { deepMerge } from '~/utils'

function createAxios(opt?: Partial<CreateAxiosOptions>) {
  return new LKAxios(
    deepMerge({
      baseURL: 'https://lonka.github.io',
      timeout: 10 * 1000,
      headers: { 'Content-Type': ContentTypeEnum.JSON },
      requestOptions: {
      },
    }, opt || {}))
}

// 公開讓其它頁面去調用
export const http = createAxios()
