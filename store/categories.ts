import {
	RootState
} from "~/store";

import Vue from "vue";
import {
	getterTree,
	mutationTree,
	actionTree
} from "typed-vuex";
import {
	Category
} from "@/types";

/* STATE */
export const state = () => {
	return {
		categories: [] as Array < Category >,
		homeCategories: [] as Array < Category >,
		ofertas: {
			name: 'Ofertas',
			slug: '/ofertas',
			image: "/storage/images/app/icons/ofertas.png",
			id: 9999,
			paused: false
		} as Category,
		novedades: {
			name: 'Novedades',
			slug: '/novedades',
			image: "/storage/images/app/icons/elegi.png",
			id: 9998,
			paused: false
		} as Category,
		otrosProductos: {
			name: 'Otros productos',
			slug: '/otros-productos',
			image: "/storage/images/app/icons/elegi.png",
			id: 9997,
			paused: false
		} as Category
	};
};

export type catalogoState = ReturnType < typeof state > ;

/* GETTERS */
export const getters = getterTree(state, {
	getOfertas(state, getters, rootState, rootGetters) {
		let appimage = rootGetters['appImages/getOffersAppImage'] //.getOffersAppImage
		let res = state.ofertas
		if (appimage && appimage.url) res.image = appimage.url
		return res;
	},
	getNovedades(state, getters, rootState, rootGetters) {
		let appimage = rootGetters['appImages/getNewsAppImage'] //.getNewsAppImage
		let res = state.novedades
		if (appimage && appimage.url) res.image = appimage.url
		return res;
	},
	getOtrosProductos(state, getters, rootState, rootGetters) {
		let appimage = rootGetters['appImages/getNewsAppImage'] //.getNewsAppImage
		let res = state.otrosProductos
		if (appimage && appimage.url) res.image = appimage.url
		return res;
	},
	getCategories(state) {
		return state.categories
	},
	getCategoryByCode:(state)=> (code:string) => {
		return state.homeCategories.find(c => c.code == code)
	},
	getHomeCategories(state) {
		return state.homeCategories
	},
	getNotPausedCategories(state, getters, rootState, rootGetters) {
		let categories = state.categories;
		let res = categories.filter(category => {
			//let products = rootGetters['products/getCategoryProducts'](category);
			//let hasProducs = products.length > 0;
			return !category.paused //&& hasProducs;
		});
		return res;
	},
	getListForMenues(state, getters, rootState, rootGetters) {
		let configs = rootGetters['configs/getConfigs']
		let categories = getters.getHomeCategories
		if (!configs) return []
		let res = categories
		res = res.filter((cat: Category) => cat.id != 9996 && cat.id != 9997 && cat.id != 9998 && cat.id != 9999)
		res = res.map((cat:Category) => {
			return {
				id: cat.id,
				name: cat.name,
				slug: cat.slug,
				code: cat.code,
			}
		});
/*
		let novedades = rootGetters['products/getNews']
		if (novedades.length > 0) {
			res.unshift(getters.getNovedades)
		}

		let ofertas = rootGetters['products/getOffers']
		if (ofertas.length > 0) {
			res.unshift(getters.getOfertas)
		}

		let otrosProductos = rootGetters['products/getOthersProducts']
		if (otrosProductos.length > 0) {
			res.push(getters.getOtrosProductos)
		} */

		return res;
	},
});

/* MUTATIONS */
export const mutations = mutationTree(state, {
	setCategories(state, payload) {
		state.categories = payload;
	},
	setHomeCategories(state, payload) {
		state.homeCategories = payload;
	},
	addCategory(state, payload) {
		state.categories.push(payload);
	}
});

/* ACTIONS */
export const actions = actionTree({state,getters,mutations}, {
	async fetchCategories({commit}) {
		await this.$axios.get('/categories')
		.then(r => {
			commit('setCategories', r.data)
		})
	},
	async fetchNotPausedCategories({commit,rootState,rootGetters,dispatch}) {
		await this.$axios.get('/productsNotPaused')
			.then(r => {
				commit('setHomeCategories', r.data)
				let categories = r.data;
				if(!categories || !categories.length)return;
				categories.forEach( (category:Category) => {
					dispatch('products/remoteAddProducts',category.products,{root:true})
				});
			})
	},

	async saveCategory({commit,state}, data) {
		await this.$axios.post('/category', data)
	},

	async changeImage({commit,
		state
	}, data) {
		await this.$axios.post('/category/image', data)
	},

	async updateCategory({commit,
		state
	}, updateData: {
		id: number,
		field: string,
		value: any
	}) {
		let category = state.categories.find(c => {
			return c.id === updateData.id
		})
		if (category) {
			(category as any)[updateData.field] = updateData.value
		}
		await this.$axios.put('/category', updateData);
	},

	async deleteCategory({
		commit,
		state
	}, id) {
		await this.$axios.delete(`/category/${id}`);
		let newCategories = state.categories.filter(c => {
			return c.id != id
		});
		commit('setCategories', newCategories);
	},

	async confirmImport({
		commit,
		state
	}, data) {
		await this.$axios.post('/import/categories', data);
	}
});
