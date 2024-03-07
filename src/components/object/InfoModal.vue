<template>
  <n-modal v-model:show="show" style="max-width: calc(100vw - 4em)">
    <n-card title="Object Info">
      <n-descriptions label-placement="left" bordered :column="1">
        <n-descriptions-item label="Key">
          <span>{{ object?.Key }}</span>
        </n-descriptions-item>
        <n-descriptions-item label="Size">
          <n-skeleton text style="width: 17em" v-if="evaluating" />
          <span v-else>{{ objectInfo?.ContentLength }}</span>
        </n-descriptions-item>
        <n-descriptions-item label="Content Type">
          <n-skeleton text style="width: 17em" v-if="evaluating" />
          <span v-else>{{ objectInfo?.ContentType }}</span>
        </n-descriptions-item>
        <n-descriptions-item label="ETag">
          <n-skeleton text style="width: 17em" v-if="evaluating" />
          <span v-else>{{ objectInfo?.ETag }}</span>
        </n-descriptions-item>
        <n-descriptions-item label="Last Modified">
          <n-skeleton text style="width: 17em" v-if="evaluating" />
          <n-popover v-else>
            <template #trigger>
              <span>
                <n-time :time="objectInfo?.LastModified" v-if="objectInfo?.LastModified" />
                /
                <n-time
                  :time="objectInfo?.LastModified"
                  v-if="objectInfo?.LastModified"
                  :to="now"
                  type="relative"
                />
              </span>
            </template>
            <span>Timestamp (ms): {{ objectInfo?.LastModified?.getTime() }}</span>
          </n-popover>
        </n-descriptions-item>
      </n-descriptions>
    </n-card>
  </n-modal>
</template>

<script setup lang="ts">
import { type _Object, type S3Client, HeadObjectCommand } from '@aws-sdk/client-s3'
import { inject, type Ref, ref } from 'vue'
import { useVModel, computedAsync } from '@vueuse/core'
import {
  NModal,
  NCard,
  NDescriptions,
  NDescriptionsItem,
  NTime,
  NPopover,
  NSkeleton
} from 'naive-ui'
import { useNow } from '@vueuse/core'

const props = defineProps<{
  object?: _Object
  show: boolean
}>()

const now = useNow()
const emit = defineEmits(['update:show'])

const show = useVModel(props, 'show', emit)

const client = inject<Ref<S3Client>>('client')
const bucket = inject<Ref<string>>('bucket')
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
  { evaluating }
)
</script>
