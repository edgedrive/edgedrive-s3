<script setup lang="ts">
import { useConfigStore } from '@/stores/config'
import StorageConfigInput from './StorageConfigInput.vue'
import { NButton, NP, NH2, NCollapse, NCollapseItem, NIcon, NFlex } from 'naive-ui'
import {
  Delete16Regular,
  AddCircle16Regular,
  QuestionCircle16Regular,
  Icons20Regular
} from '@vicons/fluent'

const configStore = useConfigStore()
</script>

<template>
  <div>
    <n-h2> Storages </n-h2>
    <n-p>
      <n-collapse>
        <n-collapse-item
          :title="config.name"
          :name="config.id"
          v-for="config in configStore.config.storages"
          :key="config.id"
        >
          <StorageConfigInput :config="config" />
          <template #header-extra>
            <n-button text @click="configStore.removeStorage(config.id)">
              <template #icon>
                <n-icon><Delete16Regular /></n-icon>
              </template>
            </n-button>
          </template>
        </n-collapse-item>
      </n-collapse>
    </n-p>

    <n-p>
      <n-flex>
        <n-button text @click="configStore.addStorage">
          <template #icon>
            <n-icon><AddCircle16Regular /></n-icon>
          </template>
          Add Storage
        </n-button>
        <router-link to="/wiki/storage" #="{ navigate, href }" custom>
          <n-button
            text
            tag="a"
            :href="href"
            @click.prevent="
              () => {
                navigate()
                configStore.showConfigModal = false
              }
            "
          >
            <template #icon>
              <n-icon><QuestionCircle16Regular /></n-icon>
            </template>
            How to Add a Storage?
          </n-button>
        </router-link>
        <n-button text @click="configStore.addDemoStorage">
          <template #icon>
            <n-icon><Icons20Regular /></n-icon>
          </template>
          Use Demo Storage
        </n-button>
      </n-flex>
    </n-p>
  </div>
</template>
