<script setup lang="ts">
import { useConfigStore, type StorageConfig } from '@/stores/config'
import { ref } from 'vue'
import FileView from '@/components/file/FileView.vue'
import ConfigModal from '@/components/config/ConfigModal.vue'

const configStore = useConfigStore()

const storage = ref<StorageConfig | undefined>(configStore.config?.storages?.[0])
const bucket = ref<string | undefined>(configStore.config.storages?.[0]?.buckets?.[0])
</script>

<template>
  <main style="padding: 3em">
    <FileView v-model:storage="storage" v-model:bucket="bucket" />
    <ConfigModal />
  </main>
</template>
