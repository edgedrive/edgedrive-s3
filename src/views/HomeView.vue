<script setup lang="ts">
import { useConfigStore, type StorageConfig } from '@/stores/config'
import { ref } from 'vue'
import FileView from '@/components/file/FileView.vue'
import ConfigModal from '@/components/config/ConfigModal.vue'
import { NH1, NDivider } from 'naive-ui'
import ShowConfigModalButton from '@/components/config/ShowConfigModalButton.vue'

const configStore = useConfigStore()

const storage = ref<StorageConfig | undefined>(configStore.config?.storages?.[0])
const bucket = ref<string | undefined>(configStore.config.storages?.[0]?.buckets?.[0])
</script>

<template>
  <main style="padding: 3em">
    <div style="display: flex; justify-content: space-between; align-items: center">
      <n-h1 style="margin-bottom: 0; font-size: 2em">EdgeDrive S3</n-h1>
      <div>
        <ShowConfigModalButton />
      </div>
    </div>
    <n-divider></n-divider>

    <FileView v-model:storage="storage" v-model:bucket="bucket" />
    <ConfigModal />
  </main>
</template>
