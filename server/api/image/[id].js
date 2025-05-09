import { deleteImage } from '../../http'

export default defineEventHandler(async (e) => {
  const { method } = e
  const id = getRouterParam(e, 'id')
  switch (method) {
    case 'DELETE':
      return deleteImage(id)
    default:
      return createError(405, 'Method Not Allowed')
  }
})
