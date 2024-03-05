<template>
  <div>
    <div v-for="object in objects" :key="object.Key">
      {{ object.Key }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { S3Client, ListObjectsCommand, type _Object } from '@aws-sdk/client-s3'
import { onMounted, computed, ref } from 'vue'

const objects = ref<_Object[]>([])

const props = defineProps<{
  endpoint: string
  accessKeyId: string
  secretAccessKey: string
  bucket: string
}>()

const client = computed(() => {
  return new S3Client({
    endpoint: props.endpoint,
    credentials: {
      accessKeyId: props.accessKeyId,
      secretAccessKey: props.secretAccessKey
    },
    region: 'auto'
  })
})

async function updateObjects() {
  const command = new ListObjectsCommand({
    Bucket: props.bucket
  })
  const response = await client.value.send(command)
  console.log(response)

  if (response.Contents) {
    objects.value = response.Contents
  }
}

onMounted(() => {
  updateObjects()
})
</script>
