<template>
  <n-list-item @click="showPreview">
    <template #prefix>
      <ObjectIcon :object="object" />
    </template>
    <n-text>{{ filename }}</n-text>
    <template #suffix>
      <n-flex :wrap="false">
        <info-button :object="props.object" />
        <download-button :object="props.object" />
      </n-flex>
    </template>
  </n-list-item>
</template>

<script setup lang="ts">
import { type _Object } from '@aws-sdk/client-s3'
import { NListItem, NText, NFlex } from 'naive-ui'
import { computed, inject, type Ref } from 'vue'
import DownloadButton from '../download/DownloadButton.vue'
import ObjectIcon from './ObjectIcon.vue'
import InfoButton from '../info/InfoButton.vue'

const props = defineProps<{
  object: _Object
}>()

const filename = computed(() => {
  return props.object?.Key?.split('/')?.pop() ?? ''
})

const previewModalObject = inject('previewModalObject') as Ref<_Object | undefined>
const previewModalShow = inject('previewModalShow') as Ref<boolean>

const showPreview = () => {
  previewModalObject.value = props.object
  previewModalShow.value = true
}
</script>
