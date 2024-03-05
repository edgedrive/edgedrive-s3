<template>
  <div style="overflow: auto">
    <n-code :code="code" :language="ext" :hljs="hljs" show-line-numbers />
  </div>
</template>

<script setup lang="ts">
import { type _Object } from '@aws-sdk/client-s3'
import { computedAsync } from '@vueuse/core'
import { NCode } from 'naive-ui'
import { computed } from 'vue'
import hljs from 'highlight.js'

const props = defineProps<{
  object: _Object
  blob: Blob
}>()

console.log(hljs.listLanguages())

const code = computedAsync(async () => props.blob.text())
const ext = computed(() => props.object?.Key?.split('/').pop()?.split('.').pop() ?? '')
</script>
