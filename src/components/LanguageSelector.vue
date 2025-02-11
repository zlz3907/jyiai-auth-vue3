<template>
  <div class="dropdown me-3">
    <a class="nav-link dropdown-toggle" 
       href="#" 
       id="dropdownLanguage" 
       ref="dropdownButton"
       data-bs-toggle="dropdown" 
       aria-haspopup="true" 
       aria-expanded="false">
      <!-- <i class="bi bi-globe me-2"></i> -->
      <span class="me-2">{{ languages.find(lang => lang.code === locale)?.flag }}</span>
      <span class="d-none d-lg-inline-block">{{ languages.find(lang => lang.code === locale)?.name }}</span>
    </a>
    <div class="dropdown-menu dropdown-menu-end mt-2 shadow" aria-labelledby="dropdownLanguage">
      <a v-for="lang in languages" 
         :key="lang.code"
         class="dropdown-item d-flex align-items-center" 
         href="#"
         @click.prevent="changeLanguage(lang)">
        <span class="me-2">{{ lang.flag }}</span>
        {{ lang.name }}
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { availableLanguages, setLanguage } from '@/locales'
import type { Language } from '@/locales/types'
import { Dropdown } from 'bootstrap'

export default defineComponent({
  name: 'LanguageSelector',
  setup() {
    const { locale } = useI18n()
    const dropdownButton = ref<HTMLElement | null>(null)

    const changeLanguage = (lang: Language) => {
      setLanguage(lang.code)
    }

    onMounted(() => {
      // 初始化下拉菜单
      if (dropdownButton.value && Dropdown) {
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