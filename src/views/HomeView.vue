<script setup lang="ts">
import ConfigInput from '@/components/config/ConfigInput.vue'
import StorageSelect from '@/components/storage/StorageSelect.vue'
import { useConfigStore, type StorageConfig } from '@/stores/config'
import { ref, computed } from 'vue'
import { NCollapse, NCollapseItem, NP } from 'naive-ui'
import FileView from '@/components/file/FileView.vue'

const configStore = useConfigStore()

const storage = ref<StorageConfig | undefined>(configStore.config?.storages?.[0])
const bucket = ref<string | undefined>(configStore.config.storages?.[0]?.buckets?.[0])

const buckets = computed(() => {
  return storage.value?.buckets || []
})
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

    <StorageSelect v-model:storage="storage" :storages="configStore.config.storages" />
    <FileView v-model:storage="storage" v-model:bucket="bucket" />
  </main>
</template>
