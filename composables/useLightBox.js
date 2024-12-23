import PhotoSwipeLightbox from 'photoswipe/lightbox'
import 'photoswipe/style.css'

export const useLightBox = () => {
  let lightbox = null
  const dataSource = ref([])

  function openLightBox(index) {
    lightbox.loadAndOpen(index)
  }

  function setLightBox(images) {
    dataSource.value = unref(images)
  }

  onMounted(() => {
    watch(dataSource, () => {
      if (lightbox) lightbox.destroy()
      lightbox = new PhotoSwipeLightbox({
        dataSource: dataSource.value,
        pswpModule: () => import('photoswipe'),
      })
      lightbox.init()
    })
  })

  return { setLightBox, openLightBox }
}
