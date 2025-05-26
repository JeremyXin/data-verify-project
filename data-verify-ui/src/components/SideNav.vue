<template>
  <div class="side-nav">
  <div class="logo">数据平台</div>
    <a-menu mode="inline" :selected-keys="['upload']" class="nav-menu">
      <a-menu-item key="upload">
        <template #icon><upload-outlined /></template>
        数据包校验
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script setup>
import { UploadOutlined } from '@ant-design/icons-vue'
</script>

<style scoped>
.side-nav {
  width: 210px;
  min-height: 100vh;
  background: #fff;
  box-shadow: 2px 0 12px 0 rgba(80,120,255,0.06);
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #2b3a55;
  padding: 32px 0 24px 0;
  text-align: center;
  letter-spacing: 2px;
}
.nav-menu {
  border: none;
  font-size: 1.1rem;
}
</style> 