import { getAlbum } from '../../http'

export default defineEventHandler(async (e) => {
  const id = getRouterParam(e, 'id')
  return await getAlbum(id)
})
