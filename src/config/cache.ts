/**
 * Creates a caching utility that can store and retrieve Promises
 * keyed by a combination of `cwd` (string) and a second key
 * (string or object).
 *
 * @param timeout - Optional timeout in milliseconds after which items are removed.
 */

type MapKey = string | undefined
type SubMapKey = string | object | undefined

export function createCache(timeout = 5000) {
  const store: Map<MapKey, Map<SubMapKey, Promise<any>>> = new Map()

  /**
   * Retrieve a Promise from the cache, or `undefined` if not found.
   */
  function get(cwd: MapKey, key: SubMapKey): Promise<any> | undefined {
    const subMap = store[String(cwd)]
    if (!subMap)
      return undefined
    return subMap.get(key)
  }

  /**
   * Store a Promise in the cache under (cwd, key),
   * removing it after `timeout` ms.
   */
  function set(cwd: MapKey, key: SubMapKey, value: Promise<any>): void {
    let subMap = store.get(cwd)
    if (!subMap) {
      subMap = new Map()
      store.set(cwd, subMap)
    }

    subMap.set(key, value)

    // Remove the item after `timeout` ms
    value.then(() => {
      setTimeout(() => {
        subMap.delete(key)
        if (subMap.size === 0) {
          store.delete(cwd)
        }
      }, timeout)
    })
  }

  return { get, set }
}
