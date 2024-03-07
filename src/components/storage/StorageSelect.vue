<template>
  <n-form-item label="Storage">
    <n-select v-model:value="storageID" :options="options" />
  </n-form-item>
</template>

<script setup lang="ts">
import { NSelect, NFormItem } from 'naive-ui'
import type { StorageConfig } from '@/stores/config'
import { computed, toRef } from 'vue'

const props = defineProps<{
  storage?: StorageConfig
  storages: StorageConfig[]
}>()

const storage = toRef(props, 'storage')

const emit = defineEmits(['update:storage'])
const storageID = computed({
  get() {
    return storage.value?.id
  },
  set: (id: string | undefined) => {
    emit(
      'update:storage',
      props.storages.find((storage) => storage.id === id)
    )
  }
})

const options = computed(() => {
  return props.storages.map((storage) => {
    return {
      value: storage.id,
      label: storage.name
    }
  })
})
</script>
