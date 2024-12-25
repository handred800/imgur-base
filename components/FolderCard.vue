<template>
  <div class="border border-slate-300 rounded-xl shadow hover:shadow-lg overflow-hidden duration-100 cursor-pointer">
    <div class="relative aspect-[5/3]">
      <NuxtImg :src="`https://i.imgur.com/${props.img}.jpg`" />
      <div
        v-if="props.badge"
        class="absolute top-5 right-5 badge badge-secondary"
      >
        {{ props.badge }}
      </div>
    </div>
    <div class="text-lg font-bold p-4">
      {{ props.name }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  name: String,
  img: String,
  badge: Number,
})
</script>
