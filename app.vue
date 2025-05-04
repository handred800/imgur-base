<template>
  <div class="max-w-[1280px] mx-auto px-4 py-6">
    <NuxtPage />
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  filter: blur(10px);
}
</style>
