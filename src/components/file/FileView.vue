<template>
  <div>
    <PathBreadcrumb v-model:prefix="prefix" v-model:bucket="bucket" v-model:storage="storage" />
    <BucketView
      :storage="storage"
      :bucket="bucket"
      v-model:prefix="prefix"
      v-if="storage && bucket"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PathBreadcrumb from './PathBreadcrumb.vue'
import type { StorageConfig } from '@/stores/config'
import { useVModels } from '@vueuse/core'
import BucketView from '@/components/bucket/BucketView.vue'

const prefix = ref('')

const props = defineProps<{
  storage?: StorageConfig
  bucket?: string
}>()
const emit = defineEmits(['update:bucket', 'update:storage'])
const { storage, bucket } = useVModels(props, emit)
</script>
