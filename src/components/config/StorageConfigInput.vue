<template>
  <n-p>
    <n-form-item label="Name">
      <n-input v-model:value="config.name" />
    </n-form-item>
    <n-form-item label="Endpoint">
      <n-input v-model:value="config.endpoint" />
    </n-form-item>
    <n-form-item label="Access Key ID">
      <n-input v-model:value="config.accessKeyId" />
    </n-form-item>
    <n-form-item label="Secret Access Key">
      <n-input v-model:value="config.secretAccessKey" type="password" show-password-on="click" />
    </n-form-item>
    <n-form-item label="Bucket">
      <n-dynamic-tags v-model:value="config.buckets" />
    </n-form-item>
  </n-p>
</template>

<script setup lang="ts">
import type { StorageConfig } from '@/stores/config'
import { useVModel } from '@vueuse/core'
import { NInput, NFormItem, NDynamicTags, NP } from 'naive-ui'

const props = defineProps<{
  config: StorageConfig
}>()
const emit = defineEmits(['update:config'])

const config = useVModel(props, 'config', emit)
</script>
