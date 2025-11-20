<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, useTemplateRef } from 'vue'
import WaveSurfer, { type WaveSurferOptions } from 'wavesurfer.js'
import type { GenericPlugin } from 'wavesurfer.js/dist/base-plugin.js'
import { useCssVar } from '@/composables/useCssVar'

const waveColor = useCssVar('--ws-wave')
const progressColor = useCssVar('--ws-progress')
const cursorColor = useCssVar('--ws-cursor')

const {
  url,
  isPlaying = false,
  clickToPlay = true,
  mediaControls = true,
  autoplay = false,
  height = 200,
  initialZoom = 100,
  config = {},
  plugins = [],
} = defineProps<{
  url: string
  isPlaying?: boolean
  clickToPlay?: boolean
  mediaControls?: boolean
  autoplay?: boolean
  config?: WaveSurferOptions
  height?: number
  initialZoom?: number
  plugins?: GenericPlugin[]
}>()

const wavesurfer = ref<WaveSurfer | null>(null)
const element = useTemplateRef('ws-element')

function handleClick() {
  if (!clickToPlay) return
  wavesurfer.value?.playPause()
}

onMounted(() => {
  // see https://wavesurfer.xyz/examples/?all-options.js
  wavesurfer.value = WaveSurfer.create({
    container: element.value!,
    dragToSeek: true,
    height,
    url,
    mediaControls,
    autoplay,
    waveColor,
    progressColor,
    cursorColor,
    ...config,
    plugins,
  })

  wavesurfer.value.on('ready', () => {
    if (initialZoom !== 100) wavesurfer.value?.zoom(initialZoom)
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
