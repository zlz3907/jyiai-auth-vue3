<template>
  <div class="jyiai-dropdown">
    <div tabindex="0" role="button" class="jyiai-btn jyiai-btn-ghost jyiai-btn-sm jyiai-lang-btn">
      <div class="jyiai-flex jyiai-items-center jyiai-justify-center jyiai-lang-flag">
        <span>{{ currentLanguage?.flag }}</span>
      </div>
    </div>
    <ul tabindex="0" class="jyiai-dropdown-content jyiai-menu">
      <li v-for="lang in availableLanguages" :key="lang.code" class="jyiai-menu-item">
        <button
          @click="changeLanguage(lang)"
          :class="{ 'jyiai-active': lang.code === locale }"
          class="jyiai-menu-item-btn"
        >
          <span class="jyiai-lang-flag">{{ lang.flag }}</span>
          <span class="jyiai-lang-name">{{ lang.name }}</span>
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
/* 样式已移至base.css */
</style>