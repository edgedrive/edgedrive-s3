<template>
  <n-list-item>
    <template #prefix>
      <n-icon :component="icon"> </n-icon>
    </template>
    <n-text>{{ filename }}</n-text>
    <template #suffix>
      <download-button :object="props.object" />
    </template>
  </n-list-item>
</template>

<script setup lang="ts">
import { type _Object } from '@aws-sdk/client-s3'
import { NListItem, NText, NIcon } from 'naive-ui'
import { computed } from 'vue'
import { Document16Regular, Image16Regular, Code16Regular } from '@vicons/fluent'
import DownloadButton from './DownloadButton.vue'

const props = defineProps<{
  object: _Object
}>()

const filename = computed(() => {
  return props.object?.Key?.split('/')?.pop() ?? ''
})

const icon = computed(() => {
  const ext = filename.value.split('.').pop() ?? ''
  const imagesExt = ['jpg', 'png', 'jpeg', 'gif', 'bmp', 'webp']
  if (imagesExt.includes(ext.toLowerCase())) {
    return Image16Regular
  }

  const codeExt = ['js', 'ts', 'html', 'css', 'json', 'yaml', 'yml', 'xml', 'md', 'markdown', 'ts']
  if (codeExt.includes(ext.toLowerCase())) {
    return Code16Regular
  }

  return Document16Regular
})
</script>
