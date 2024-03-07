<template>
  <img width="100%" :src="url" />
</template>

<script setup lang="ts">
defineProps<{
  url: string
}>()
</script>
