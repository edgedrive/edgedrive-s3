import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { type _Object, type S3Client, GetObjectCommand } from '@aws-sdk/client-s3'
import type { MaybeRef } from 'vue'
import { get, computedAsync } from '@vueuse/core'
import { ref } from 'vue'

export function useObjectPresignedUrl(
  client_: MaybeRef<S3Client>,
  bucket_: MaybeRef<string>,
  object_: MaybeRef<_Object | undefined>,
  expiration_: MaybeRef<number>
) {
  const evaluating = ref(false)

  const url = computedAsync(
    async () => {
      const bucket = get(bucket_)
      const object = get(object_)
      const expiration = get(expiration_)
      const client = get(client_)

      if (!object) return undefined

      const command = new GetObjectCommand({
        Bucket: bucket,
        Key: object.Key
      })
      return getSignedUrl(client, command, { expiresIn: expiration })
    },
    undefined,
    { evaluating }
  )

  return {
    url,
    evaluating
  }
}
