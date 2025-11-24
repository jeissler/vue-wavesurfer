<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import WaveSurfer from './components/WaveSurfer.vue'
import Minimap from 'wavesurfer.js/dist/plugins/minimap.esm.js'
import { useSpectrogramPlugin } from './composables/useSpectrogramPlugin'
import { useZoomPlugin } from './composables/useZoomPlugin'

const defaultUrl = '/media/01 - The chant of the Port Keats men.flac'
const { spectrogramPlugin } = useSpectrogramPlugin()
const { zoomPlugin } = useZoomPlugin()
const minimapPlugin = Minimap.create({ height: 30 })

const isPlaying = ref(false)
const isReady = ref(false)
const playerRef = useTemplateRef('ws-player')

function playPause() {
  isPlaying.value = !isPlaying.value
  playerRef.value?.playPause()
}
</script>

<template>
  <header class="header">
    <div class="container">
      <h1>Vue WaveSurfer.js</h1>
      <a href="https://github.com/jeissler/vue-wavesurfer" target="_blank">GitHub »</a>
    </div>
  </header>

  <main class="container">
    <WaveSurfer
      ref="ws-player"
      :url="defaultUrl"
      :initial-zoom="150"
      :media-controls="false"
      :plugins="[zoomPlugin, minimapPlugin, spectrogramPlugin]"
      @ready="isReady = $event"
    />
    <button v-if="isReady" @click="playPause">{{ isPlaying ? 'Pause' : 'Play' }}</button>
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

button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  background: var(--seafoam-primary);
  color: var(--seafoam-text);
  cursor: pointer;
}
</style>
