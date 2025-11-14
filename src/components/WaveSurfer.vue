<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, useTemplateRef } from 'vue'
import WaveSurfer from 'wavesurfer.js'

const {
  url,
  isPlaying = false,
  mediaControls = true,
} = defineProps<{
  url: string
  isPlaying: boolean
  mediaControls?: boolean
}>()

const wavesurfer = ref<WaveSurfer | null>(null)
const element = useTemplateRef<HTMLDivElement>('element')

function handleClick() {
  wavesurfer.value?.playPause()
}

onMounted(() => {
  wavesurfer.value = WaveSurfer.create({
    url,
    mediaControls,
    container: element.value!,
    waveColor: 'violet',
    progressColor: 'purple',
    height: 200,
    plugins: [],
  })
})

onBeforeUnmount(() => {
  if (!wavesurfer.value) return
  wavesurfer.value.destroy()
  wavesurfer.value = null
})

watch(
  () => isPlaying,
  (newVal) => {
    if (newVal) {
      wavesurfer.value?.play()
    } else {
      wavesurfer.value?.pause()
    }
  },
)
</script>

<template>
  <div ref="element" @click="handleClick" />
</template>

<style scoped></style>
