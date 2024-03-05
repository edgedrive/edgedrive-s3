<template>
  <div>
    <PrefixBreadcrumb v-model:prefix="prefix" />
    <DirectoryAndObjectRows
      :objects="objects"
      :directorys="directorys"
      @update:prefix="prefix = $event"
    />
  </div>
</template>

<script setup lang="ts">
import { S3Client, ListObjectsV2Command, type _Object } from '@aws-sdk/client-s3'
import { onMounted, computed, ref, watch } from 'vue'
import DirectoryAndObjectRows from './DirectoryAndObjectRows.vue'
import PrefixBreadcrumb from './PrefixBreadcrumb.vue'

const prefix = ref('src/')

const objects = ref<_Object[]>([])
const directorys = ref<string[]>([])

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
  const command = new ListObjectsV2Command({
    Bucket: props.bucket,
    Prefix: prefix.value,
    Delimiter: '/'
  })
  const response = await client.value.send(command)
  console.log(response)

  if (response.Contents) {
    objects.value = response.Contents
  } else {
    objects.value = []
  }

  if (response.CommonPrefixes) {
    const prefixs = response.CommonPrefixes.map((prefix) => prefix.Prefix)
    directorys.value = prefixs.filter((prefix) => prefix !== undefined) as string[]
  } else {
    directorys.value = []
  }
}

onMounted(() => {
  updateObjects()
})

watch(prefix, () => {
  updateObjects()
})
</script>
