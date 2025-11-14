<script setup lang="ts">
import WaveSurfer from './components/WaveSurfer.vue'
import { ref } from 'vue'

const defaultUrl = '/media/01 - The chant of the Port Keats men.flac'
const isPlaying = ref(false)
</script>

<template>
  <header class="header">
    <div class="container">
      <h1>Vue WaveSurfer</h1>
    </div>
  </header>

  <main class="container">
    <WaveSurfer :is-playing="isPlaying" :url="defaultUrl" :media-controls="false" />
    <!-- <WaveSurfer /> -->
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
</style>
