<template>
  <n-button quaternary circle @click="configStore.showConfigModal = true">
    <template #icon>
      <n-icon><Settings16Regular /></n-icon>
    </template>
  </n-button>
</template>

<script setup lang="ts">
import { NButton, NIcon } from 'naive-ui'
import { useConfigStore } from '@/stores/config'
import { Settings16Regular } from '@vicons/fluent'

const configStore = useConfigStore()
</script>
