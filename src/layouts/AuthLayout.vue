<template>
  <div class="jyiai-auth jyiai-flex-col" style="height: 100vh;">
    <!-- Header -->
    <Navbar
      v-if="resolvedShowHeader"
      mode="auth"
      :with-shadow="true"
      :with-border="false"
      :back-url="backUrl"
      @back="handleBack">
      <template #logo>
        <slot name="logo"></slot>
      </template>
    </Navbar>

    <!-- Main Content -->
    <main class="jyiai-flex-1 jyiai-flex jyiai-items-center jyiai-justify-center jyiai-px-4 jyiai-overflow-y-auto jyiai-main-scroll">
      <router-view></router-view>
    </main>

    <!-- Footer -->
    <footer v-if="resolvedShowFooter" class="jyiai-shadow jyiai-border-t">
      <div class="jyiai-w-full jyiai-px-4 jyiai-h-14 jyiai-flex jyiai-items-center jyiai-justify-center">
        <slot name="footer"></slot>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, getCurrentInstance, computed } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from '@/components/Navbar.vue'

// const { proxy } = getCurrentInstance()!
// Props
const props = defineProps({
  showHeader: {
    type: Boolean,
    default: true
  },
  showFooter: {
    type: Boolean,
    default: true
  }
})

// Composables
const route = useRoute()

// State
const backUrl = ref<string | undefined>(undefined)

// 读取插件注入的全局配置（$JAC）并优先覆盖本地 props
const { proxy } = getCurrentInstance()!


// 解析最终显隐：若 $JAC 提供值则使用，否则回退到 props
const resolvedShowHeader = computed(() => (	proxy?.$JAC?.showHeader ?? props.showHeader))
const resolvedShowFooter = computed(() => (	proxy?.$JAC?.showFooter ?? props.showFooter))

// Lifecycle
onMounted(() => {
  const urlBackParam = route.query.backUrl
  if (urlBackParam && typeof urlBackParam === 'string') {
    backUrl.value = urlBackParam
  }
  // this.showHeader = 
})

// Methods
const handleBack = () => {
  if (backUrl.value) {
    window.location.href = backUrl.value
  }
}
</script>