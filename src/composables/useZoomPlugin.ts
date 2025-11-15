import ZoomPlugin, { type ZoomPluginOptions } from 'wavesurfer.js/dist/plugins/zoom.esm.js'
import { ref, type Ref } from 'vue'

export function useZoomPlugin(options: ZoomPluginOptions = {}): {
  zoomPlugin: Ref<ZoomPlugin | null>
} {
  const zoomPlugin = ref<ZoomPlugin | null>(null)

  zoomPlugin.value = ZoomPlugin.create({
    scale: 0.25,
    maxZoom: 100,
    ...options,
  })

  return {
    zoomPlugin: zoomPlugin as Ref<ZoomPlugin | null>,
  }
}
