<template>
  <Teleport to="body">
    <dialog id="termsModal" class="jyiai-modal jyiai-modal-bottom jyiai-sm-modal-middle">
  <div class="jyiai-modal-box jyiai-max-w-3xl">
    <h3 class="jyiai-font-bold jyiai-text-lg jyiai-mb-4">{{ t('auth.register.form.terms') }}</h3>
    <div class="jyiai-py-4">
      <div class="jyiai-terms-content jyiai-prose jyiai-prose-sm jyiai-max-w-none jyiai-max-h-[60vh] jyiai-overflow-y-auto jyiai-pr-2">
        <div class="jyiai-tabs jyiai-tabs-boxed jyiai-mb-4">
          <a class="jyiai-tab" :class="{ 'jyiai-tab-active': activeTab === 'terms' }" @click="activeTab = 'terms'">
            {{ t('auth.terms.serviceTerms') }}
          </a>
          <a class="jyiai-tab" :class="{ 'jyiai-tab-active': activeTab === 'privacy' }" @click="activeTab = 'privacy'">
            {{ t('auth.terms.privacyPolicy') }}
          </a>
        </div>

            <!-- Service Terms -->
            <div v-show="activeTab === 'terms'" class="jyiai-space-y-4">
              <h4 class="jyiai-text-lg jyiai-font-semibold">{{ t('auth.terms.serviceTermsTitle') }}</h4>
              <p>{{ t('auth.terms.serviceTermsIntro') }}</p>

              <h5 class="jyiai-text-md jyiai-font-semibold jyiai-mt-4">{{ t('auth.terms.termsSection1.title') }}</h5>
              <p>{{ t('auth.terms.termsSection1.content') }}</p>

              <h5 class="jyiai-text-md jyiai-font-semibold jyiai-mt-4">{{ t('auth.terms.termsSection2.title') }}</h5>
              <p>{{ t('auth.terms.termsSection2.content') }}</p>

              <h5 class="jyiai-text-md jyiai-font-semibold jyiai-mt-4">{{ t('auth.terms.termsSection3.title') }}</h5>
              <p>{{ t('auth.terms.termsSection3.content') }}</p>
            </div>

            <!-- Privacy Policy -->
            <div v-show="activeTab === 'privacy'" class="jyiai-space-y-4">
              <h4 class="jyiai-text-lg jyiai-font-semibold">{{ t('auth.terms.privacyPolicyTitle') }}</h4>
              <p>{{ t('auth.terms.privacyPolicyIntro') }}</p>

              <h5 class="jyiai-text-md jyiai-font-semibold jyiai-mt-4">{{ t('auth.terms.privacySection1.title') }}</h5>
              <p>{{ t('auth.terms.privacySection1.content') }}</p>

              <h5 class="jyiai-text-md jyiai-font-semibold jyiai-mt-4">{{ t('auth.terms.privacySection2.title') }}</h5>
              <p>{{ t('auth.terms.privacySection2.content') }}</p>

              <h5 class="jyiai-text-md jyiai-font-semibold jyiai-mt-4">{{ t('auth.terms.privacySection3.title') }}</h5>
              <p>{{ t('auth.terms.privacySection3.content') }}</p>
            </div>
          </div>
        </div>
        <div class="jyiai-modal-action jyiai-flex jyiai-justify-end">
          <button class="jyiai-btn jyiai-btn-outline jyiai-mr-2" @click="hideModal">{{ t('common.cancel') }}</button>
          <button class="jyiai-btn jyiai-btn-primary" @click="accept">{{ t('common.confirm') }}</button>
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
#termsModal {
  border-radius: 0.5rem;
  border: 1px solid var(--jyiai-border-light);
}

.jyiai-terms-content {
  font-size: 0.875rem;
  line-height: 1.6;
}

.jyiai-terms-content h4 {
  font-weight: 600;
  margin: 1.5rem 0 1rem;
}

.jyiai-terms-content h5 {
  font-weight: 600;
  margin: 1.25rem 0 0.75rem;
}

.jyiai-terms-content p {
  line-height: 1.6;
  margin-bottom: 1rem;
}

.jyiai-terms-content p:last-child {
  margin-bottom: 0;
}

.jyiai-tab {
  display: inline-block;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
  padding: 0.5rem 1rem;
  margin-right: 0.5rem;
  border: 1px solid transparent;
  border-radius: 0.375rem 0.375rem 0 0; /* 上圆角、下直角 */
  background-color: transparent;
  color: var(--jyiai-text-light);
}

.jyiai-tab:hover {
  background-color: var(--jyiai-hover-light);
  border-color: var(--jyiai-border-light);
}

.jyiai-tab-active {
  background-color: var(--jyiai-primary);
  color: var(--jyiai-primary-content);
  border-color: var(--jyiai-primary);
  font-weight: 600;
  margin-bottom: -1px; /* 让激活标签与下方分隔线贴合 */
}

/* 激活态不需要 hover 效果 */
.jyiai-tab-active:hover {
  background-color: var(--jyiai-primary);
  color: var(--jyiai-primary-content);
  border-color: var(--jyiai-primary);
}

/* Tabs 容器底部分隔线 */
.jyiai-tabs {
  border-bottom: 1px solid var(--jyiai-border-light);
}

[data-theme="dark"] #termsModal {
  border-color: var(--jyiai-border-dark);
  background-color: var(--jyiai-bg-dark);
  color: var(--jyiai-text-dark);
}

[data-theme="dark"] .jyiai-tab {
  color: var(--jyiai-text-dark);
}
[data-theme="dark"] .jyiai-tab:hover {
  background-color: var(--jyiai-hover-dark);
  border-color: var(--jyiai-border-dark);
}
</style>