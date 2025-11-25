<script setup lang="ts">
import { ref, computed, useTemplateRef, onBeforeUnmount } from 'vue'
import WaveSurfer from './components/WaveSurfer.vue'
import Minimap from 'wavesurfer.js/dist/plugins/minimap.esm.js'
import { useSpectrogramPlugin } from './composables/useSpectrogramPlugin'
import { useZoomPlugin } from './composables/useZoomPlugin'

const defaultUrl = '/media/01 - The chant of the Port Keats men.flac'
const isPlaying = ref(false)
const isReady = ref(false)
const playerRef = useTemplateRef('ws-player')
const currentUrl = ref(defaultUrl)
// Computed plugins only needed for dynamic re-mounts when URL changes
const plugins = computed(() => {
  const { spectrogramPlugin } = useSpectrogramPlugin()
  const { zoomPlugin } = useZoomPlugin()
  const minimapPlugin = Minimap.create({ height: 30 })
  // Reference current value to refresh plugins when URL changes
  return currentUrl.value ? [zoomPlugin, minimapPlugin, spectrogramPlugin] : []
})

function handlePlayPause() {
  playerRef.value?.playPause()
  isPlaying.value = !isPlaying.value
}

// Clean up previous object URL if it exists (blob URLs start with 'blob:')
function cleanupUrl() {
  if (!currentUrl.value.startsWith('blob:')) return
  URL.revokeObjectURL(currentUrl.value)
}

function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (!file) return
  cleanupUrl()

  currentUrl.value = URL.createObjectURL(file)
  isReady.value = false
  isPlaying.value = false
}

onBeforeUnmount(() => {
  cleanupUrl()
})
</script>

<template>
  <header class="header">
    <div class="container">
      <h1>Vue WaveSurfer.js</h1>
      <a href="https://github.com/jeissler/vue-wavesurfer" target="_blank">GitHub »</a>
    </div>
  </header>

  <main class="container">
    <section v-if="isReady">
      <button @click="handlePlayPause">{{ isPlaying ? 'Pause' : 'Play' }}</button>
      <input type="file" accept="audio/*" @change="handleFileChange" />
    </section>

    <WaveSurfer
      ref="ws-player"
      :key="currentUrl"
      :url="currentUrl"
      :initial-zoom="150"
      :media-controls="false"
      :plugins="plugins"
      @ready="isReady = true"
      @click="isPlaying = !isPlaying"
    />
  </main>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.header {
  background: var(--seafoam-primary);
  color: var(--seafoam-text);
  padding: 1.5rem 1rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 8px rgba(95, 184, 160, 0.2);
}

.header h1 {
  font-weight: 600;
  font-size: 1.75rem;
}

main {
  padding: 1rem 0;
}

hr {
  margin: 2rem 0;
  border: 0;
  border-top: 1px solid var(--seafoam-dark);
}

a {
  color: var(--seafoam-text);
  text-decoration: none;
  font-weight: 600;
}

a:hover {
  text-decoration: underline;
}

section {
  margin-top: 2rem;
  padding: 1.5rem 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

input[type='file'] {
  padding: 0.5rem;
  border: 1px solid var(--seafoam-dark);
  border-radius: 0.25rem;
  background: white;
  cursor: pointer;
}

button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  background: var(--seafoam-primary);
  color: var(--seafoam-text);
  cursor: pointer;
  font-weight: 600;
}
</style>
