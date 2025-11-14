<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, useTemplateRef } from 'vue'
import WaveSurfer, { type WaveSurferOptions } from 'wavesurfer.js'

const {
  url,
  isPlaying = false,
  mediaControls = true,
  autoplay = false,
  config = {},
} = defineProps<{
  url: string
  isPlaying: boolean
  mediaControls?: boolean
  autoplay?: boolean
  config?: WaveSurferOptions
}>()

const wavesurfer = ref<WaveSurfer | null>(null)
const element = useTemplateRef('ws-element')

function handleClick() {
  wavesurfer.value?.playPause()
}

onMounted(() => {
  wavesurfer.value = WaveSurfer.create({
    url,
    mediaControls,
    autoplay,
    container: element.value!,
    waveColor: '#7FDDC4',
    progressColor: '#5FB8A0',
    cursorColor: '#2D5A4E',
    height: 200,
    dragToSeek: true,
    ...config,
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
  <div ref="ws-element" @click="handleClick" />
</template>

<style scoped></style>
