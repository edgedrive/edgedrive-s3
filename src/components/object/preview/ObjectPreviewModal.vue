<template>
  <n-modal v-model:show="show" style="max-width: calc(100vw - 4em); max-height: calc(100vh - 4em)">
    <n-card :title="object?.Key" content-style="overflow: auto;">
      <template #header-extra>
        <DownloadButton :object="object" v-if="object" />
      </template>
      <template v-if="url && !evaluating && object && !infoEvaluating">
        <component :is="previewComponent" :url="url" :object="object" :head="objectInfo" />
      </template>
    </n-card>
  </n-modal>
</template>

<script setup lang="ts">
import { type _Object, type S3Client } from '@aws-sdk/client-s3'
import { useVModel } from '@vueuse/core'
import { NModal, NCard } from 'naive-ui'
import DownloadButton from '../download/DownloadButton.vue'
import { inject, type Ref, toRef, computed, defineAsyncComponent, type Component } from 'vue'
import { useObjectHead } from '@/composables/s3/use-object-head'
import { useObjectPresignedUrl } from '@/composables/s3/use-object-presigned-url'

const props = defineProps<{
  object?: _Object
  show: boolean
}>()

const emit = defineEmits(['update:show'])

const show = useVModel(props, 'show', emit)

const client = inject<Ref<S3Client>>('client') as Ref<S3Client>
const bucket = inject<Ref<string>>('bucket') as Ref<string>
const object = toRef(props, 'object')

const { head: objectInfo, evaluating: infoEvaluating } = useObjectHead(client, bucket, object)
const { url, evaluating } = useObjectPresignedUrl(client, bucket, object, 3600)

const previewComponent = computed<Component>(() => {
  const contentType = objectInfo?.value?.ContentType ?? ''
  if (contentType.includes('officedocument')) {
    return defineAsyncComponent(() => import('./previews/OfficePreview.vue'))
  }

  if (
    contentType.includes('text') ||
    contentType.includes('json') ||
    contentType.includes('xml') ||
    contentType.includes('yaml') ||
    object.value?.Key?.endsWith('.ts')
  ) {
    return defineAsyncComponent(() => import('./previews/CodePreview.vue'))
  }

  if (contentType.includes('image')) {
    return defineAsyncComponent(() => import('./previews/ImagePreview.vue'))
  }

  if (contentType.includes('video')) {
    return defineAsyncComponent(() => import('./previews/VideoPreview.vue'))
  }

  if (contentType.includes('pdf')) {
    return defineAsyncComponent(() => import('./previews/PDFPreview.vue'))
  }

  return defineAsyncComponent(() => import('./previews/UnknownPreview.vue'))
})
</script>
