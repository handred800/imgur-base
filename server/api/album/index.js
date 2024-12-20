import { getAlbums } from '../../http.js'

export default defineEventHandler(async () => {
  return await getAlbums()
})
