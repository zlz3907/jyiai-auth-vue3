import { createI18n } from 'vue-i18n'
import type { App } from 'vue'
import type { Language } from './types'
import zhCN from './zh-CN'
import enUS from './en-US'
import deDE from './de-DE'
import snZW from './sn-ZW'
import frFR from './fr-FR'
import jaJP from './ja-JP'
import type { LocaleMessages } from 'vue-i18n'
import storage from '@/utils/storage'

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

const messages: { [key: string]: LocaleMessages<any> } = {
  'zh-CN': zhCN,
  'en-US': enUS,
  'de-DE': deDE,
  'sn-ZW': snZW,
  'fr-FR': frFR,
  'ja-JP': jaJP
}

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: storage.getItem('language') || 'zh-CN',
  fallbackLocale: 'zh-CN',
  messages,
  silentTranslationWarn: true,
  missingWarn: false
})

export function setLanguage(lang: string) {
  i18n.global.locale.value = lang
  storage.setItem('language', lang)
  document.querySelector('html')?.setAttribute('lang', lang)
}

export function setupI18n(app: App, options?: AuthI18nOptions) {
  if (options?.messages) {
    Object.keys(options.messages).forEach(locale => {
      i18n.global.mergeLocaleMessage(locale, options.messages![locale])
    })
  }
  
  if (options?.locale) {
    setLanguage(options.locale)
  }
  
  app.use(i18n)
}

interface AuthI18nOptions {
  locale?: string
  messages?: Record<string, any>
}

export default i18n 