<template>
  <Teleport to="body">
    <div class="modal fade" id="termsModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
        <div class="modal-content">
          <div class="modal-header border-0">
            <h5 class="modal-title">服务条款和隐私政策</h5>
            <button type="button" class="btn-close" @click="hide"></button>
          </div>
          <div class="modal-body px-4">
            <div class="terms-content">
              <p class="mb-4">对于位于欧洲经济区、英国和瑞士的个人，您可以阅读我们隐私政策的此版本。</p>

              <p class="mb-4">我们（知识库管理系统及其附属公司，以下简称"我们"、"我们的"）尊重您的隐私，并坚决致力于保护我们从您那里获得或关于您的任何信息的安全。本隐私政策描述了我们在您使用我们的网站、应用程序和服务（统称"服务"）时，对我们收集的个人数据（"个人数据"）的处理方式。</p>

              <h6 class="text-primary">1. 我们收集的个人数据</h6>
              <p>我们收集以下与您相关的个人数据：</p>

              <p class="fw-medium mb-2">您提供的个人数据：</p>
              <ul class="list-unstyled">
                <li class="mb-2">• 账户信息：创建账户时提供的用户名、联系方式、账户凭证等基本信息</li>
                <li class="mb-2">• 知识库内容：您上传的文档、图片等各类文件</li>
                <li class="mb-2">• 通信信息：您与我们的通信记录，包括反馈和建议</li>
                <li class="mb-2">• 其他信息：参与活动或调查时提供的信息</li>
              </ul>

              <p class="fw-medium mb-2">使用服务时自动收集的信息：</p>
              <ul class="list-unstyled">
                <li class="mb-2">• 日志数据：IP地址、浏览器类型、访问时间等</li>
                <li class="mb-2">• 使用数据：功能使用情况、操作记录等</li>
                <li class="mb-2">• 设备信息：设备标识符、操作系统等</li>
                <li class="mb-2">• 位置信息：基于IP地址的大致位置</li>
              </ul>

              <h6 class="text-primary mt-4">2. 个人数据的使用</h6>
              <p>我们使用收集的信息用于：</p>
              <ul class="list-unstyled">
                <li class="mb-2">• 提供和维护服务</li>
                <li class="mb-2">• 改进和开发新功能</li>
                <li class="mb-2">• 发送服务通知和更新</li>
                <li class="mb-2">• 防止欺诈和保护安全</li>
                <li class="mb-2">• 遵守法律要求</li>
              </ul>

              <h6 class="text-primary mt-4">3. 数据保护</h6>
              <p>我们采取多重措施保护您的数据：</p>
              <ul class="list-unstyled">
                <li class="mb-2">• 使用加密技术保护数据传输</li>
                <li class="mb-2">• 实施严格的访问控制</li>
                <li class="mb-2">• 定期安全审计</li>
                <li class="mb-2">• 数据备份和恢复机制</li>
              </ul>

              <h6 class="text-primary mt-4">4. 数据共享</h6>
              <p>我们仅在以下情况下共享您的数据：</p>
              <ul class="list-unstyled">
                <li class="mb-2">• 获得您的明确授权</li>
                <li class="mb-2">• 与服务提供商合作</li>
                <li class="mb-2">• 法律要求</li>
                <li class="mb-2">• 保护用户权益</li>
              </ul>

              <h6 class="text-primary mt-4">5. 您的权利</h6>
              <p>您对个人数据拥有以下权利：</p>
              <ul class="list-unstyled">
                <li class="mb-2">• 访问和导出数据</li>
                <li class="mb-2">• 更正或删除信息</li>
                <li class="mb-2">• 限制处理范围</li>
                <li class="mb-2">• 撤回同意</li>
              </ul>

              <h6 class="text-primary mt-4">6. 数据存储</h6>
              <ul class="list-unstyled">
                <li class="mb-2">• 仅在必要时间内保留数据</li>
                <li class="mb-2">• 提供数据删除功能</li>
                <li class="mb-2">• 定期清理过期数据</li>
              </ul>

              <h6 class="text-primary mt-4">7. 未成年人保护</h6>
              <ul class="list-unstyled">
                <li class="mb-2">• 服务不面向13岁以下未成年人</li>
                <li class="mb-2">• 13-18岁用户需监护人同意</li>
                <li class="mb-2">• 发现误收集将立即删除</li>
              </ul>

              <h6 class="text-primary mt-4">8. 联系我们</h6>
              <p>如有任何问题或建议，请联系：</p>
              <ul class="list-unstyled">
                <li class="mb-2">• 邮箱：support@zhycit.com</li>
                <li class="mb-2">• 电话：400-xxx-xxxx（工作日 9:00-18:00）</li>
                <li class="mb-2">• 地址：北京市朝阳区xxx大厦</li>
              </ul>

              <p class="mt-4 text-muted small">最后更新时间：2024年3月15日</p>
            </div>
          </div>
          <div class="modal-footer border-0">
            <button type="button" class="btn btn-light" @click="hide">取消</button>
            <button type="button" class="btn btn-primary" @click="handleAccept">同意并继续</button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as bootstrap from 'bootstrap'

const emit = defineEmits(['accept'])
const modal = ref(null)

const show = () => {
  if (!modal.value) {
    modal.value = new bootstrap.Modal(document.getElementById('termsModal'), {
      backdrop: 'static',
      keyboard: false
    })
  }
  modal.value.show()
}

const hide = () => {
  modal.value?.hide()
}

const handleAccept = () => {
  emit('accept')
  hide()
}

// 暴露方法给父组件
defineExpose({
  show,
  hide
})

onUnmounted(() => {
  modal.value?.dispose()
})
</script>

<style scoped>
.terms-content {
  font-size: 0.875rem;
  line-height: 1.6;
  color: var(--bs-body-color);
}

.terms-content h6 {
  color: var(--bs-primary);
  font-weight: 600;
  margin: 1.5rem 0 1rem;
}

.terms-content h6:first-child {
  margin-top: 0;
}

.terms-content p {
  color: var(--bs-secondary-color);
  line-height: 1.6;
  margin-bottom: 1rem;
}

.terms-content p:last-child {
  margin-bottom: 0;
}

.terms-content .fw-medium {
  margin-top: 1.5rem;
  color: var(--bs-body-color);
}

.terms-content ul {
  margin-bottom: 1.5rem;
}

.terms-content li {
  position: relative;
  padding-left: 1.25rem;
  margin-bottom: 0.75rem;
  color: var(--bs-secondary-color);
}

.terms-content li::before {
  content: "•";
  position: absolute;
  left: 0;
  color: var(--bs-primary);
}

.modal-content {
  border: none;
  border-radius: 1rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}

.modal-header {
  padding: 1.5rem 1.5rem 1rem;
}

.modal-body {
  padding: 2rem;
}

.modal-footer {
  padding: 1rem 1.5rem 1.5rem;
}

.btn {
  padding: 0.5rem 1.5rem;
  border-radius: 0.5rem;
}

.btn-light {
  background-color: var(--bs-gray-100);
  border-color: var(--bs-gray-100);
}

.btn-light:hover {
  background-color: var(--bs-gray-200);
  border-color: var(--bs-gray-200);
}

/* 深色模式适配 */
:root[data-bs-theme="dark"] .modal-content {
  background-color: var(--bs-dark);
  border: 1px solid var(--bs-border-color);
}

:root[data-bs-theme="dark"] .btn-light {
  background-color: var(--bs-gray-800);
  border-color: var(--bs-gray-800);
  color: var(--bs-body-color);
}

:root[data-bs-theme="dark"] .btn-light:hover {
  background-color: var(--bs-gray-700);
  border-color: var(--bs-gray-700);
}
</style> 