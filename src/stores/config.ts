import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import type { Ref } from 'vue'

export interface StorageConfig {
  id: string
  name: string
  endpoint: string
  buckets: string[]
  accessKeyId: string
  secretAccessKey: string
}

export interface Config {
  storages: StorageConfig[]
}

export const useConfigStore = defineStore({
  id: 'config',
  state: () => ({
    config: useStorage<Config>('edgedrive:config', {
      storages: []
    }) as Ref<Config>
  }),
  actions: {
    addStorage() {
      this.config.storages.push(defaultStorageConfig)
    },
    removeStorage(id: string) {
      const index = this.config.storages.findIndex((config) => config.id === id)
      if (index !== -1) {
        this.config.storages.splice(index, 1)
      }
    }
  }
})

const defaultStorageConfig: StorageConfig = {
  id: crypto.randomUUID(),
  name: 'Storage',
  endpoint: '',
  buckets: [],
  accessKeyId: '',
  secretAccessKey: ''
}
