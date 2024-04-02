<template>
  <n-modal v-model:show="configStore.showConfigModal">
    <n-card style="max-width: 90vw; max-height: 90vh; overflow: auto" title="Config">
      <ConfigInput />
    </n-card>
  </n-modal>
</template>

<script setup lang="ts">
import ConfigInput from './ConfigInput.vue'
import { NModal, NCard } from 'naive-ui'
import { useConfigStore } from '@/stores/config'

const configStore = useConfigStore()
</script>
