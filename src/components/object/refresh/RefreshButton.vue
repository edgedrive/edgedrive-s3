<template>
  <n-button quaternary circle @click="emit('click')">
    <template #icon>
      <n-icon><ArrowClockwise16Regular /></n-icon>
    </template>
  </n-button>
</template>

<script setup lang="ts">
import { NIcon, NButton } from 'naive-ui'
import { ArrowClockwise16Regular } from '@vicons/fluent'

const emit = defineEmits(['click'])
</script>
