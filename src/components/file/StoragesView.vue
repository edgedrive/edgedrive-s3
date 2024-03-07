<template>
  <n-list hoverable clickable>
    <n-list-item
      @click="emit('update:storage', storage)"
      v-for="storage in storages"
      :key="storage.id"
    >
      <template #prefix>
        <n-icon><Database20Regular /></n-icon>
      </template>
      <n-text>{{ storage.name }}</n-text>
    </n-list-item>
  </n-list>
</template>

<script setup lang="ts">
import { NList, NListItem, NIcon } from 'naive-ui'
import { Database20Regular } from '@vicons/fluent'
import { useConfigStore } from '@/stores/config'
import { computed } from 'vue'

const configStore = useConfigStore()

const emit = defineEmits(['update:storage'])

const storages = computed(() => {
  return configStore.config.storages
})
</script>
