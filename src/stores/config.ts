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
    }) as Ref<Config>,
    showConfigModal: false
  }),
  getters: {
    noConfig: (state) => state.config.storages.length === 0
  },
  actions: {
    addStorage() {
      const defaultStorageConfig: StorageConfig = {
        id: crypto.randomUUID(),
        name: 'Storage',
        endpoint: '',
        buckets: [],
        accessKeyId: '',
        secretAccessKey: ''
      }

      defaultStorageConfig.name = `Storage ${this.config.storages.length + 1}`

      this.config.storages.push(defaultStorageConfig)
    },
    removeStorage(id: string) {
      const index = this.config.storages.findIndex((config) => config.id === id)
      if (index !== -1) {
        this.config.storages.splice(index, 1)
      }
    },
    addDemoStorage() {
      this.config.storages.push({
        id: crypto.randomUUID(),
        name: 'Demo Storage',
        endpoint: 'https://d7f973ebf9677bdfa325d3d1a263e6e9.r2.cloudflarestorage.com',
        buckets: ['edgedrive-demo'],
        accessKeyId: '07c186ed55cb614700de6a37d2cc8d1c',
        secretAccessKey: 'aeeda12a3cc3dec6be8bcf915bc4b6fc873257547527835090599995804c1a2c'
      })
    }
  }
})
