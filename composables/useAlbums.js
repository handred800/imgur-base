export const useAlbums = async () => {
  let cache = useState('albums', () => null)

  if (!cache.value) {
    cache = await useFetch('/api/album')
  }

  return cache
}
