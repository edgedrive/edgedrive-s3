<template>
  <n-list hoverable clickable>
    <n-list-item
      @click="emit('update:bucket', bucket)"
      v-for="bucket in storage.buckets"
      :key="bucket"
    >
      <template #prefix>
        <n-icon><Database20Regular /></n-icon>
      </template>
      <n-text>{{ bucket }}</n-text>
    </n-list-item>
  </n-list>
</template>

<script setup lang="ts">
import { NList, NListItem, NIcon } from 'naive-ui'
import type { StorageConfig } from '@/stores/config'
import { Database20Regular } from '@vicons/fluent'

defineProps<{
  storage: StorageConfig
}>()

const emit = defineEmits(['update:bucket'])
</script>
