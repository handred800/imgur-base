<template>
  <div class="border border-slate-300 rounded-xl shadow hover:shadow-lg overflow-hidden duration-100 relative cursor-pointer">
    <div class="aspect-[5/3]">
      <img
        class="w-full h-full object-cover"
        :src="`https://i.imgur.com/${props.img}.jpg`"
        alt=""
      >
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
})
</script>
