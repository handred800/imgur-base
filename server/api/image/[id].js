import { uploadImage, deleteImage } from '../../http'

export default defineEventHandler(async (e) => {
  const { method } = e
  const id = getRouterParam(e, 'id')
  switch (method) {
    case 'POST':
      const body = await readBody(e)
      const formData = new FormData()
      for (const key in body) {
        formData.append(key, body[key])
      }
      return uploadImage(formData)
    case 'DELETE':
      return deleteImage(id)
    default:
      return createError(405, 'Method Not Allowed')
  }
})
