<template>
  <n-button quaternary circle @click="download">
    <template #icon>
      <n-icon><ArrowDownload16Regular /></n-icon>
    </template>
  </n-button>
</template>

<script setup lang="ts">
import { type _Object, type S3Client, GetObjectCommand } from '@aws-sdk/client-s3'
import { NIcon, NButton } from 'naive-ui'
import { ArrowDownload16Regular } from '@vicons/fluent'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { inject, type Ref } from 'vue'

const props = defineProps<{
  object: _Object
}>()

const client = inject<Ref<S3Client>>('client')
const bucket = inject<Ref<string>>('bucket')

const download = async () => {
  if (!client?.value || !bucket?.value) {
    return
  }

  const url = await getSignedUrl(
    client?.value,
    new GetObjectCommand({ Bucket: bucket?.value, Key: props.object.Key }),
    {
      expiresIn: 3600
    }
  )

  window.open(url, '_blank')
}
</script>
