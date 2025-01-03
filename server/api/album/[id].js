import { getAlbum, createAlbum, deleteAlbum } from '../../http'

export default defineEventHandler(async (e) => {
  const { method } = e
  const id = getRouterParam(e, 'id')
  switch (method) {
    case 'GET':
      return getAlbum(id)
    case 'POST':
      const body = await readBody(e)
      return createAlbum(body)
    case 'DELETE':
      return deleteAlbum(id)
    default:
      return createError(405, 'Method Not Allowed')
  }
})
