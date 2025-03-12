/**
 * 统一管理 localStorage 的工具类
 * 所有数据都存储在 JYIAI_AUTH 对象中
 */

const STORAGE_KEY = 'JYIAI_AUTH'

// 定义存储键类型
type StorageKey = 'token' | 'userInfo' | 'phone' | 'remember' | 'theme' | 'language'

// 默认值
const defaultState: Record<StorageKey, any> = {
  token: '',
  userInfo: null,
  phone: '',
  remember: false,
  theme: 'light',
  language: 'zh-CN'
}

/**
 * 获取完整的存储对象
 */
function getStorage(): Record<string, any> {
  const storageStr = localStorage.getItem(STORAGE_KEY)
  if (!storageStr) {
    return { ...defaultState }
  }
  
  try {
    return { ...defaultState, ...JSON.parse(storageStr) }
  } catch (e) {
    console.error('Failed to parse JYIAI_AUTH from localStorage', e)
    return { ...defaultState }
  }
}

/**
 * 保存完整的存储对象
 */
function setStorage(data: Record<string, any>): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

/**
 * 获取指定键的值
 */
export function getItem(key: string): any {
  const storage = getStorage()
  return storage[key]
}

/**
 * 设置指定键的值
 */
export function setItem(key: string, value: any): void {
  const storage = getStorage()
  storage[key] = value
  setStorage(storage)
}

/**
 * 移除指定键的值（设为默认值）
 */
export function removeItem(key: string): void {
  const storage = getStorage()
  storage[key] = key in defaultState ? defaultState[key as StorageKey] : null
  setStorage(storage)
}

/**
 * 清除所有存储
 */
export function clear(): void {
  setStorage({ ...defaultState })
}

export default {
  getItem,
  setItem,
  removeItem,
  clear
} 