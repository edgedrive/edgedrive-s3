<script setup lang="ts">
import ConfigInput from '@/components/config/ConfigInput.vue'
import StorageSelect from '@/components/storage/StorageSelect.vue'
import BucketSelect from '@/components/bucket/BucketSelect.vue'
import BucketView from '@/components/bucket/BucketView.vue'
import { useConfigStore } from '@/stores/config'
import { ref, computed } from 'vue'
import { NCollapse, NCollapseItem, NP } from 'naive-ui'

const configStore = useConfigStore()

const storageID = ref<string | undefined>(configStore.config.storages[0]?.id)
const bucket = ref<string | undefined>(configStore.config.storages?.[0]?.buckets?.[0])

const selectedConfig = computed(() => {
  return configStore.config.storages.find((storage) => storage.id === storageID.value)
})
const buckets = computed(() => {
  return selectedConfig.value?.buckets || []
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

    <StorageSelect v-model:storageID="storageID" :storages="configStore.config.storages" />
    <BucketSelect v-model:bucket="bucket" :buckets="buckets" />
    <BucketView
      v-if="bucket && selectedConfig"
      :endpoint="selectedConfig?.endpoint"
      :accessKeyId="selectedConfig?.accessKeyId"
      :secretAccessKey="selectedConfig?.secretAccessKey"
      :bucket="bucket"
    />
  </main>
</template>
