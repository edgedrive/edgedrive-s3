<template>
  <n-button quaternary circle @click.stop.prevent="download" tag="a" :href="objectURL" download>
    <template #icon>
      <n-icon><ArrowDownload16Regular /></n-icon>
    </template>
  </n-button>
</template>

<script setup lang="ts">
import { type _Object, type S3Client } from '@aws-sdk/client-s3'
import { NIcon, NButton } from 'naive-ui'
import { ArrowDownload16Regular } from '@vicons/fluent'
import { inject, toRef, type Ref } from 'vue'
import { useObjectPresignedUrl } from '@/composables/s3/use-object-presigned-url'

const props = defineProps<{
  object: _Object
}>()

const client = inject<Ref<S3Client>>('client') as Ref<S3Client>
const bucket = inject<Ref<string>>('bucket') as Ref<string>
const object = toRef(props, 'object')

const { url: objectURL } = useObjectPresignedUrl(client, bucket, object, 3600)

const download = async () => {
  window.open(objectURL.value, '_blank')
}
</script>
