<template>
  <video width="100%" controls>
    <source :src="url" :type="head.ContentType" />
  </video>
</template>

<script setup lang="ts">
defineProps<{
  url: string
  head: {
    ContentType: string
  }
}>()
</script>
