import { useDropZone, useFileDialog } from '@vueuse/core'

export const useDropFiles = ($el) => {
  const currentFiles = ref([])
  const { isOverDropZone } = useDropZone($el, {
    onDrop: fileHandler,
  })

  const { open: openFileDialog, onChange } = useFileDialog({ accept: 'image/*', multiple: true })
  onChange(fileHandler)

  function fileHandler(files) {
    currentFiles.value = [...currentFiles.value, ...files]
    console.log(currentFiles.value)
  }

  function deleteFile(index) {
    currentFiles.value.splice(index, 1)
  }

  return { currentFiles, isOverDropZone, openFileDialog, deleteFile }
}
