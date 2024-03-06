<template>
  <n-modal v-model:show="show" style="max-width: calc(100vw - 4em)">
    <n-card :title="object?.Key">
      <template #header-extra>
        <DownloadButton :object="object" v-if="object" />
      </template>
      <template v-if="blob && !evaluating && object">
        <CodePreview
          :blob="blob"
          :object="object"
          v-if="objectInfo?.ContentType?.includes('text')"
        />
        <ImagePreview :blob="blob" v-if="objectInfo?.ContentType?.includes('image')" />
      </template>
    </n-card>
  </n-modal>
</template>

<script setup lang="ts">
import {
  type _Object,
  type S3Client,
  GetObjectCommand,
  HeadObjectCommand
} from '@aws-sdk/client-s3'
import { useVModel, computedAsync } from '@vueuse/core'
import { NModal, NCard } from 'naive-ui'
import DownloadButton from '../DownloadButton.vue'
import { inject, type Ref, ref } from 'vue'

import CodePreview from './CodePreview.vue'
import ImagePreview from './ImagePreview.vue'

const props = defineProps<{
  object?: _Object
  show: boolean
}>()

const emit = defineEmits(['update:show'])

const show = useVModel(props, 'show', emit)

const client = inject<Ref<S3Client>>('client')
const bucket = inject<Ref<string>>('bucket')

const infoEvaluating = ref(false)
const evaluating = ref(false)

const objectInfo = computedAsync(
  async () => {
    if (!client?.value || !bucket?.value || !props.object) {
      return
    }

    const response = await client.value.send(
      new HeadObjectCommand({ Bucket: bucket.value, Key: props.object.Key })
    )

    return response
  },
  null,
  { evaluating: infoEvaluating }
)

const blob = computedAsync(
  async () => {
    if (!client?.value || !bucket?.value || !props.object) {
      return
    }

    const response = await client.value.send(
      new GetObjectCommand({ Bucket: bucket.value, Key: props.object.Key })
    )

    return new Response(response.Body?.transformToWebStream()).blob()
  },
  null,
  { evaluating }
)
</script>
