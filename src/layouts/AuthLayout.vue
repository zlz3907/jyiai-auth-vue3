<template>
  <div class="jyiai-auth min-vh-100 d-flex flex-column">
    <header v-if="showHeader" class="py-2 bg-light border-bottom">
      <div class="container">
        <div class="d-flex justify-content-between align-items-center">
          <div class="d-flex align-items-center gap-3">
            <button 
              v-if="backUrl" 
              class="btn btn-link text-decoration-none p-0"
              @click="handleBack"
            >
              <i class="bi bi-arrow-left me-1"></i>
              {{ t('common.back') }}
            </button>
            <div class="logo">
              <!-- Logo slot -->
              <slot name="logo">
                <!-- Default logo can be placed here -->
              </slot>
            </div>
          </div>
          <div class="d-flex align-items-center gap-3">
            <ThemeToggler />
            <LanguageSelector />
          </div>
        </div>
      </div>
    </header>

    <main class="flex-grow-1">
      <div class="container h-100">
        <div class="row min-vh-lg-75 align-items-center justify-content-center my-4">
          <div class="col-12 col-md-8 col-lg-6 col-xl-5">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </main>

    <footer v-if="showFooter" class="py-3 mt-auto border-top">
      <div class="container">
        <div class="text-center">
          <slot name="footer">
            <!-- Footer content slot -->
          </slot>
        </div>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import LanguageSelector from '@/components/LanguageSelector.vue'
import ThemeToggler from '@/components/ThemeToggler.vue'

export default defineComponent({
  name: 'AuthLayout',
  components: {
    LanguageSelector,
    ThemeToggler
  },
  props: {
    showHeader: {
      type: Boolean,
      default: true
    },
    showFooter: {
      type: Boolean,
      default: true
    }
  },
  emits: ['update:showHeader', 'update:showFooter'],
  setup() {
    const route = useRoute()
    const backUrl = ref<string | null>(null)
    const { t } = useI18n()

    onMounted(() => {
      const urlBackParam = route.query.backUrl
      if (urlBackParam && typeof urlBackParam === 'string') {
        backUrl.value = urlBackParam
      }
    })

    const handleBack = () => {
      if (backUrl.value) {
        window.location.href = backUrl.value
      }
    }

    return {
      backUrl,
      handleBack,
      t
    }
  }
})
</script>

<style lang="scss">
.jyiai-auth {
  background-color: var(--bs-body-bg);
}
</style> 