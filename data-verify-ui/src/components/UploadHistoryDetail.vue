<template>
  <a-modal :open="visible" @update:open="emitClose" title="上传详情" :footer="null" width="420px">
    <a-descriptions bordered column="1" size="middle">
      <a-descriptions-item label="上传时间">{{ detail.time }}</a-descriptions-item>
      <a-descriptions-item label="文件名">{{ detail.name }}</a-descriptions-item>
      <a-descriptions-item label="文件大小">{{ formatSize(detail.size) }}</a-descriptions-item>
      <a-descriptions-item label="文件条数">{{ detail.count }}</a-descriptions-item>
    </a-descriptions>
  </a-modal>
</template>

<script setup>
const props = defineProps({
  visible: Boolean,
  detail: Object
})
const emit = defineEmits(['update:visible'])
function emitClose(val) {
  if (!val) emit('update:visible', false)
}
function formatSize(size) {
  if (typeof size === 'string') return size
  if (size < 1024) return size + ' B'
  if (size < 1024 * 1024) return (size / 1024).toFixed(2) + ' KB'
  return (size / 1024 / 1024).toFixed(2) + ' MB'
}
</script> 