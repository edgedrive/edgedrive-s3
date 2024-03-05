<template>
  <n-icon :component="icon" />
</template>

<script setup lang="ts">
import { type _Object } from '@aws-sdk/client-s3'
import { computed } from 'vue'
import {
  Document16Regular,
  Image16Regular,
  Code16Regular,
  Video16Regular,
  DocumentText20Regular,
  DocumentJavascript20Regular,
  DocumentPdf20Regular,
  DocumentRibbon16Regular,
  DocumentSettings16Regular,
  DocumentTable16Regular,
  FolderZip16Regular
} from '@vicons/fluent'
import { NIcon } from 'naive-ui'

const props = defineProps<{
  object: _Object
}>()

const filename = computed(() => {
  return props.object?.Key?.split('/')?.pop() ?? ''
})

const icon = computed(() => {
  const ext = filename.value.split('.').pop() ?? ''
  const extIconMap = {
    'jpg,png,jpeg,gif,bmp,webp': Image16Regular,
    'js,ts': DocumentJavascript20Regular,
    'html,css,json,yaml,yml,xml,md,markdown': Code16Regular,
    'mp4,webm,ogg,avi,mov,flv,wmv': Video16Regular,
    'txt,log,csv,tsv': DocumentText20Regular,
    pdf: DocumentPdf20Regular,
    'cer,cer.p7b,crt,crt.p7b,der,p7b,p7c,pem,pfx,pkcs12,pkcs7,pkcs7-mime,pkcs7-signature,pkcs8,pkcs8-private-key,pkcs8-public-key,spc':
      DocumentRibbon16Regular,
    'conf,config,ini,properties,settings': DocumentSettings16Regular,
    'xls,xlsx': DocumentTable16Regular,
    'zip,rar,7z,tar,gz,bz2': FolderZip16Regular
  }

  for (const [exts, icon] of Object.entries(extIconMap)) {
    if (exts.includes(ext.toLowerCase())) {
      return icon
    }
  }

  return Document16Regular
})
</script>
