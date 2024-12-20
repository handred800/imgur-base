export const useFetchStore = async () => {
  const store = useState('store', () => {})
  const storeFetch = (endpoint) => {
    if (store.value[endpoint]) {
      store.value[endpoint] = useFetch(endpoint)
    }
  }

  return { store, storeFetch }
}
