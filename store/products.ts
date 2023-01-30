import Vue from "vue";
import {
	RootState
} from "~/store";
import {
	getterTree,
	mutationTree,
	actionTree
} from "typed-vuex";
import {
	Category,
	Product,
	ProductImage
} from "@/types";

/* STATE */
export const state = () => {
	return {
		fetchedCategories:[] as Array <number>,
		products: [] as Array < Product > ,
		paginatedProducts: [] as Array < Product > ,
		mostSold: [] as Array < Product > ,
		productsUpdatesLog: [] as Array < any > ,
		withNoPhotos: [] as Array < any > ,
		currentPage: 1,
		searchTerm: '',
		selectedCategory: null,
		pagination: null as any,
		spareParams: {
			brand: '',
			model: '',
			category: ''
		},
	};
};

export type catalogoState = ReturnType < typeof state > ;

/* GETTERS */
export const getters = getterTree(state, {
	portada: (state, rootState, getters, rootGetters) => (product: Product) => {
		if (!product) return rootGetters.noImage;
		return rootGetters.imagePath(product.images[0]);
	},
	getPageProducts(state, getters) {
		let allProducts = [];
		if (state.selectedCategory) {
			allProducts = getters.getCategoryProducts(state.selectedCategory)
		} else {
			allProducts = state.products
		}
		let page = state.currentPage;
		let res = [];
		const productsPerPage = 20;
		let initial = (page - 1) * productsPerPage;
		let final = ((page) * productsPerPage) - 1;
		for (let index = initial; index < final; index++) {
			const element = allProducts[index];
			if (element) res.push(element)
		}
		return res;
	},
	getProductSlug: (state, getters, rootState, rootGetters) => (product: Product): string => {
		let configs = rootGetters['configs/getConfigs']
		//if (product && !product.category_id) return `/otros-productos${product.slug}`
		if (!configs) return '/'

		let categories = rootState.categories.categories;
		if (!categories)return '';
		let category = categories.find((c: Category) => {
			return c.id === product.category_id
		})
		let categorySlug = category ? category.slug : '/otros-productos'


		return `${categorySlug}${product.slug}`
	},
	getSearchTerm(state) {
		return state.searchTerm
	},
	getCurrentPage(state) {
		return state.currentPage;
	},
	getProducts(state) {
		return state.products
	},
	getMostSold(state) {
		return state.mostSold
	},
	getOffers(state) {
		return state.products.filter(p => {
			return p.offer && !p.paused
		})
	},
	getNews(state) {
		return state.products.filter(p => {
			return p.new && !p.paused
		})
	},
	getOthersProducts(state) {
		return state.products.filter(p => {
			return !p.category_id && !p.paused
		})
	},
	getNextPageUrl(state) {
		if (!state.pagination) return;
		if (!state.pagination.next_page_url) return;
		return state.pagination.next_page_url
	},
	getCategoryProducts: (state) => (category: Category, id: boolean = false): Array < Product > => {
		if (!category) return []
		let category_id = category.id
		let products = state.products;
		if (!(products && products.length)) return []
		let res = products.filter(product => {
			return ((category_id == product.category_id) &&
				!product.paused)
		});
		return res;
	},
	getSpare(state, getters, rootState, rootGetters) {
		let brand: any, model: any, category: any;

		let res = state.products;

		if (state.spareParams.brand) {
			brand = rootGetters['carBrands/getCarBrandByCode'](state.spareParams.brand.replace(/-/g, ' '))
		}
		if (state.spareParams.model) {
			model = rootGetters['carModels/getCarModelByCode'](state.spareParams.model.replace(/-/g, ' '))
		}
		if (state.spareParams.category) {
			category = rootGetters['categories/getCategoryByCode'](state.spareParams.category.replace(/-/g, ' '))
		}

		if(brand && brand.id){
			res =  res.filter( (p:Product) => {
				let include = false ;
				let models = p.car_models;
				if(!models)return false;
				let filteredModels = models.filter(m => m.car_brand_id == brand.id)
				if(filteredModels && filteredModels.length)include = true;
				return include;
			})
		}

		if( model && model.id){
			res = res.filter( (p:Product) => {
				if(!p.car_models)return false;
				let filtered = p.car_models.filter( m => m.id == model.id)
				return (filtered && filtered.length)
			})
		}

		if(category && category.id){
			res = res.filter((p:Product) => p.category_id == category.id)
		}

		return res;
	},
});

/* MUTATIONS */
export const mutations = mutationTree(state, {
	setCurrentPage(state, payload) {
		state.currentPage = payload
	},
	setSearchTerm(state, payload) {
		state.searchTerm = payload;
	},
	setSelectedCategory(state, payload) {
		state.selectedCategory = payload
	},
	setProducts(state, payload) {
		state.products = payload
	},
	setMostSold(state, payload) {
		/* let res:Array<Product> = [];
		payload.forEach((p:any) => {
		    let fullprod = state.products.find(fullp => {
		        return p.product_id == fullp.id
		    })
		    if(fullprod){
		        res.push(fullprod);
		    }
		});*/
		state.mostSold = payload;
	},
	setPagination(state, payload) {
		state.pagination = payload
	},
	setPaginatedProducts(state, payload) {
		state.paginatedProducts = payload
	},
	addProducts(state, payload) {
		let user = payload.user
		payload.products.forEach((newProduct: Product) => {
			let exists = state.products.find(p => {
				return p.id === newProduct.id
			});
			if (!exists) {
				if(user) {
					newProduct.originalPrice = newProduct.price ;
					newProduct.price = newProduct.price - ( newProduct.price * (user.discount/100) );
				}
				state.products.push(newProduct);
			}
		})
		const field = "name";
		state.products = state.products.sort((a, b) => {
			if (a[field] < b[field]) {
				return -1;
			}
			if (a[field] > b[field]) {
				return 1;
			}
			return 0;
		});
	},
	setProductsUpdatesLog(state, payload) {
		state.productsUpdatesLog = payload;
	},
	setProductsWithNoPhotos(state, payload) {
		state.withNoPhotos = payload;
	},
	setSpareParams(state, payload) {
		state.spareParams.brand = payload.marca;
		state.spareParams.model = payload.modelo;
		state.spareParams.category = payload.rubro;
	}
});

/* ACTIONS */
export const actions = actionTree({
	state,
	getters,
	mutations
}, {
	
	async remoteAddProducts({commit},data){
		commit('addProducts',{products:data})
	},

	async fetchProducts({
		commit,
		state
	}) {
		let url = '/paginated-products?page=' + state.currentPage;
		let data = {
			category_id: state.selectedCategory,
			searchTerm: state.searchTerm
		}
		await this.$axios.post(url, data)
			.then(r => {
				commit('setPagination', r.data)
				commit('setPaginatedProducts', r.data.data)
			});
	},
	async fetchallProducts({
		commit
	}) {
		await this.$axios('/all-products').then(r => {
			commit('setProducts', r.data);
		})
	},
	async fetchProductsUpdatesLog({
		commit
	}) {
		/* await this.$axios('/products-updates-log').then(r => {
			commit('setProductsUpdatesLog', r.data);
		}) */
	},
	async fetchProductsWithNoPhotos({
		commit
	}) {
		/* await this.$axios('/products-no-photos').then(r => {
			commit('setProductsWithNoPhotos', r.data);
		}) */
	},
	async fetchOffers({
		commit
	}) {
		/* await this.$axios.get('/offers').then(r => {
			commit('addProducts', r.data);
		}) */
	},
	async fetchMostSold({
		commit
	}) {
		/* await this.$axios.get('/most-sold').then(r => {
			commit('setMostSold', r.data);
		}) */
	},
	async fetchNews({
		commit
	}) {
		/* await this.$axios.get('/news').then(r => {
			commit('addProducts', r.data);
		}) */
	},
	async fetchFoundProducts({commit,rootGetters,rootState}, data) {
		rootState.setLoading = true
		commit('setSpareParams', data);
		await this.$axios.post('/found-products', data).then(r => {
			let user =this.$auth.user;
			commit('addProducts', {products:r.data,user:user});
			rootState.setLoading = false
		})
	},
	async fetchCategoryProducts({
		state,commit,rootGetters,rootState
	}, category_id) {
		if(state.fetchedCategories.includes(category_id))return;
		rootState.setLoading = true
		await this.$axios.get('/category-products/' + category_id).then(r => {
			let user = this.$auth.user;
			commit('addProducts', {products:r.data,user:user});
			state.fetchedCategories.push(category_id)
			rootState.setLoading = false
		})
	},
	async saveProduct({
		commit,
		state
	}, data) {
		let res = null
		await this.$axios.post('/product', data)
			.then(r => {
				res = r.data;
			})
		return res;
	},
	async uploadImage({
		commit,
		state
	}, data) {
		await this.$axios.post('/product/image', data)
	},
	async update({
		commit,
		state
	}, updateData: {
		id: number,
		field: string,
		value: any
	}) {
		let product = state.products.find(p => {
			return p.id === updateData.id
		})
		if (product) {
			(product as any)[updateData.field] = updateData.value
		}
		await this.$axios.put('/product', updateData);
	},
	async imagesOrder({
		commit
	}, list) {
		await this.$axios.put('/product/images-order', {
			list
		});
	},
	async delete({
		commit,
		state
	}, id) {
		await this.$axios.delete(`/product/${id}`);
		let newProducts = state.products.filter(c => {
			return c.id != id
		});
		commit('setProducts', newProducts);
	},
	async deleteImage({
		commit
	}, image) {
		await this.$axios.delete(
			"/product/image/" + image.id
		);
	},
	async confirmImport({
		commit
	}, data) {
		return await this.$axios.post("/import/products", {
			fields: data
		}).then(r => {
			return r.data
		});
	}
});
