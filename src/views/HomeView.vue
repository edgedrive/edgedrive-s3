<script setup lang="ts">
import ConfigInput from '@/components/config/ConfigInput.vue'
import { useConfigStore, type StorageConfig } from '@/stores/config'
import { ref } from 'vue'
import { NCollapse, NCollapseItem, NP } from 'naive-ui'
import FileView from '@/components/file/FileView.vue'

const configStore = useConfigStore()

const storage = ref<StorageConfig | undefined>(configStore.config?.storages?.[0])
const bucket = ref<string | undefined>(configStore.config.storages?.[0]?.buckets?.[0])
</script>

<template>
  <main style="padding: 3em">
    <n-p>
      <n-collapse>
        <n-collapse-item title="Config" name="config">
          <ConfigInput />
        </n-collapse-item>
      </n-collapse>
    </n-p>

    <FileView v-model:storage="storage" v-model:bucket="bucket" />
  </main>
</template>
