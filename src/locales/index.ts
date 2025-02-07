import { createI18n } from 'vue-i18n'
import type { Language, Messages } from './types'
import zhCN from './zh-CN'
import enUS from './en-US'
import deDE from './de-DE'
import snZW from './sn-ZW'
import frFR from './fr-FR'
import jaJP from './ja-JP'

export const availableLanguages: Language[] = [
  {
    code: 'zh-CN',
    name: '简体中文',
    flag: '🇨🇳'
  },
  {
    code: 'en-US',
    name: 'English',
    flag: '🇺🇸'
  },
  {
    code: 'de-DE',
    name: 'Deutsch',
    flag: '🇩🇪'
  },
  {
    code: 'fr-FR',
    name: 'Français',
    flag: '🇫🇷'
  },
  {
    code: 'ja-JP',
    name: '日本語',
    flag: '🇯🇵'
  },
  {
    code: 'sn-ZW',
    name: 'chiShona',
    flag: '🇿🇼'
  }
]

const messages: Record<string, Messages> = {
  'zh': zhCN,
  'zh-CN': zhCN,
  'en': enUS,
  'en-US': enUS,
  'de-DE': deDE,
  'sn-ZW': snZW,
  'fr-FR': frFR,
  'ja-JP': jaJP
}

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: localStorage.getItem('language') || 'zh-CN',
  fallbackLocale: 'zh-CN',
  messages,
  silentTranslationWarn: true,
  missingWarn: false
})

export const setLanguage = (lang: string): void => {
  i18n.global.locale.value = lang
  localStorage.setItem('language', lang)
  document.querySelector('html')?.setAttribute('lang', lang)
}

export default i18n 