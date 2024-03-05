<template>
  <n-list-item>
    <template #prefix>
      <ObjectIcon :object="object" />
    </template>
    <n-text>{{ filename }}</n-text>
    <template #suffix>
      <download-button :object="props.object" />
    </template>
  </n-list-item>
</template>

<script setup lang="ts">
import { type _Object } from '@aws-sdk/client-s3'
import { NListItem, NText } from 'naive-ui'
import { computed } from 'vue'
import DownloadButton from './DownloadButton.vue'
import ObjectIcon from './ObjectIcon.vue'

const props = defineProps<{
  object: _Object
}>()

const filename = computed(() => {
  return props.object?.Key?.split('/')?.pop() ?? ''
})
</script>
