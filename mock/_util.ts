import Mock from 'mockjs'

// HTTP Status Code 為 200 時的統一回傳格式
export function resultSuccess(result: any, { message = 'ok' } = {}) {
  return Mock.mock({
    code: 200,
    result,
    message,
    type: 'success',
  })
}
