<template>
  <n-p v-if="!accepted">
    In order to view this file, Microsoft Office Online will be used. If your file is confidential,
    please do not proceed.
  </n-p>

  <n-button v-if="!accepted" @click="accepted = true" type="info" size="small"> View </n-button>

  <iframe :src="previewUrl" width="100%" :height="height * 0.7" frameborder="0" v-if="accepted"
    >This is an embedded <a target="_blank" href="http://office.com">Microsoft Office</a> document,
    powered by <a target="_blank" href="http://office.com/webapps">Office Online</a>.</iframe
  >
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useWindowSize } from '@vueuse/core'
import { ref } from 'vue'
import { NButton, NP } from 'naive-ui'

const { height } = useWindowSize()

const props = defineProps<{
  url: string
}>()

const accepted = ref(false)

const previewUrl = computed(() => {
  return `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(props.url)}`
})
</script>
