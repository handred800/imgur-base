<template>
  <div>
    <div>
      <button class="btn">
        新增相簿
      </button>
    </div>
    <div class="image-grid">
      <FolderCard
        v-for="album in albums"
        :key="album.id"
        :name="album.title"
        :img="album.cover"
        :badge="album.images_count"
        @click="gotoAlbum(album)"
      />
    </div>
  </div>
</template>

<script setup>
const currentAlbum = useState('currentAlbum')

// fetch資料
const { data: albums } = useFetch('/api/album')
function gotoAlbum(album) {
  currentAlbum.value = album
  navigateTo(`/album/${currentAlbum.value.id}`)
}
</script>
