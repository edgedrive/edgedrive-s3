<template>
  <n-list hoverable clickable>
    <DirectoryRow
      v-for="directory in props.directorys"
      :directory="directory"
      :key="directory"
      @update:prefix="($event) => emit('update:prefix', $event)"
    />
    <ObjectRow v-for="object in props.objects" :object="object" :key="object.Key" />
  </n-list>
</template>

<script setup lang="ts">
import { type _Object } from '@aws-sdk/client-s3'
import { NList } from 'naive-ui'
import ObjectRow from './ObjectRow.vue'
import DirectoryRow from './DirectoryRow.vue'

const props = defineProps<{
  objects: _Object[]
  directorys: string[]
}>()

const emit = defineEmits(['update:prefix'])
</script>
