<template>
  <div class="dropdown dropdown-end">
    <div tabindex="0" role="button" class="btn btn-ghost btn-sm h-9 px-2">
      <div class="w-4 h-4 flex items-center justify-center">
        <span class="text-base leading-none">{{ currentLanguage?.flag }}</span>
      </div>
    </div>
    <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 mt-2">
      <li v-for="lang in availableLanguages" :key="lang.code">
        <button
          @click="changeLanguage(lang)"
          :class="{ 'active': lang.code === locale }"
          class="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-base-200 transition-colors"
        >
          <span class="text-base leading-none">{{ lang.flag }}</span>
          <span class="text-sm">{{ lang.name }}</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { availableLanguages, setLanguage } from '@/locales'
import type { Language } from '@/locales/types'

const { locale } = useI18n()

const currentLanguage = computed(() => 
  availableLanguages.find(lang => lang.code === locale.value)
)

const changeLanguage = (lang: Language) => {
  setLanguage(lang.code)
}
</script>

<style scoped>
.active {
  background-color: rgb(243 244 246);
}

@media (prefers-color-scheme: dark) {
  .active {
    background-color: rgb(55 65 81);
  }
}
</style> 