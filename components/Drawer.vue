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
      class="w-full h-full fixed top-0 left-0 flex items-center justify-center bg-slate-600 bg-opacity-30 backdrop-blur"
      @click.self="emit('close')"
    >
      <div class="fixed bottom-0 left-0 w-full h-[90vh] bg-white shadow rounded-xl p-5 md:p-10 overflow-y-auto">
        <slot />
      </div>
    </div>
  </Transition>
</template>

<script setup>
const props = defineProps({
  isShow: Boolean,
})
const emit = defineEmits(['close'])

watch(() => props.isShow, () => {
  document.querySelector('body').style.overflow = props.isShow ? 'hidden' : 'auto'
})
</script>
