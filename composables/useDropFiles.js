import { useDropZone, useFileDialog } from '@vueuse/core'

export const useDropFiles = ($el) => {
  const currentFiles = ref([])
  const { isOverDropZone } = useDropZone($el, {
    onDrop: fileHandler,
  })

  const filesPreview = computed(() => {
    return Array.from(currentFiles.value).map((file) => URL.createObjectURL(file))
  })

  const { open: openFileDialog, onChange } = useFileDialog({ accept: 'image/*', multiple: true })
  onChange(fileHandler)

  function fileHandler(files) {
    currentFiles.value = [...currentFiles.value, ...files]
  }

  function deleteFile(index) {
    if (index === undefined) currentFiles.value = []
    currentFiles.value.splice(index, 1)
  }

  return { currentFiles, filesPreview, isOverDropZone, openFileDialog, deleteFile }
}
