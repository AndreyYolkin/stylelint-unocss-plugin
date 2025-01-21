// theme-cache.ts

import { loadConfig as loadUnoConfig } from '@unocss/config'
import defu from 'defu'
import { createCache } from './cache'

const themeCache = createCache(1000)

/**
 * Load the UnoCSS config (if not cached already),
 * then extract & merge the theme. Only the final `theme` is cached.
 */
export async function loadTheme(cwd: string, pathOrObject: string | object) {
  // Check if we've already cached the final theme
  const existing = themeCache.get(cwd, pathOrObject)
  if (existing) {
    return existing
  }

  // Otherwise, load the config and derive the theme
  const promise = loadUnoConfig(cwd, pathOrObject).then((m) => {
    const config = m?.config || {}

    if (!('presets' in config)) {
      return
    }
    // Presets might be a single preset object or an array
    const presets = Array.isArray(config.presets) ? config.presets : [config.presets]
    // Get all preset.theme entries (reverse for layering)
    const themes = presets.map(preset => preset?.theme || {}).toReversed()
    // Merge them into one final theme
    return defu({}, ...themes)
  })

  // Cache the promise, then return it
  themeCache.set(cwd, pathOrObject, promise)
  return promise
}
