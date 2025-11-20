# vue-wavesurfer

Example implimentation of [Wavesurfer.js](https://wavesurfer.xyz/) as a Vue component with plugin configuration in composables. This project is a work-in-progress playground for Vue + Wavesurfer and should serve as a good starting point for extending.

**[Live Demo](vue-wavesurfer.netlify.app)** 🚀

## Usage

See `App.vue` for full usage example and `components/WaveSurfer.vue` for the configuration details. Essentially you just add the component and any desired plugins directly to the plugins array prop. A full config object can be passed as a prop for maximum customization in the component or the spectrogram plugin composable; see `composables/useSpectrogramPlugin.ts`.

```
<WaveSurfer
  url="https://example.com/audio.mp3"
  :height="300"
  :plugins="[]"
/>
```

### Styling

There are 3 Wavesurfer specific variables you can override. See `style.css` for full default theme details.

```
--ws-wave
--ws-progress
--ws-cursor
```

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
pnpm test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```

### Format with [Prettier](https://prettier.io/)

```sh
pnpm format
```
