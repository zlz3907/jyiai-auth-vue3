import CryptoJS from 'crypto-js'
import { cryptoConfig } from './config'
import type { CryptoConfig } from './types'

class Crypto {
  private key: string
  private iv: string

  constructor(config: CryptoConfig) {
    this.key = config.key
    this.iv = config.iv
  }

  /**
   * 加密数据
   */
  encrypt(data: string): string {
    const key = CryptoJS.enc.Utf8.parse(this.key)
    const iv = CryptoJS.enc.Utf8.parse(this.iv)
    
    const encrypted = CryptoJS.AES.encrypt(data, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    })
    
    return encrypted.toString()
  }

  /**
   * 解密数据
   */
  decrypt(encryptedData: string): string {
    const key = CryptoJS.enc.Utf8.parse(this.key)
    const iv = CryptoJS.enc.Utf8.parse(this.iv)
    
    const decrypted = CryptoJS.AES.decrypt(encryptedData, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    })
    
    return decrypted.toString(CryptoJS.enc.Utf8)
  }
}

export default new Crypto(cryptoConfig) 