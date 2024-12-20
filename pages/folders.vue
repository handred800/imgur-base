<template>
  <div>
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
      <FolderCard
        v-for="album in albums"
        :key="album.id"
        :name="album.title"
        :img="album.cover"
        @click="() => currentAlubmId = album.id"
      />
    </div>
    <Drawer
      :is-show="!!currentAlubmId"
      @close="() => currentAlubmId = null"
    >
      <div class="text-3xl font-bold mb-3">
        {{ albumData.title }}
      </div>
      <div
        v-if="albumStatus === 'success'"
        class="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4"
      >
        <ImageCard
          v-for="image in albumData.images"
          :key="image.id"
          :img="image.link"
          :href="image.link"
          @click-view="() => lightboxSource = image.link"
        />
      </div>
    </Drawer>
    <LightBox
      :is-show="!!lightboxSource"
      :img-url="lightboxSource"
      @close="() => lightboxSource = null"
    />
  </div>
</template>

<script setup>
const lightboxSource = ref(null)
const currentAlubmId = ref(null)
// fetch資料
const { data: albums } = useFetch('/api/album')
const { data: albumData, status: albumStatus } = useAsyncData('albumData', () => {
  if (!currentAlubmId.value) return []
  return $fetch(`/api/album/${currentAlubmId.value}`)
}, {
  watch: [currentAlubmId],
})
</script>
