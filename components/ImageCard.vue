<template>
  <div class="border border-slate-300 rounded-md shadow hover:shadow-lg overflow-hidden duration-100 relative">
    <div class="aspect-[5/3]">
      <img
        class="w-full h-full object-cover"
        :src="props.img"
        alt=""
      >
    </div>
    <div class="absolute bottom-0 w-full p-2">
      <div class="join w-full">
        <div class="w-full">
          <input
            ref="$input"
            type="text"
            class="input input-bordered input-sm w-full join-item opacity-60 focus:opacity-100 hover:opacity-100 selection:bg-pink-300"
            :value="props.href"
            @click="copy"
          >
        </div>
        <button
          class="btn btn-sm join-item"
          @click="clickView"
        >
          <Eye />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Eye } from 'lucide-vue-next'

const props = defineProps({
  img: String,
  name: String,
  href: String,
})
const emit = defineEmits(['clickView'])
const $input = ref(null)

function copy() {
  $input.value.select()
  navigator.clipboard.writeText(props.href)
}

function clickView() {
  emit('clickView', props.href)
}
</script>
