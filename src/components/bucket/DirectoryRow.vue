<template>
  <n-list-item @click="emit('update:prefix', directory)">
    <template #prefix>
      <n-icon>
        <Folder16Regular />
      </n-icon>
    </template>
    <n-text>{{ directoryName }}</n-text>
  </n-list-item>
</template>

<script setup lang="ts">
import { NListItem, NText, NIcon } from 'naive-ui'
import { computed } from 'vue'
import { Folder16Regular } from '@vicons/fluent'

const props = defineProps<{
  directory: string
}>()

const emit = defineEmits(['update:prefix'])

const directoryName = computed(() => {
  // remove the last slash and return the last part
  return props.directory.split('/').filter(Boolean).pop()
})
</script>
