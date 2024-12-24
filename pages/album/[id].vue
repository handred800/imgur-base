<template>
  <div>
    <div class="sticky top-5 bg-white z-10 rounded-lg shadow-lg navbar">
      <div class="breadcrumbs flex-1 p-3">
        <ul>
          <li><RouterLink to="/album"><IconHouse /></RouterLink></li>
          <li>{{ route.params.id }}</li>
        </ul>
      </div>
      <button
        class="btn"
        @click="() => uploadDrawer = true"
        @close="() => uploadDrawer = false"
      >
        新增照片
      </button>
    </div>
    <div class="pt-4">
      <div
        v-if="albumStatus === 'success'"
        class="image-grid"
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
        class="image-grid"
      >
        <div
          v-for="i in currentAlbum.images_count"
          :key="i"
          class="skeleton aspect-[5/3]"
        />
      </div>
    </div>
    <Drawer
      :is-show="uploadDrawer"
      @close="() => uploadDrawer = false"
    >
      <template #content>
        <div>
          <button
            class="btn"
            @click="openFileDialog"
          >
            <IconFolder /> 選擇檔案
          </button>
          <div
            ref="$dropzone"
            class="flex w-full min-h-[60vh] p-4 my-2 rounded-lg"
            :class="isOverDropZone ? 'bg-emerald-300': 'bg-slate-300'"
          >
            <div
              v-if="currentFiles.length >= 0"
              class="image-grid 2xl:grid-cols-5"
            >
              <div
                v-for="(link, index) in filesPreview"
                :key="link"
                class="relative"
              >
                <img
                  class="w-full aspect-[4/3] object-cover rounded-lg"
                  :src="link"
                  alt=""
                >
                <button
                  class="btn btn-sm btn-circle btn-error absolute top-3 right-3"
                  @click="deleteFile(index)"
                >
                  <IconX />
                </button>
              </div>
            </div>
            <div v-else>
              拖放檔案至此
            </div>
          </div>
          <button class="btn btn-primary">
            <IconUpload /> 上傳
          </button>
        </div>
      </template>
    </Drawer>
  </div>
</template>

<script setup>
const currentAlbum = useState('currentAlbum', () => ({ images_count: 12 }))
const route = useRoute()

// fetch資料
const { data: albumData, status: albumStatus } = useFetch(`/api/album/${route.params.id}`)

// lightbox
const { setLightBox, openLightBox } = useLightBox()
const currentImages = computed(() => {
  if (!currentAlbum.value || !albumData.value || albumStatus.value !== 'success') return []
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

// upload
const uploadDrawer = ref(false)
const $dropzone = ref(null)
const { currentFiles, isOverDropZone, openFileDialog, deleteFile } = useDropFiles($dropzone)
const filesPreview = computed(() => {
  return Array.from(currentFiles.value).map((file) => URL.createObjectURL(file))
})
</script>
