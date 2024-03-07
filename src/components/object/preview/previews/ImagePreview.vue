<template>
  <img width="100%" :src="url" />
</template>

<script setup lang="ts">
import { toRef } from 'vue'
import { useObjectUrl } from '@vueuse/core'

const props = defineProps<{
  blob: Blob
}>()

const blob = toRef(props, 'blob')

const url = useObjectUrl(blob)
</script>
