<template>
  <Teleport to="body">
    <dialog id="termsModal" class="modal modal-bottom sm:modal-middle">
      <div class="modal-box max-w-3xl">
        <h3 class="font-bold text-lg mb-4">{{ t('auth.register.form.terms') }}</h3>
        <div class="py-4">
          <div class="terms-content prose prose-sm max-w-none">
            <div class="tabs tabs-boxed mb-4">
              <a class="tab tab-active" :class="{ 'tab-active': activeTab === 'terms' }" @click="activeTab = 'terms'">
                {{ t('auth.terms.serviceTerms') }}
              </a>
              <a class="tab" :class="{ 'tab-active': activeTab === 'privacy' }" @click="activeTab = 'privacy'">
                {{ t('auth.terms.privacyPolicy') }}
              </a>
            </div>

            <!-- Service Terms -->
            <div v-show="activeTab === 'terms'" class="space-y-4">
              <h4 class="text-lg font-semibold">{{ t('auth.terms.serviceTermsTitle') }}</h4>
              <p>{{ t('auth.terms.serviceTermsIntro') }}</p>

              <h5 class="text-md font-semibold mt-4">{{ t('auth.terms.termsSection1.title') }}</h5>
              <p>{{ t('auth.terms.termsSection1.content') }}</p>

              <h5 class="text-md font-semibold mt-4">{{ t('auth.terms.termsSection2.title') }}</h5>
              <p>{{ t('auth.terms.termsSection2.content') }}</p>

              <h5 class="text-md font-semibold mt-4">{{ t('auth.terms.termsSection3.title') }}</h5>
              <p>{{ t('auth.terms.termsSection3.content') }}</p>
            </div>

            <!-- Privacy Policy -->
            <div v-show="activeTab === 'privacy'" class="space-y-4">
              <h4 class="text-lg font-semibold">{{ t('auth.terms.privacyPolicyTitle') }}</h4>
              <p>{{ t('auth.terms.privacyPolicyIntro') }}</p>

              <h5 class="text-md font-semibold mt-4">{{ t('auth.terms.privacySection1.title') }}</h5>
              <p>{{ t('auth.terms.privacySection1.content') }}</p>

              <h5 class="text-md font-semibold mt-4">{{ t('auth.terms.privacySection2.title') }}</h5>
              <p>{{ t('auth.terms.privacySection2.content') }}</p>

              <h5 class="text-md font-semibold mt-4">{{ t('auth.terms.privacySection3.title') }}</h5>
              <p>{{ t('auth.terms.privacySection3.content') }}</p>
            </div>
          </div>
        </div>
        <div class="modal-action">
          <button class="btn btn-outline" @click="hideModal">{{ t('common.cancel') }}</button>
          <button class="btn btn-primary" @click="accept">{{ t('common.confirm') }}</button>
        </div>
      </div>
    </dialog>
  </Teleport>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'Terms',
  emits: ['accept'],
  setup(_, { emit }) {
    const { t } = useI18n()
    const activeTab = ref<'terms' | 'privacy'>('terms')

    const showModal = () => {
      const modalEl = document.getElementById('termsModal') as HTMLDialogElement
      if (modalEl) {
        modalEl.showModal()
      }
    }

    const hideModal = () => {
      const modalEl = document.getElementById('termsModal') as HTMLDialogElement
      if (modalEl) {
        modalEl.close()
      }
    }

    const accept = () => {
      emit('accept')
      hideModal()
    }

    return {
      t,
      activeTab,
      showModal,
      hideModal,
      accept
    }
  }
})
</script>

<style scoped>
.terms-content {
  font-size: 0.875rem;
  line-height: 1.6;
}

.terms-content h4 {
  font-weight: 600;
  margin: 1.5rem 0 1rem;
}

.terms-content h5 {
  font-weight: 600;
  margin: 1.25rem 0 0.75rem;
}

.terms-content p {
  line-height: 1.6;
  margin-bottom: 1rem;
}

.terms-content p:last-child {
  margin-bottom: 0;
}

.tab {
  cursor: pointer;
  transition: all 0.2s ease;
}

.tab-active {
  background-color: hsl(var(--p));
  color: hsl(var(--pc));
}
</style> 