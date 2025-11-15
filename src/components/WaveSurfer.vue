<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, useTemplateRef } from 'vue'
import WaveSurfer, { type WaveSurferOptions } from 'wavesurfer.js'
import { useCssVar } from '@/composables/useCssVar'

const waveColor = useCssVar('--seafoam-primary')
const progressColor = useCssVar('--seafoam-dark')
const cursorColor = useCssVar('--seafoam-light')

const {
  url,
  isPlaying = false,
  mediaControls = true,
  autoplay = false,
  height = 200,
  config = {},
  plugins = [],
} = defineProps<{
  url: string
  isPlaying: boolean
  mediaControls?: boolean
  autoplay?: boolean
  config?: WaveSurferOptions
  height?: number
  plugins?: Partial<WaveSurferOptions>['plugins']
}>()

const wavesurfer = ref<WaveSurfer | null>(null)
const element = useTemplateRef('ws-element')

function handleClick() {
  wavesurfer.value?.playPause()
}

onMounted(() => {
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
    ...plugins,
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
