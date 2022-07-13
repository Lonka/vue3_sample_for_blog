// restful 為 true 時回傳 QueryString ，反之回傳 Object
export function joinTimestamp(join: boolean, restful = false): string | object {
  if (!join)
    return restful ? '' : {}

  const now = new Date().getTime()
  if (restful)
    return `?_t=${now}`

  return { _t: now }
}

export function isUrl(url: string): boolean {
  return /(^http|https:\/\/)/g.test(url)
}
