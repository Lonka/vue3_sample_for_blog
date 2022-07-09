import { isObject } from '@vueuse/core'

// 深度 Copy 確保不參考到同一個記憶體
export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string
  for (key in target)
    src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key])

  return src
}
