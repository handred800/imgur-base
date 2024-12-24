<template>
  <img
    :src="props.src"
    class="w-full h-full duration-200 object-cover"
    :class="{ 'opacity-30': isLoading, 'blur-md': isLoading }"
    alt=""
  >
</template>

<script setup>
import { useImage } from '@vueuse/core'

const props = defineProps({
  src: String,
})

const { isLoading } = useImage({ src: props.src })
</script>
