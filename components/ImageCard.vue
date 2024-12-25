<template>
  <div class="relative">
    <div class="aspect-[5/3] rounded-xl overflow-hidden border border-slate-300 shadow hover:shadow-lg duration-100">
      <NuxtImg :src="props.img" />
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
        <div class="dropdown dropdown-end dropdown-hover">
          <button
            class="btn btn-sm join-item"
          >
            <IconEllipsis />
          </button>
          <ul
            tabindex="0"
            class="dropdown-content menu bg-white rounded-xl w-32 z-[1] p-2 shadow-lg"
          >
            <li>
              <slot name="view" />
            </li>
            <li>
              <slot name="delete" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  img: String,
  name: String,
  href: String,
})
const $input = ref(null)

function copy() {
  $input.value.select()
  navigator.clipboard.writeText(props.href)
}
</script>
