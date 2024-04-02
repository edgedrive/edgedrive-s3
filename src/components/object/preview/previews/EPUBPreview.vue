<template>
  <div style="height: 70vh">
    <vue-reader :url="url" />
  </div>
</template>

<script setup lang="ts">
import { VueReader } from 'vue-reader'

defineProps<{
  url: string
}>()
</script>
