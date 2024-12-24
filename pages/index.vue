<script setup>
definePageMeta({
  middleware(to) {
    if (to.path === '/') return navigateTo('/album')
  },
})
</script>
