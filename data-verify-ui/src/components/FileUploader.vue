<template>
  <div class="layout-root">
    <SideNav />
    <div class="main-area">
      <header class="page-header">
        <h1>数据包校验</h1>
        <div class="desc">支持单文件上传，上传后自动记录历史，可搜索和查看详情。</div>
      </header>
      <div class="upload-section">
        <a-upload
          :before-upload="beforeUpload"
          :show-upload-list="false"
          @change="handleChange"
        >
          <!-- <a-button type="primary" size="large" icon="upload-outlined">选择文件上传</a-button> -->
          <a-button type="primary" size="large">
            <template #icon>
              <UploadOutlined />
            </template>
            选择文件上传
          </a-button>
        </a-upload>
        <div v-if="fileInfo" class="file-info">
          <a-descriptions title="文件信息" bordered size="small">
            <a-descriptions-item label="文件名">{{ fileInfo.name }}</a-descriptions-item>
            <a-descriptions-item label="类型">{{ fileInfo.type }}</a-descriptions-item>
            <a-descriptions-item label="大小">{{ formatSize(fileInfo.size) }}</a-descriptions-item>
            <a-descriptions-item label="最后修改">{{ formatDate(fileInfo.lastModified) }}</a-descriptions-item>
          </a-descriptions>
        </div>
      </div>
      <div class="history-section">
        <div class="history-header">
          <a-input-search
            v-model:value="search"
            placeholder="搜索文件名"
            style="max-width: 320px"
            allow-clear
          />
        </div>
        <a-table
          :columns="columns"
          :data-source="filteredHistory"
          :pagination="{ pageSize: 10 }"
          row-key="id"
          class="history-table"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'action'">
              <a-button type="link" @click="showDetail(record)">查看详情</a-button>
            </template>
          </template>
        </a-table>
      </div>
      <UploadHistoryDetail
        v-if="detailVisible"
        :visible="detailVisible"
        :detail="detailRecord"
        @update:visible="detailVisible = false"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { UploadOutlined } from '@ant-design/icons-vue'
import { mockUpload } from '../api/upload.js'
import SideNav from './SideNav.vue'
import UploadHistoryDetail from './UploadHistoryDetail.vue'

const fileInfo = ref(null)
const search = ref('')
const history = ref([]) // 历史上传记录
const detailVisible = ref(false)
const detailRecord = ref({})

const columns = [
  { title: '上传时间', dataIndex: 'time', key: 'time', width: 160 },
  { title: '文件名', dataIndex: 'name', key: 'name', width: 220 },
  { title: '文件大小', dataIndex: 'size', key: 'size', width: 120 },
  { title: '文件条数', dataIndex: 'count', key: 'count', width: 100 },
  { title: '操作', key: 'action', width: 100 }
]

function beforeUpload(file) {
  return false
}

async function handleChange(info) {
  let file = info.file && info.file.originFileObj
  if (!file && info.fileList && info.fileList.length > 0) {
    file = info.fileList[info.fileList.length - 1].originFileObj
  }
  if (!file) return
  fileInfo.value = file
  // 模拟上传
  await mockUpload(file)
  // 添加到历史
  history.value.unshift({
    id: Date.now() + Math.random(),
    time: formatDate(new Date()),
    name: file.name,
    size: formatSize(file.size),
    count: 1 // 单文件
  })
}

function formatSize(size) {
  if (size < 1024) return size + ' B'
  if (size < 1024 * 1024) return (size / 1024).toFixed(2) + ' KB'
  return (size / 1024 / 1024).toFixed(2) + ' MB'
}
function formatDate(ts) {
  const d = new Date(ts)
  return d.toLocaleString()
}

const filteredHistory = computed(() => {
  if (!search.value) return history.value
  return history.value.filter(item =>
    item.name.toLowerCase().includes(search.value.trim().toLowerCase())
  )
})

function showDetail(record) {
  detailRecord.value = record
  detailVisible.value = true
}
</script>

<style scoped>
.layout-root {
  display: flex;
  height: 100vh;
  width: 100vw;
  background: #f5f7fa;
}
.main-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
  height: 100vh;
  padding: 0 16px 0 16px;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8edff 100%);
  overflow: hidden;
}
.page-header {
  text-align: left;
  margin: 32px 0 24px 0;
}
.page-header h1 {
  font-size: 2rem;
  font-weight: 700;
  color: #2b3a55;
  margin-bottom: 8px;
}
.page-header .desc {
  color: #6b7a99;
  font-size: 1.1rem;
}
.upload-section {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 4px 24px 0 rgba(0,0,0,0.08);
  padding: 24px 16px;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  margin-bottom: 0;
  overflow: hidden;
}
.file-info {
  margin-top: 20px;
}
.history-section {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 4px 24px 0 rgba(0,0,0,0.08);
  padding: 24px 16px;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  margin-top: 0;
  margin-bottom: 0;
  overflow: hidden;
}
.history-header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 18px;
}
.history-table {
  margin-top: 0;
}
</style> 