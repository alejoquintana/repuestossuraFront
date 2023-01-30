import { getterTree, actionTree, mutationTree } from "nuxt-typed-vuex";
import { RootState } from '~/store'
import { ProductImage } from "~/types";

export const state = () => {
	return {
		no_shop: false,
		selectedPatternColor: "#EED3FE",
		devmode: (process.env.NODE_ENV == "development") as boolean,
		colors: {
			primary: '#126293',
			tertiary: '#B90105',
			blue: '#126293',
			red: '#B90105',
		}
	};
}

export type ConfigState = ReturnType < typeof state >

	export const getters = getterTree(state, {
		orderArray: (state) => (array: Array < any > , field: string) => {
			return array.sort((a, b) => {
				if (a[field] < b[field]) {
					return -1
				}
				if (a[field] > b[field]) {
					return 1
				}
				return 0;
			})
		},
		backendpath(state) {
			return process.env.backendUrl || 'https://localhost:8000'
		},
		noImage(state, getters) {
			return `${getters.backendpath}/storage/images/app/no-image.png`;
		},
		logo(state, getters) {
			return `${getters.backendpath}/storage/images/app/logo.jpg`;
		},
		largeLogo(state, getters) {
			return `${getters.backendpath}/storage/images/app/large-logo.jpg`;
		},
		largeLogoText(state, getters) {
			return `${getters.backendpath}/storage/images/app/large-logo-text.jpg`;
		},
		imagePath: (state, getters) => (path: string | ProductImage | null | undefined) => {
			if (!path) {
				return getters.noImage;
			} else if ((typeof path) == 'string') {
				return `${getters.backendpath}${path}`
			} else if (typeof path === 'object') {
				if (path!.url) {
					return `${getters.backendpath}${path.url}`
				} else {
					return getters.noImage
				}
			}
		},
		sanitizedLink: (state) => (link: any) => {
			if (!link) return '/';
			let res = link;

			if (res[0] != '/' && !(res.startsWith('https://') || res.startsWith('http://'))) {
				res = ['http://', res].join('');
			}
			res = res.replace('www.', '');

			let remove = [
				'http://localhost:3009',
				'https://www.repuestossura.com',
				'http://www.repuestossura.com',
				'https://repuestossura.com',
				'http://repuestossura.com',
				'www.repuestossura.com',
				'repuestossura.com',
			];
			remove.forEach(item => {
				res = res.replace(item, '');
			});

			if (res == '') {
				res = '/';
			}

			return res;
		},

	});

export const mutations = mutationTree(state, {

})

export const actions = actionTree({
	state,
	getters,
	mutations
}, {

})

export default {
	namespaced: true as true,
	state,
	getters,
	actions,
	mutations
}
