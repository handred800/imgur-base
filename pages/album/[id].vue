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
        >
          <template #view>
            <button
              class="btn btn-ghost"
              @click="openLightbox(index)"
            >
              <IconEye /> 預覽
            </button>
          </template>
          <template #delete>
            <button
              class="btn btn-error"
              @click="deleteImage(image.id)"
            >
              <IconTrash2 /> 刪除
            </button>
          </template>
        </ImageCard>
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
            class="min-h-[50vh] p-4 my-4 rounded-lg"
            :class="isOverDropZone ? 'bg-emerald-300': 'bg-slate-300'"
          >
            <div
              v-if="currentFiles.length >= 0"
              class="image-grid 2xl:grid-cols-5"
            >
              <div
                v-for="(link, index) in filesPreview"
                :key="link"
                class="relative aspect-[5/3] rounded-xl overflow-hidden shadow"
              >
                <NuxtImg :src="link" />
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
          <button
            v-if="currentFiles.length > 0"
            class="btn btn-primary"
            :disabled="isUploading"
            @click="uploadFiles"
          >
            <div
              v-if="isUploading"
              class="loading loading-spinner"
            />
            <IconUpload v-else />
            上傳
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
const { data: albumData, status: albumStatus, refresh: refreshAlbum } = await useFetch(`/api/album/${route.params.id}`)
currentAlbum.value = unref(albumData)

// lightbox
const { setLightBox, openLightBox } = useLightBox()
const currentImages = computed(() => {
  if (!currentAlbum.value || !albumData.value || !albumData.value.images || albumStatus.value !== 'success') return []
  return albumData.value.images.map((image) => ({
    src: image.link,
    w: image.width,
    h: image.height,
  }))
})
watch(currentImages, () => {
  setLightBox(currentImages.value)
}, { immediate: true })

function openLightbox(index) {
  openLightBox(index)
}

// upload
const uploadDrawer = ref(false)
const isUploading = ref(false)
const $dropzone = ref(null)
const { currentFiles, filesPreview, isOverDropZone, openFileDialog, deleteFile } = useDropFiles($dropzone)

function singleUpload(file) {
  const formData = new FormData()
  formData.append('image', file)
  formData.append('album', currentAlbum.value.id)
  return $fetch('/api/image', {
    method: 'POST',
    body: formData,
  })
}

async function uploadFiles() {
  isUploading.value = true
  try {
    await Promise.all(Array.from(currentFiles.value).map(singleUpload))
    await refreshAlbum()
    deleteFile()
    uploadDrawer.value = false
  }
  catch (error) {
    alert(error)
  }
  isUploading.value = false
}

function deleteImage(id) {
  $fetch(`/api/image/${id}`, {
    method: 'DELETE',
  })
  refreshAlbum()
}
</script>
