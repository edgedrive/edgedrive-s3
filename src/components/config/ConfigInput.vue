<script setup lang="ts">
import { useConfigStore } from '@/stores/config'
import StorageConfigInput from './StorageConfigInput.vue'
import { NButton, NCode, NH2, NP } from 'naive-ui'

const configStore = useConfigStore()
</script>

<template>
  <div>
    <n-h2>Configs</n-h2>
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

    <n-h2>Config Store</n-h2>
    <n-code :code="JSON.stringify(configStore.config, null, 2)"></n-code>
  </div>
</template>
./StorageConfigInput.vue
