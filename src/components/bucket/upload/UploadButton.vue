<template>
  <n-button quaternary circle @click="show = true">
    <template #icon>
      <n-icon><CloudArrowUp16Regular /></n-icon>
    </template>
  </n-button>
  <UploadModal v-model:show="show" :prefix="prefix" />
</template>

<script setup lang="ts">
import { NIcon, NButton } from 'naive-ui'
import { CloudArrowUp16Regular } from '@vicons/fluent'
import { ref } from 'vue'
import UploadModal from './UploadModal.vue'

const show = ref(false)

defineProps<{
  prefix: string
}>()
</script>
