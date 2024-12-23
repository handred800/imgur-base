<template>
  <div>
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
      <FolderCard
        v-for="album in albums"
        :key="album.id"
        :name="album.title"
        :img="album.cover"
        @click="() => currentAlubm = album"
      />
    </div>
    <Drawer
      :is-show="!!currentAlubm"
      :title="currentAlubm?.title"
      @close="() => currentAlubm = null"
    >
      <div
        v-if="albumStatus === 'success'"
        class="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4"
      >
        <ImageCard
          v-for="(image, index) in albumData.images"
          :key="image.id"
          :img="image.link"
          :href="image.link"
          @click-view="openLightbox(index)"
        />
      </div>
      <div
        v-else
        class="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4"
      >
        <div
          v-for="i in currentAlubm.images_count"
          :key="i"
          class="skeleton aspect-[5/3]"
        />
      </div>
    </Drawer>
  </div>
</template>

<script setup>
const currentAlubm = ref(null)
// fetch資料
const { data: albums } = useFetch('/api/album')
const { data: albumData, status: albumStatus } = useAsyncData('albumData', () => {
  if (!currentAlubm.value) return []
  return $fetch(`/api/album/${currentAlubm.value.id}`)
}, {
  watch: [currentAlubm],
})

// lightbox
const { setLightBox, openLightBox } = useLightBox()
const currentImages = computed(() => {
  if (!currentAlubm.value || !albumData.value || albumStatus.value !== 'success') return []
  return albumData.value.images.map((image) => ({
    src: image.link,
    w: image.width,
    h: image.height,
  }))
})
watch(currentImages, () => {
  setLightBox(currentImages.value)
})

function openLightbox(index) {
  openLightBox(index)
}
</script>
