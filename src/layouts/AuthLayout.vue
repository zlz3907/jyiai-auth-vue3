<template>
  <div class="jyiai-auth min-h-screen flex flex-col bg-base-100">
    <!-- Header -->
    <Navbar
      v-if="showHeader"
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
    <main class="flex-1 flex items-center justify-center py-auto px-4">
      <router-view></router-view>
    </main>

    <!-- Footer -->
    <footer v-if="showFooter" class="shadow border-t border-base-200">
      <div class="container mx-auto px-4 h-14 flex items-center justify-center">
        <slot name="footer"></slot>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from '@/components/Navbar.vue'

// Props
defineProps({
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

// Lifecycle
onMounted(() => {
  const urlBackParam = route.query.backUrl
  if (urlBackParam && typeof urlBackParam === 'string') {
    backUrl.value = urlBackParam
  }
})

// Methods
const handleBack = () => {
  if (backUrl.value) {
    window.location.href = backUrl.value
  }
}
</script>

<style>
.jyiai-auth {
  background-color: hsl(var(--b1));
}
</style>