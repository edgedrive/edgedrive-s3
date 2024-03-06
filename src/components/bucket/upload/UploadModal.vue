<template>
  <n-modal v-model:show="show" style="max-width: calc(70vw)">
    <n-card title="Upload">
      <n-upload
        :default-upload="false"
        multiple
        directory-dnd
        v-model:file-list="fileList"
        @update:file-list="onFileListChange"
        @change="handleUploadChange"
      >
        <n-upload-dragger>
          <div style="margin-bottom: 12px">
            <n-icon size="48" :depth="3">
              <CloudArrowUp48Regular />
            </n-icon>
          </div>
          <n-text style="font-size: 16px"> Click or drag to upload </n-text>
          <n-p depth="3" style="margin: 8px 0 0 0">
            File will be uploaded to <n-text code>{{ prefix }}</n-text>
          </n-p>
        </n-upload-dragger>
      </n-upload>
    </n-card>
  </n-modal>
</template>

<script setup lang="ts">
import { type S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { useVModel } from '@vueuse/core'
import {
  NModal,
  NCard,
  NUpload,
  NUploadDragger,
  NText,
  NIcon,
  NP,
  type UploadFileInfo
} from 'naive-ui'
import { inject, type Ref, ref } from 'vue'
import { CloudArrowUp48Regular } from '@vicons/fluent'

const props = defineProps<{
  show: boolean
  prefix: string
}>()

const emit = defineEmits(['update:show'])

const show = useVModel(props, 'show', emit)

const client = inject<Ref<S3Client>>('client')
const bucket = inject<Ref<string>>('bucket')

const fileList = ref<UploadFileInfo[]>([])

const onFileListChange = (fileList: UploadFileInfo[]) => {
  if (fileList.length === 0) {
    return
  }

  for (const file of fileList) {
    if (file.status === 'pending') {
      startUpload(file)
    }
  }
}

function handleUploadChange(data: { fileList: UploadFileInfo[] }) {
  fileList.value = data.fileList
}

// FIXME: use customRequest to do upload
async function startUpload(file: UploadFileInfo) {
  console.log(file)
  file.status = 'uploading'

  // remove file.fullPath prefix /
  const subPath = file.fullPath.slice(1)

  const objectKey = `${props.prefix}${subPath}`

  const command = new PutObjectCommand({
    Bucket: bucket.value,
    Key: objectKey,
    Body: file.file,
    ContentLength: file.file.size,
    ContentType: file.file.type
  })

  await client.value.send(command)

  file.status = 'finished'
  console.log(file)
}
</script>
