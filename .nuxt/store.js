import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const VUEX_PROPERTIES = ['state', 'getters', 'actions', 'mutations']

let store = {};

(function updateModules () {
  store = normalizeRoot(require('../store/index.ts'), 'store/index.ts')

  // If store is an exported method = classic mode (deprecated)

  if (typeof store === 'function') {
    return console.warn('Classic mode for store/ is deprecated and will be removed in Nuxt 3.')
  }

  // Enforce store modules
  store.modules = store.modules || {}

  resolveStoreModules(require('../store/admin.ts'), 'admin.ts')
  resolveStoreModules(require('../store/appImages.ts'), 'appImages.ts')
  resolveStoreModules(require('../store/blackBarTexts.ts'), 'blackBarTexts.ts')
  resolveStoreModules(require('../store/carBrands.ts'), 'carBrands.ts')
  resolveStoreModules(require('../store/carModels.ts'), 'carModels.ts')
  resolveStoreModules(require('../store/categories.ts'), 'categories.ts')
  resolveStoreModules(require('../store/configs.ts'), 'configs.ts')
  resolveStoreModules(require('../store/helpers.ts'), 'helpers.ts')
  resolveStoreModules(require('../store/linktreeLinks.ts'), 'linktreeLinks.ts')
  resolveStoreModules(require('../store/mdicons.ts'), 'mdicons.ts')
  resolveStoreModules(require('../store/orders.ts'), 'orders.ts')
  resolveStoreModules(require('../store/pageMetas.ts'), 'pageMetas.ts')
  resolveStoreModules(require('../store/pdfs.ts'), 'pdfs.ts')
  resolveStoreModules(require('../store/posts.ts'), 'posts.ts')
  resolveStoreModules(require('../store/productCarModel.ts'), 'productCarModel.ts')
  resolveStoreModules(require('../store/products.ts'), 'products.ts')
  resolveStoreModules(require('../store/retiroOptions.ts'), 'retiroOptions.ts')
  resolveStoreModules(require('../store/searchResults.ts'), 'searchResults.ts')
  resolveStoreModules(require('../store/shop.ts'), 'shop.ts')
  resolveStoreModules(require('../store/states.ts'), 'states.ts')
  resolveStoreModules(require('../store/stats.ts'), 'stats.ts')
  resolveStoreModules(require('../store/sucursales.ts'), 'sucursales.ts')
  resolveStoreModules(require('../store/trackEvents.ts'), 'trackEvents.ts')
  resolveStoreModules(require('../store/users.ts'), 'users.ts')
  resolveStoreModules(require('../store/vacio para copia.ts'), 'vacio para copia.ts')

  // If the environment supports hot reloading...

  if (process.client && module.hot) {
    // Whenever any Vuex module is updated...
    module.hot.accept([
      '../store/admin.ts',
      '../store/appImages.ts',
      '../store/blackBarTexts.ts',
      '../store/carBrands.ts',
      '../store/carModels.ts',
      '../store/categories.ts',
      '../store/configs.ts',
      '../store/helpers.ts',
      '../store/index.ts',
      '../store/linktreeLinks.ts',
      '../store/mdicons.ts',
      '../store/orders.ts',
      '../store/pageMetas.ts',
      '../store/pdfs.ts',
      '../store/posts.ts',
      '../store/productCarModel.ts',
      '../store/products.ts',
      '../store/retiroOptions.ts',
      '../store/searchResults.ts',
      '../store/shop.ts',
      '../store/states.ts',
      '../store/stats.ts',
      '../store/sucursales.ts',
      '../store/trackEvents.ts',
      '../store/users.ts',
      '../store/vacio para copia.ts',
    ], () => {
      // Update `root.modules` with the latest definitions.
      updateModules()
      // Trigger a hot update in the store.
      window.$nuxt.$store.hotUpdate(store)
    })
  }
})()

// createStore
export const createStore = store instanceof Function ? store : () => {
  return new Vuex.Store(Object.assign({
    strict: (process.env.NODE_ENV !== 'production')
  }, store))
}

function normalizeRoot (moduleData, filePath) {
  moduleData = moduleData.default || moduleData

  if (moduleData.commit) {
    throw new Error(`[nuxt] ${filePath} should export a method that returns a Vuex instance.`)
  }

  if (typeof moduleData !== 'function') {
    // Avoid TypeError: setting a property that has only a getter when overwriting top level keys
    moduleData = Object.assign({}, moduleData)
  }
  return normalizeModule(moduleData, filePath)
}

function normalizeModule (moduleData, filePath) {
  if (moduleData.state && typeof moduleData.state !== 'function') {
    console.warn(`'state' should be a method that returns an object in ${filePath}`)

    const state = Object.assign({}, moduleData.state)
    // Avoid TypeError: setting a property that has only a getter when overwriting top level keys
    moduleData = Object.assign({}, moduleData, { state: () => state })
  }
  return moduleData
}

function resolveStoreModules (moduleData, filename) {
  moduleData = moduleData.default || moduleData
  // Remove store src + extension (./foo/index.js -> foo/index)
  const namespace = filename.replace(/\.(js|mjs|ts)$/, '')
  const namespaces = namespace.split('/')
  let moduleName = namespaces[namespaces.length - 1]
  const filePath = `store/${filename}`

  moduleData = moduleName === 'state'
    ? normalizeState(moduleData, filePath)
    : normalizeModule(moduleData, filePath)

  // If src is a known Vuex property
  if (VUEX_PROPERTIES.includes(moduleName)) {
    const property = moduleName
    const propertyStoreModule = getStoreModule(store, namespaces, { isProperty: true })

    // Replace state since it's a function
    mergeProperty(propertyStoreModule, moduleData, property)
    return
  }

  // If file is foo/index.js, it should be saved as foo
  const isIndexModule = (moduleName === 'index')
  if (isIndexModule) {
    namespaces.pop()
    moduleName = namespaces[namespaces.length - 1]
  }

  const storeModule = getStoreModule(store, namespaces)

  for (const property of VUEX_PROPERTIES) {
    mergeProperty(storeModule, moduleData[property], property)
  }

  if (moduleData.namespaced === false) {
    delete storeModule.namespaced
  }
}

function normalizeState (moduleData, filePath) {
  if (typeof moduleData !== 'function') {
    console.warn(`${filePath} should export a method that returns an object`)
    const state = Object.assign({}, moduleData)
    return () => state
  }
  return normalizeModule(moduleData, filePath)
}

function getStoreModule (storeModule, namespaces, { isProperty = false } = {}) {
  // If ./mutations.js
  if (!namespaces.length || (isProperty && namespaces.length === 1)) {
    return storeModule
  }

  const namespace = namespaces.shift()

  storeModule.modules[namespace] = storeModule.modules[namespace] || {}
  storeModule.modules[namespace].namespaced = true
  storeModule.modules[namespace].modules = storeModule.modules[namespace].modules || {}

  return getStoreModule(storeModule.modules[namespace], namespaces, { isProperty })
}

function mergeProperty (storeModule, moduleData, property) {
  if (!moduleData) {
    return
  }

  if (property === 'state') {
    storeModule.state = moduleData || storeModule.state
  } else {
    storeModule[property] = Object.assign({}, storeModule[property], moduleData)
  }
}
