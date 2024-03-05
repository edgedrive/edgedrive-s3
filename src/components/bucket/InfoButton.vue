<template>
  <n-button quaternary circle @click.stop.prevent="showInfo">
    <template #icon>
      <n-icon><Info16Regular /></n-icon>
    </template>
  </n-button>
</template>

<script setup lang="ts">
import type { _Object } from '@aws-sdk/client-s3'
import { NIcon, NButton } from 'naive-ui'
import { Info16Regular } from '@vicons/fluent'
import { inject, type Ref } from 'vue'

const props = defineProps<{
  object: _Object
}>()

const infoModalObject = inject('infoModalObject') as Ref<_Object | undefined>
const infoModalShow = inject('infoModalShow') as Ref<boolean>

const showInfo = () => {
  infoModalObject.value = props.object
  infoModalShow.value = true
}
</script>
