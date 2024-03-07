<template>
  <n-form-item label="Bucket">
    <n-select v-model:value="bucket" :options="options" />
  </n-form-item>
</template>

<script setup lang="ts">
import { NSelect, NFormItem } from 'naive-ui'
import { useVModel } from '@vueuse/core'
import { computed } from 'vue'

const props = defineProps<{
  bucket?: string
  buckets: string[]
}>()

const emit = defineEmits(['update:bucket'])

const bucket = useVModel(props, 'bucket', emit)

const options = computed(() => {
  return props.buckets.map((bucket) => {
    return {
      value: bucket,
      label: bucket
    }
  })
})
</script>
