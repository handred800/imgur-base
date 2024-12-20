<template>
  <Transition
    enter-active-class="duration-300 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="duration-200 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="props.isShow"
      class="w-full h-full fixed top-0 left-0 flex items-center justify-center bg-slate-600 bg-opacity-30 backdrop-blur p-5"
      @click.self="emit('close')"
    >
      <img
        class="block w-full max-w-screen-xl max-h-[90vh] object-scale-down shadow-xl"
        :src="props.imgUrl"
        alt=""
      >
    </div>
  </Transition>
</template>

<script setup>
const props = defineProps({
  isShow: Boolean,
  imgUrl: String,
})
const emit = defineEmits(['close'])

watch(() => props.isShow, () => {
  document.querySelector('body').style.overflow = props.isShow ? 'hidden' : 'auto'
})
</script>
