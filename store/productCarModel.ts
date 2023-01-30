import Vue from "vue";
import {RootState} from "~/store";
import {getterTree,mutationTree,actionTree} from "typed-vuex";
import {Product} from "@/types";

/* STATE */
export const state = () => {
	return {
		productCarModel: [] as Array < any > ,
	};
};

export type catalogoState = ReturnType < typeof state > ;

/* GETTERS */
export const getters = getterTree(state, {
	getProductCarModel(state) {
		return state.productCarModel
	},
	getByProduct:(state)=>(id:Number)=> {
		return state.productCarModel.filter((r:any) => {
			return r.pivot.product_id == id
		})
	},
});

/* MUTATIONS */
export const mutations = mutationTree(state, {
	setProductCarModel(state, payload) {
		state.productCarModel = payload
	},
	addProductCarModel(state, payload) {
		state.productCarModel = [...state.productCarModel, ...payload]
	},
});

/* ACTIONS */
export const actions = actionTree({state,getters,mutations}, {

	async fetchProductCarModel({commit}) {
		await this.$axios('/all-product-car-model').then(r => {
			commit('setProductCarModel', r.data);
		})
	},
	async fetchProductCarModelById({commit},{id,type}) {
		await this.$axios(`/relations/${type}/${id}`).then(r => {
			commit('addProductCarModel', r.data);
		})
	},
	async create({},data) {
		await this.$axios.post('/product-car-model',data).then(r=>{
			return r.data
		})
	},
	async update({},data) {
		return await this.$axios.put('/product-car-model',data)
	},
	async destroy({ }, id) {
		return await this.$axios.delete(`/product-car-model/${id}`)
	},
	async confirmImport({},data) {
		return await this.$axios.post('/import/product-car-model/',data).then(r=>{
			return r.data
		})
	},

});
