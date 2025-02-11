import CryptoJS from 'crypto-js'

/**
 * MD5 加密（用于密码）
 */
export function encryptPassword(password: string): string {
  return CryptoJS.MD5(password).toString()
}