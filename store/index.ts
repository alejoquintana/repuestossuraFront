/* const axios = require('@nuxtjs/axios'); */
import {
	getAccessorType,
	getterTree,
	actionTree,
	mutationTree
} from "nuxt-typed-vuex";

import {
	createDirectStore
} from "direct-vuex"

import * as appImages from '~/store/appImages'
import * as admin from '~/store/admin'
import * as categories from '~/store/categories'
import * as carBrands from '~/store/carBrands'
import * as carModels from '~/store/carModels'
import * as linktreeLinks from '~/store/linktreeLinks'
import * as products from '~/store/products'
import * as trackEvents from '~/store/trackEvents'
import * as blackBarTexts from '~/store/blackBarTexts'
import * as helpers from '~/store/helpers'
import * as shop from '~/store/shop'
import * as mdicons from '~/store/mdicons'
import * as configs from '~/store/configs'
import * as searchResults from '~/store/searchResults'
import * as pageMetas from "~/store/pageMetas";
import * as states from "~/store/states";
import * as stats from "~/store/stats";
import * as retiroOptions from "~/store/retiroOptions";
import * as sucursales from "~/store/sucursales";
import * as posts from "~/store/posts";
import * as pdfs from "~/store/pdfs";
import * as productCarModel from "~/store/productCarModel";
import * as users from "~/store/users";

import {
	Auth
} from '@nuxtjs/auth'
import {
	Product,
	ProductImage
} from "~/types";

declare module 'vuex/types/index' {
	interface Store < S > {
		$auth: Auth,
	}
}

export const strict = false

export const state = () => {
	return {
		loading: false,
		showRegisterModal: false as boolean,
		showSnackbar: false as boolean,
		snackbarMessage: "",
		loadingMessage: "",
		backend: process.env.backendUrl
	};
}

export type RootState = ReturnType < typeof state > ;

export const getters = getterTree(state, {
	getShowRegisterModal(store) {
		return store.showRegisterModal
	},
	noImage(store) {
		return `${store.backend}/storage/images/app/no-image.png`;
	},
	getLoading(store) {
		return store.loading;
	},
	getLoadingMessage(store) {
		return store.loadingMessage;
	},
	getShowSnackbar(store) {
		return store.showSnackbar;
	},
	getSnackbarMessage(store) {
		return store.snackbarMessage;
	},
	imagePath: (store, getters) => (image: ProductImage | string | null) => {
		if (!image) {
			return getters.noImage;
		}
		if (typeof image === 'object') {
			if (!(image as ProductImage).url) {
				return getters.noImage
			}
			return `${store.backend}${(image as ProductImage).url}`;
		}
		if (typeof image === 'string') {
			return `${store.backend}${image}`;
		}
		return getters.noImage
	},
});


export const mutations = mutationTree(state, {
	snackbarNotify(state, payload: string) {
		state.snackbarMessage = payload;
		state.showSnackbar = true;
	},
	setLoading(state, payload: boolean) {
		state.loading = payload;
	},
	setLoadingMessage(state, payload: string) {
		state.loadingMessage = payload
	},
	setShowSnackbar(state, payload: boolean) {
		state.showSnackbar = payload;
	},
	setShowRegisterModal(state, payload: boolean) {
		state.showRegisterModal = payload;
	},
	setSnackbarMessage(state, payload: string) {
		state.snackbarMessage = payload
	}
})

export const actions = actionTree({
	state,
	getters,
	mutations
}, {
	async nuxtServerInit({
		commit
	}) {
		await this.app.$accessor.pageMetas.fetchAllMeta()
		await this.app.$accessor.configs.fetchConfigs();
		await this.app.$accessor.categories.fetchCategories();
		await this.app.$accessor.posts.fetchPostTitles();
	},
});

// This compiles to nothing and only serves to return the correct type of the accessor
export const accessorType = getAccessorType({
	state,
	getters,
	mutations,
	actions,
	modules: {
		// The key (submodule) needs to match the Nuxt namespace (e.g. ~/store/submodule.ts)
		appImages,
		admin,
		helpers,
		categories,
		carBrands,
		carModels,
		linktreeLinks,
		products,
		trackEvents,
		blackBarTexts,
		shop,
		mdicons,
		configs,
		pageMetas,
		states,
		searchResults,
		stats,
		retiroOptions,
		sucursales,
		posts,
		pdfs,
		productCarModel,
		users,
	}
});
