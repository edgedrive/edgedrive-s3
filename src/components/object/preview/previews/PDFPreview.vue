<!-- TODO: better pdf preview -->
<template>
  <n-button @click="page = page > 1 ? page - 1 : page">Prev</n-button>
  <span>{{ page }} / {{ pages }}</span>
  <n-button @click="page = page < pages ? page + 1 : page">Next</n-button>
  <VuePDF :pdf="pdf" :page="page" :fit-parent="true" />
</template>

<script setup lang="ts">
import { toRef } from 'vue'
import { VuePDF, usePDF } from '@tato30/vue-pdf'
import { NButton } from 'naive-ui'
import { ref } from 'vue'

const props = defineProps<{
  url: string
}>()

const page = ref(1)
const url = toRef(props, 'url')

const { pdf, pages } = usePDF(url.value)
</script>
