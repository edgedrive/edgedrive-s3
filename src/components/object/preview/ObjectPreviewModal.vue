<template>
  <n-modal v-model:show="show" style="max-width: calc(100vw - 4em); max-height: calc(100vh - 4em)">
    <n-card :title="object?.Key">
      <template #header-extra>
        <DownloadButton :object="object" v-if="object" />
      </template>
      <template v-if="url && !evaluating && object">
        <CodePreview :url="url" :object="object" v-if="objectInfo?.ContentType?.includes('text') ||
          objectInfo?.ContentType?.includes('json') ||
          objectInfo?.ContentType?.includes('xml') ||
          objectInfo?.ContentType?.includes('yaml')" />
        <ImagePreview :url="url" v-if="objectInfo?.ContentType?.includes('image')" />
        <PDFPreview :url="url" v-if="objectInfo?.ContentType?.includes('pdf')" />
      </template>
    </n-card>
  </n-modal>
</template>

<script setup lang="ts">
import { type _Object, type S3Client } from '@aws-sdk/client-s3'
import { useVModel } from '@vueuse/core'
import { NModal, NCard } from 'naive-ui'
import DownloadButton from '../download/DownloadButton.vue'
import { inject, type Ref, toRef } from 'vue'
import { useObjectHead } from '@/composables/s3/use-object-head'
import { useObjectPresignedUrl } from '@/composables/s3/use-object-presigned-url'

import CodePreview from './previews/CodePreview.vue'
import ImagePreview from './previews/ImagePreview.vue'
import PDFPreview from './previews/PDFPreview.vue'

const props = defineProps<{
  object?: _Object
  show: boolean
}>()

const emit = defineEmits(['update:show'])

const show = useVModel(props, 'show', emit)

const client = inject<Ref<S3Client>>('client') as Ref<S3Client>
const bucket = inject<Ref<string>>('bucket') as Ref<string>
const object = toRef(props, 'object')

const { head: objectInfo } = useObjectHead(client, bucket, object)
const { url, evaluating } = useObjectPresignedUrl(client, bucket, object, 3600)
</script>
