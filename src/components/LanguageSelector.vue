<template>
  <div class="dropdown">
    <button class="btn dropdown-toggle mb-0" 
            type="button" 
            ref="dropdownButton"
            data-bs-toggle="dropdown" 
            aria-expanded="false">
      <!-- <i class="bi bi-globe me-2"></i> -->
      <span class="me-2">{{ languages.find(lang => lang.code === locale)?.flag }}</span>
      <span class="d-none d-lg-inline-block">{{ languages.find(lang => lang.code === locale)?.name }}</span>
    </button>
    <ul class="dropdown-menu dropdown-menu-end">
      <li v-for="lang in languages" :key="lang.code">
        <a class="dropdown-item" 
           href="#"
           @click.prevent="changeLanguage(lang)"
           :class="{ 'active': lang.code === locale }">
          <span class="me-2">{{ lang.flag }}</span>
          {{ lang.name }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { availableLanguages, setLanguage } from '@/locales'
import type { Language } from '@/locales/types'
import { Dropdown } from 'bootstrap'  // 导入 Bootstrap 的 Dropdown

export default defineComponent({
  name: 'LanguageSelector',
  setup() {
    const { locale } = useI18n()
    const dropdownButton = ref<HTMLElement | null>(null)

    const changeLanguage = (lang: Language) => {
      setLanguage(lang.code)
    }

    onMounted(() => {
      // 手动初始化 dropdown
      if (dropdownButton.value) {
        new Dropdown(dropdownButton.value)
      }
    })

    return {
      locale,
      languages: availableLanguages,
      changeLanguage,
      dropdownButton
    }
  }
})
</script> 