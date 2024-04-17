<template>
  <n-result status="404" title="No Storages" style="margin-top: 5em">
    <template #footer>
      <n-button @click="configStore.showConfigModal = true">Open Settings</n-button>
    </template>
  </n-result>
</template>

<script setup lang="ts">
import { NResult, NButton } from 'naive-ui'
import { useConfigStore } from '@/stores/config'

const configStore = useConfigStore()
</script>
