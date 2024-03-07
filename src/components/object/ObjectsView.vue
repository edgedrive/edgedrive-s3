<template>
  <div>
    <UploadButton :prefix="prefix" />
    <RefreshButton @click="updateObjects" />
    <DirectoryAndObjectRows
      :objects="objects"
      :directorys="directorys"
      @update:prefix="prefix = $event"
    />
    <InfoModal v-model:show="infoModalShow" :object="infoModalObject" />
    <ObjectPreviewModal v-model:show="previewModalShow" :object="previewModalObject" />
  </div>
</template>

<script setup lang="ts">
import { S3Client, ListObjectsV2Command, type _Object } from '@aws-sdk/client-s3'
import { onMounted, computed, ref, watch } from 'vue'
import DirectoryAndObjectRows from './list/DirectoryAndObjectRows.vue'
import InfoModal from './info/InfoModal.vue'
import ObjectPreviewModal from './preview/ObjectPreviewModal.vue'
import { provide } from 'vue'
import UploadButton from './upload/UploadButton.vue'
import RefreshButton from './refresh/RefreshButton.vue'
import type { StorageConfig } from '@/stores/config'
import { useVModels } from '@vueuse/core'
import { toRef } from 'vue'

const objects = ref<_Object[]>([])
const directorys = ref<string[]>([])
const infoModalObject = ref<_Object | undefined>()
const infoModalShow = ref(false)
const previewModalObject = ref<_Object | undefined>()
const previewModalShow = ref(false)

const props = defineProps<{
  storage: StorageConfig
  bucket: string
  prefix: string
}>()
const emit = defineEmits(['update:prefix'])
const { prefix } = useVModels(props, emit)
const bucket = toRef(props, 'bucket')

const client = computed(() => {
  return new S3Client({
    endpoint: props.storage.endpoint,
    credentials: {
      accessKeyId: props.storage.accessKeyId,
      secretAccessKey: props.storage.secretAccessKey
    },
    region: 'auto'
  })
})

provide('client', client)
provide('bucket', bucket)
provide('infoModalObject', infoModalObject)
provide('infoModalShow', infoModalShow)
provide('previewModalObject', previewModalObject)
provide('previewModalShow', previewModalShow)

async function updateObjects() {
  const command = new ListObjectsV2Command({
    Bucket: props.bucket,
    Prefix: prefix.value,
    Delimiter: '/'
  })
  const response = await client.value.send(command)

  if (response.Contents) {
    objects.value = response.Contents
  } else {
    objects.value = []
  }

  if (response.CommonPrefixes) {
    const prefixs = response.CommonPrefixes.map((prefix) => prefix.Prefix)
    directorys.value = prefixs.filter((prefix) => prefix !== undefined) as string[]
  } else {
    directorys.value = []
  }
}

onMounted(() => {
  updateObjects()
})

watch(prefix, () => {
  updateObjects()
})
</script>
