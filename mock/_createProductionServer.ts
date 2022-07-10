import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'
// 透過 Vite 直接載入所有的模擬 .ts
const modules = import.meta.globEager('./**/*.ts')

// 把每個模擬 .ts 的 export default 存入 array
const mockModules: any[] = []
Object.keys(modules).forEach((key) => {
  if (key.includes('/_'))
    return

  mockModules.push(...modules[key].default)
})

// 啟動 Mockup Server 並告知要載入的模擬 .ts 列表
export function setupProdMockServer() {
  createProdMockServer(mockModules)
}
