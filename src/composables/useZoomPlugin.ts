import ZoomPlugin, { type ZoomPluginOptions } from 'wavesurfer.js/dist/plugins/zoom.esm.js'

export function useZoomPlugin(options: ZoomPluginOptions = {}): {
  zoomPlugin: ZoomPlugin
} {
  const zoomPlugin = ZoomPlugin.create({
    scale: 0.25,
    maxZoom: 100,
    ...options,
  })

  return {
    zoomPlugin,
  }
}
