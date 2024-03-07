import {
  type _Object,
  type S3Client,
  HeadObjectCommand,
  type HeadObjectCommandOutput
} from '@aws-sdk/client-s3'
import { ref, type MaybeRef } from 'vue'
import { get, computedAsync } from '@vueuse/core'

export function useObjectHead(
  client_: MaybeRef<S3Client>,
  bucket_: MaybeRef<string>,
  object_: MaybeRef<_Object | undefined>
) {
  const evaluating = ref(false)

  const head = computedAsync<HeadObjectCommandOutput | undefined>(
    async () => {
      const bucket = get(bucket_)
      const object = get(object_)
      const client = get(client_)

      if (!object) return undefined

      const response = await client.send(new HeadObjectCommand({ Bucket: bucket, Key: object.Key }))

      return response
    },
    undefined,
    { evaluating }
  )

  return {
    head,
    evaluating
  }
}
