<template>
  <n-breadcrumb>
    <n-breadcrumb-item @click="emit('update:prefix', '')"> @ </n-breadcrumb-item>

    <n-breadcrumb-item v-for="part in parts" :key="part" @click="emit('update:prefix', part)">
      {{ part.replace(/\/$/, '').split('/').pop() }}
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
  // prefix is src/a/b/c/d/
  // return src/ src/a/ src/a/b/ src/a/b/c/ src/a/b/c/d/
  const parts = props.prefix.split('/')
  return parts.map((part, index) => {
    return parts.slice(0, index + 1).join('/') + '/'
  })
})
</script>
