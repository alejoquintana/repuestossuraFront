import { getAccessorFromStore } from 'typed-vuex'

import { createStore } from '/home/alejo/Documents/for git/SuspensionLujan/suspensionlujanfront/.nuxt/store'

const storeAccessor = getAccessorFromStore(createStore())

export default async ({ store }, inject) => {
  inject('accessor', storeAccessor(store))
}
