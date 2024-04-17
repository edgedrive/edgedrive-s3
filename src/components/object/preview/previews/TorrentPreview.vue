<template>
  <div>{{ info }}</div>
</template>

<script setup lang="ts">
// FIXME: Module "path" has been externalized for browser compatibility. Cannot access "path.join" in client code. See https://vitejs.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.
import parseTorrent from 'parse-torrent'
import { asyncComputed } from '@vueuse/core'
import { Buffer as BufferPolyfill } from 'buffer'
declare var Buffer: typeof BufferPolyfill
globalThis.Buffer = BufferPolyfill

const props = defineProps<{
  url: string
}>()

const info = asyncComputed(async () => {
  const blob = await fetch(props.url).then((res) => res.blob())

  const buffer = await new Response(blob).arrayBuffer()
  const parsedTorrent = parseTorrent(Buffer.from(buffer))

  console.log(parsedTorrent)
})
</script>
