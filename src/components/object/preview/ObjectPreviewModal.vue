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
  // check extensions
  const keyLowered = object.value?.Key?.toLowerCase() ?? ''

  if (keyLowered.endsWith('.epub')) {
    return defineAsyncComponent(() => import('./previews/EPUBPreview.vue'))
  }

  const officeExtensions = ['.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx']
  if (officeExtensions.some((ext) => keyLowered.endsWith(ext))) {
    return defineAsyncComponent(() => import('./previews/OfficePreview.vue'))
  }

  const codeExtensions = [
    '.ts',
    '.js',
    '.json',
    '.xml',
    '.yaml',
    '.yml',
    '.md',
    '.html',
    '.css',
    '.scss',
    '.less',
    '.vue',
    '.py',
    '.java',
    '.c',
    '.cpp',
    '.h',
    '.hpp',
    '.cs',
    '.go',
    '.rs',
    '.rb',
    '.php',
    '.sh',
    '.bash',
    '.zsh',
    '.ps1',
    '.bat',
    '.cmd',
    '.sql',
    '.pl',
    '.perl',
    '.r'
  ]
  if (codeExtensions.some((ext) => keyLowered.endsWith(ext))) {
    return defineAsyncComponent(() => import('./previews/CodePreview.vue'))
  }

  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg']
  if (imageExtensions.some((ext) => keyLowered.endsWith(ext))) {
    return defineAsyncComponent(() => import('./previews/ImagePreview.vue'))
  }

  const videoExtensions = ['.mp4', '.webm', '.ogg', '.avi', '.mov', '.flv', '.wmv']
  if (videoExtensions.some((ext) => keyLowered.endsWith(ext))) {
    return defineAsyncComponent(() => import('./previews/VideoPreview.vue'))
  }

  if (keyLowered.endsWith('.pdf')) {
    return defineAsyncComponent(() => import('./previews/PDFPreview.vue'))
  }

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
