import { ref } from 'vue'

import Spectrogram, {
  type SpectrogramPluginOptions,
} from 'wavesurfer.js/dist/plugins/spectrogram.esm.js'

export function useSpectrogram(options: SpectrogramPluginOptions = {}) {
  const spectrogram = ref<Spectrogram | null>(null)

  spectrogram.value = Spectrogram.create({
    labels: true,
    height: 200,
    splitChannels: true,
    frequencyMin: 0,
    frequencyMax: 20000,
    fftSamples: 1024,
    useWebWorker: true,
    // Frequency scale type:
    // - 'linear': Standard linear frequency scale (0-20kHz)
    // - 'logarithmic': Logarithmic scale, better for low frequencies
    // - 'mel': Mel scale based on human hearing perception (default)
    // - 'bark': Bark scale for psychoacoustic analysis
    // - 'erb': ERB scale for auditory filter modeling
    scale: 'bark',
    // Additional options
    //
    // Window function for FFT (affects frequency resolution vs time resolution):
    // windowFunc: 'hann' | 'hamming' | 'blackman' | 'bartlett' | 'cosine' | 'gauss' | 'lanczoz' | 'rectangular' | 'triangular'
    //
    // Color mapping for frequency intensity:
    // colorMap: 'gray' | 'igray' | 'roseus' | custom array
    //
    // Gain and range for color scaling:
    // gainDB: 20,        // Brightness adjustment (default: 20dB)
    // rangeDB: 80,       // Dynamic range (default: 80dB)
    //
    // Overlap between FFT windows:
    // noverlap: null,    // Auto-calculated by default, or set manually
    //
    // Maximum canvas width for performance:
    // maxCanvasWidth: 30000,  // Split large spectrograms into multiple canvases
    ...options,
  })

  return {
    spectrogram,
  }
}
