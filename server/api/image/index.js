import { uploadImage } from '../../http'

export default defineEventHandler(async (e) => {
  const { method } = e
  switch (method) {
    case 'POST':
      const formData = await readFormData(e)
      return uploadImage(formData)
    default:
      return createError(405, 'Method Not Allowed')
  }
})
