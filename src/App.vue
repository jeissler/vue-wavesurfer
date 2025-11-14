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
}

.header {
  background: violet;
  color: purple;
  padding: 1rem;
  margin-bottom: 1rem;
}
</style>
