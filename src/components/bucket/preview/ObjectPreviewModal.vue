<template>
  <n-modal v-model:show="show" style="max-width: calc(100vw - 4em)">
    <n-card :title="object?.Key">
      <template #header-extra>
        <DownloadButton :object="object" v-if="object" />
      </template>
      <CodePreview :blob="blob" v-if="blob && !evaluating" :object="object" />
    </n-card>
  </n-modal>
</template>

<script setup lang="ts">
import { type _Object, type S3Client, GetObjectCommand } from '@aws-sdk/client-s3'
import { useVModel, computedAsync } from '@vueuse/core'
import { NModal, NCard } from 'naive-ui'
import DownloadButton from '../DownloadButton.vue'
import CodePreview from './CodePreview.vue'
import { inject, type Ref, ref } from 'vue'

const props = defineProps<{
  object?: _Object
  show: boolean
}>()

const emit = defineEmits(['update:show'])

const show = useVModel(props, 'show', emit)

const client = inject<Ref<S3Client>>('client')
const bucket = inject<Ref<string>>('bucket')
const evaluating = ref(false)

const blob = computedAsync(
  async () => {
    if (!client?.value || !bucket?.value || !props.object) {
      return
    }

    const response = await client.value.send(
      new GetObjectCommand({ Bucket: bucket.value, Key: props.object.Key })
    )

    console.log(response)

    return new Response(response.Body?.transformToWebStream()).blob()
  },
  null,
  { evaluating }
)
</script>
