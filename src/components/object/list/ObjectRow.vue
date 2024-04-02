<template>
  <n-list-item @click="showPreview">
    <template #prefix>
      <ObjectIcon :object="object" />
    </template>
    <n-text>{{ filename }}</n-text>
    <template #suffix>
      <n-flex :wrap="false">
        <span style="white-space: nowrap;">{{ filesizeFormatted }}</span>
      </n-flex>
    </template>
  </n-list-item>
</template>

<script setup lang="ts">
import { type _Object } from '@aws-sdk/client-s3'
import { NListItem, NText, NFlex } from 'naive-ui'
import { computed, inject, type Ref } from 'vue'
import ObjectIcon from './ObjectIcon.vue'
import { filesize } from 'filesize'

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

const filesizeFormatted = computed(() => {
  return filesize(props.object.Size ?? 0, {
    round: 1
  })
})
</script>
