import { RootState } from "~/store";

import Vue from "vue";
import { getterTree, mutationTree, actionTree } from "typed-vuex";

/* STATE */
export const state = () => {
	return {
		appImages: [],
		logo: '/storage/images/app/logo.jpg',
		infoIcons: {
			truck: "/storage/images/app/icons/info-truck.png",
			click: "/storage/images/app/icons/info-click.png",
			hand: "/storage/images/app/icons/info-hand.png",
			cart: "/storage/images/app/icons/info-cart.png"
		},
		icons: {
			exclamacion: "/storage/images/app/icons/exclamacion.png",
			elegi: "/storage/images/app/icons/elegi.png",
			ofertas: "/storage/images/app/icons/ofertas.png",
			hearth: "/storage/images/app/icons/corazon.png",
			pinkCart: "/storage/images/app/icons/pink-cart.png"
		},

	};
};

export type catalogoState = ReturnType<typeof state>;

/* GETTERS */
export const getters = getterTree(state, {
	getLogo: (state, getters, rootState, rootGetters) => {
		return rootGetters['helpers/imagePath'](state.logo)
	},
	getAppImages(state) {
		return state.appImages
	},
	getAppImagesByCode: (state) => (code: string) => {
		let res = state.appImages
		res = res.filter((appimg: any) => {
			return appimg.code == code;
		})
		return res
	},
	getByCodeNotPaused: (state) => (code: string) => {
		return state.appImages.filter((appimg: any) => {
			return appimg.code == code && !appimg.paused;
		})
	},
	getAppImage: (state) => (code: string) => {
		return state.appImages.find((aI: any) => {
			return aI.code == code;
		})
	},
	getInfoIcon: (state, getters, rootState, rootGetters) => (icon: string) => {
		return rootGetters['helpers/imagePath']((state.infoIcons as any)[icon]);
	},
	getIcon: (state, getters, rootState, rootGetters) => (icon: string) => {
		return rootGetters['helpers/imagePath']((state.icons as any)[icon]);
	},
	getCaratula(state) {
		if (!state.appImages) return;
		let appImage = state.appImages.find((appimg: any) => {
			return appimg.code == 'caratula_catalogo'
		})
		return appImage;
	},
	getOffersAppImage(state) {
		if (!state.appImages) return;
		let appImage = state.appImages.find((appimg: any) => {
			return appimg.code == 'offers_image'
		})
		return appImage;
	},
	getNewsAppImage(state) {
		if (!state.appImages) return;
		let appImage = state.appImages.find((appimg: any) => {
			return appimg.code == 'news_image'
		})
		return appImage;
	}
});

/* MUTATIONS */
export const mutations = mutationTree(state, {
	setAppImages(state, payload) {
		state.appImages = payload
	}
});

/* ACTIONS */
export const actions = actionTree(
	{ state, getters, mutations },
	{
		async fetchAppImages({ commit, state }) {
			await this.$axios.get('/app-images').then(r => { commit('setAppImages', r.data) })
		},
		async create({ }, data) {
			await this.$axios.post('/app-images', data);
		},
		async createBannerHome({ }, data) {
			await this.$axios.post('/banner-home', data);
		},
		async update({ state }, data: any) {
			let image: any = state.appImages.find((img: any) => {
				return img.id === data.id
			})
			if (!image) return;
			image[data.field] = data.value
			await this.$axios.put('/app-images', data);
		},
		async destroy({ }, id) {
			await this.$axios.delete('/app-images/' + id);
		},
		async upload({ }, fdata) {
			await this.$axios.post('/app-images/upload', fdata)
		}

	}
);
