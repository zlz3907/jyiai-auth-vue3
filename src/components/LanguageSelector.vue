<template>
  <div class="relative">
    <button
      type="button"
      class="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
      @click="toggleDropdown"
    >
      <span>{{ languages.find(lang => lang.code === locale)?.flag }}</span>
      <span>{{ languages.find(lang => lang.code === locale)?.name }}</span>
    </button>

    <div
      v-if="isOpen"
      class="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5"
    >
      <div class="py-1">
        <button
          v-for="lang in languages"
          :key="lang.code"
          class="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
          @click="changeLanguage(lang)"
        >
          <span>{{ lang.flag }}</span>
          <span>{{ lang.name }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { availableLanguages, setLanguage } from '@/locales'
import type { Language } from '@/locales/types'

export default defineComponent({
  name: 'LanguageSelector',
  setup() {
    const { locale } = useI18n()
    const isOpen = ref(false)

    const toggleDropdown = () => {
      isOpen.value = !isOpen.value
    }

    const changeLanguage = (lang: Language) => {
      setLanguage(lang.code)
      isOpen.value = false
    }

    return {
      locale,
      isOpen,
      languages: availableLanguages,
      toggleDropdown,
      changeLanguage
    }
  }
})
</script>

<style scoped>
/* 移除所有旧的 Bootstrap 样式 */
</style> 