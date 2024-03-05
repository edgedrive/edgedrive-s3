<template>
  <n-breadcrumb>
    <n-breadcrumb-item @click="emit('update:prefix', '')"> @ </n-breadcrumb-item>

    <n-breadcrumb-item v-for="part in parts" :key="part" @click="emit('update:prefix', part)">
      {{ part.split('/').pop() }}
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>

<script setup lang="ts">
import { NBreadcrumb, NBreadcrumbItem } from 'naive-ui'
import { computed } from 'vue'

const props = defineProps<{
  prefix: string
}>()

const emit = defineEmits(['update:prefix'])

const parts = computed(() => {
  // src/a/b/c/d
  // return ['src', 'src/a', 'src/a/b', 'src/a/b/c', 'src/a/b/c/d']

  const prefix = props.prefix.endsWith('/') ? props.prefix.slice(0, -1) : props.prefix

  const parts = prefix.split('/')
  return parts.map((part, index) => {
    return parts.slice(0, index + 1).join('/')
  })
})
</script>
