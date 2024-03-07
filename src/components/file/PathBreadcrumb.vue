<template>
  <n-breadcrumb>
    <n-breadcrumb-item @click="resetStorage"> @ </n-breadcrumb-item>
    <n-breadcrumb-item v-if="storage">
      <n-dropdown :options="storageOptions" @select="handleStorageChange">
        <span @click="resetBucket">
          {{ storage.name }}
        </span>
      </n-dropdown>
    </n-breadcrumb-item>
    <n-breadcrumb-item v-if="bucket">
      <n-dropdown :options="bucketOptions" @select="handleBucketChange">
        <span @click="prefix = ''">
          {{ bucket }}
        </span>
      </n-dropdown>
    </n-breadcrumb-item>

    <n-breadcrumb-item v-for="part in parts" :key="part" @click="prefix = part">
      {{ part.replace(/\/$/, '').split('/').pop() }}
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>

<script setup lang="ts">
import { NBreadcrumb, NBreadcrumbItem, NDropdown } from 'naive-ui'
import { computed } from 'vue'
import type { StorageConfig } from '@/stores/config'
import { useVModels } from '@vueuse/core'
import { useConfigStore } from '@/stores/config'

const configStore = useConfigStore()

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

const bucketOptions = computed(() => {
  if (!storage.value) {
    return []
  } else {
    return storage.value.buckets.map((bucket) => {
      return {
        label: bucket,
        key: bucket
      }
    })
  }
})

const handleBucketChange = (bucket: string) => {
  emit('update:bucket', bucket)
  prefix.value = ''
}

const storageOptions = computed(() => {
  return configStore.config?.storages.map((storage) => {
    return {
      label: storage.name,
      key: storage.id
    }
  })
})

const handleStorageChange = (storageID: string) => {
  storage.value = configStore.config?.storages.find((storage) => storage.id === storageID)
  resetBucket()
}

const resetStorage = () => {
  storage.value = undefined
  bucket.value = undefined
  prefix.value = ''
}

const resetBucket = () => {
  bucket.value = undefined
  prefix.value = ''
}
</script>
