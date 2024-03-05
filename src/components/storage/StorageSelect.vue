<template>
  <n-form-item label="Storage">
    <n-select v-model:value="storageID" :options="options" />
  </n-form-item>
</template>

<script setup lang="ts">
import { NSelect, NFormItem } from 'naive-ui'
import type { StorageConfig } from '@/stores/config'
import { useVModel } from '@vueuse/core'
import { computed } from 'vue'

const props = defineProps<{
  storageID?: string
  storages: StorageConfig[]
}>()

const emit = defineEmits(['update:storageID'])

const storageID = useVModel(props, 'storageID', emit)

const options = computed(() => {
  return props.storages.map((storage) => {
    return {
      value: storage.id,
      label: storage.name
    }
  })
})
</script>
