<template>
  <main style="padding: 3em">
    <div style="display: flex; justify-content: space-between; align-items: center">
      <n-h1 style="margin-bottom: 0; font-size: 2em">EdgeDrive S3 Wiki</n-h1>
      <div>
        <ShowConfigModalButton />
      </div>
    </div>
    <n-divider></n-divider>
    <n-h2 prefix="bar">Storage</n-h2>
    <n-h3>Prequisite</n-h3>
    <n-p>
      You need setup CORS for your S3 bucket. Here are some guides for popular cloud storage
      services:
    </n-p>
    <n-p>
      <n-ul>
        <n-li>
          <n-a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/cors.html"
            >AWS S3</n-a
          ></n-li
        >
        <n-li>
          <n-a href="https://cloud.google.com/storage/docs/using-cors">Google Cloud Storage</n-a>
        </n-li>
        <n-li>
          <n-a
            href="https://learn.microsoft.com/en-us/rest/api/storageservices/cross-origin-resource-sharing--cors--support-for-the-azure-storage-services"
            >Azure Blob Storage</n-a
          >
        </n-li>
        <n-li>
          <n-a href="https://developers.cloudflare.com/r2/buckets/cors/">Cloudflare R2</n-a>
        </n-li>
        <n-li>
          <n-a
            href="https://www.backblaze.com/docs/cloud-storage-enable-cors-with-the-s3-compatible-api"
            >BackBlaze B2</n-a
          >
        </n-li>
      </n-ul>
    </n-p>

    <n-p>
      Here is an example CORS configuration for your S3 bucket:
      <n-code :code="JSON.stringify(corsConfig, null, 2)" language="json" :hljs="hljs"> </n-code>
    </n-p>

    <n-h3>Configuration</n-h3>
    <n-p>
      You can add multiple storage configurations. Here is an example configuration for a storage:
    </n-p>
    <n-p>
      <n-form-item label="Name">
        <n-input value="Storage 1" readonly />
      </n-form-item>
      <n-form-item label="Endpoint">
        <n-input
          value="https://bb2bccc3e47741b6bb4eab9904d0a16b.r2.cloudflarestorage.com"
          readonly
        />
      </n-form-item>
      <n-form-item label="Access Key ID">
        <n-input value="24fb1b49-49a5-469c-ad9c-44e5e40ad0db" readonly />
      </n-form-item>
      <n-form-item label="Secret Access Key">
        <n-input
          value="ef6381c4-3b77-4918-801b-727cb1fd14c4"
          type="password"
          show-password-on="click"
          readonly
        />
      </n-form-item>
      <n-form-item label="Bucket">
        <n-dynamic-tags :value="buckets" readonly />
      </n-form-item>
    </n-p>

    <ConfigModal />
  </main>
</template>

<script setup lang="ts">
import {
  NH1,
  NDivider,
  NH2,
  NP,
  NH3,
  NLi,
  NUl,
  NA,
  NCode,
  NFormItem,
  NInput,
  NDynamicTags
} from 'naive-ui'
import ShowConfigModalButton from '@/components/config/ShowConfigModalButton.vue'
import ConfigModal from '@/components/config/ConfigModal.vue'
import hljs from 'highlight.js/lib/core'
import json from 'highlight.js/lib/languages/json'

hljs.registerLanguage('json', json)

const corsConfig = [
  {
    AllowedOrigins: ['*'],
    AllowedMethods: ['GET', 'DELETE', 'HEAD', 'POST', 'PUT'],
    AllowedHeaders: ['*'],
    ExposeHeaders: ['*'],
    MaxAgeSeconds: 3000
  }
]

const buckets = ['example-bucket']
</script>
