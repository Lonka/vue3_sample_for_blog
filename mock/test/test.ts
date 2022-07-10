import { resultSuccess } from '../_util'

export default [
  {
    url: '/api/v1/test',
    timeout: 1000,
    method: 'get',
    response: ({ query }) => {
      return resultSuccess(query)
    },
  },
  {
    url: '/api/v1/test',
    timeout: 1000,
    method: 'post',
    response: ({ body }) => {
      return resultSuccess(body)
    },
  },
  {
    url: '/api/v1/test/:id',
    timeout: 1000,
    method: 'put',
    response: ({ query, body }) => {
      return resultSuccess({
        id: query.id,
        data: body,
      })
    },
  },
  {
    url: '/api/v1/test/:id',
    timeout: 1000,
    method: 'delete',
    response: ({ query }) => {
      return resultSuccess({
        id: query.id,
        name: 'delete Name',
      })
    },
  },
]
