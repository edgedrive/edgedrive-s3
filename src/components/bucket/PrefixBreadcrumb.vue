<template>
  <n-breadcrumb>
    <n-breadcrumb-item @click="resetStorage"> @ </n-breadcrumb-item>
    <n-breadcrumb-item @click="resetBucket" v-if="storage">{{ storage.name }}</n-breadcrumb-item>
    <n-breadcrumb-item @click="prefix = ''" v-if="bucket">{{ bucket }}</n-breadcrumb-item>

    <n-breadcrumb-item v-for="part in parts" :key="part" @click="prefix = part">
      {{ part.replace(/\/$/, '').split('/').pop() }}
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>

<script setup lang="ts">
import { NBreadcrumb, NBreadcrumbItem } from 'naive-ui'
import { computed } from 'vue'
import type { StorageConfig } from '@/stores/config'
import { useVModels } from '@vueuse/core'

const props = defineProps<{
  storage?: StorageConfig
  bucket?: string
  prefix: string
}>()

const emit = defineEmits(['update:prefix', 'update:storage', 'update:bucket'])

const { storage, bucket, prefix } = useVModels(props, emit)

const parts = computed(() => {
  // prefix is src/a/b/c/d/
  // return src/ src/a/ src/a/b/ src/a/b/c/ src/a/b/c/d/
  const parts = props.prefix.split('/')
  return parts.map((part, index) => {
    return parts.slice(0, index + 1).join('/') + '/'
  })
})

const resetBucket = () => {
  bucket.value = undefined
  prefix.value = ''
}

const resetStorage = () => {
  storage.value = undefined
  resetBucket()
}
</script>
