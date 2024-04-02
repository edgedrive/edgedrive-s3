<script setup lang="ts">
import { useConfigStore } from '@/stores/config'
import StorageConfigInput from './StorageConfigInput.vue'
import { NButton, NP } from 'naive-ui'

const configStore = useConfigStore()
</script>

<template>
  <div>
    <n-p>
      <StorageConfigInput
        :config="config"
        v-for="config in configStore.config.storages"
        :key="config.id"
        @remove="configStore.removeStorage(config.id)"
      />
    </n-p>

    <n-p>
      <n-button type="primary" @click="configStore.addStorage"> Add Storage Config </n-button>
    </n-p>
  </div>
</template>
