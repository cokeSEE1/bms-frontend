import client from './client'

export async function uploadImage(file: File): Promise<{ url: string; filename: string; size: number }> {
  const form = new FormData()
  form.append('file', file)
  const res = await client.post('/v1/upload/image', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return res.data
}
