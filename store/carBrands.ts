import {
	RootState
} from "~/store";

import Vue from "vue";
import {
	getterTree,
	mutationTree,
	actionTree
} from "typed-vuex";
import {} from "@/types";

/* STATE */
export const state = () => {
	return {
		carBrands: [] as Array<any>
	};
};

export type carBrandsState = ReturnType < typeof state > ;

/* GETTERS */
export const getters = getterTree(state, {
	getCarBrands(state) {
		return state.carBrands
	},
	getCarBrand:(state)=>(car_brand_id:Number)=>{
		if (!state.carBrands) return
		return state.carBrands.find(brand => {
			return brand.id == car_brand_id
		})
	},
	getCarBrandByCode:(state)=>(code:string)=>{
		if (!state.carBrands) return
		return state.carBrands.find(brand => {
			return brand.code == code
		})
	},
});

/* MUTATIONS */
export const mutations = mutationTree(state, {
	setCarBrands(state, payload) {
		state.carBrands = payload
	},
	addCarBrands(state, payload) {
		state.carBrands.push(payload)
	},
	updateCarModel(state, payload) {
		let index = state.carBrands.findIndex((c:any) => {
			return c.id === payload.id
		})
		if (index) {
			state.carBrands[index][payload.field] = payload.value
		}
	},
	deleteCarBrands(state, payload) {
		let newTexts = state.carBrands.filter((c: any) => {
			return c.id != payload
		});
		state.carBrands = newTexts
	},
});

/* ACTIONS */
export const actions = actionTree({state,getters,mutations}, {

	async fetch({commit}) {
		await this.$axios.get('/car-brands')
			.then(r => {
				commit('setCarBrands', r.data)
			})
	},

	async create({commit}, data) {
		await this.$axios.post('/car-brand', data).then(response => {
			commit('addCarBrands', response.data);
		})
	},

	async update({commit}, updateData:{id:number,field:string,value:any}) {
		await this.$axios.put('/car-brand', updateData);
		//commit('deleteCarBrands', updateData);
	},

	async destroy({commit}, id) {
		await this.$axios.delete(`/car-brand/${id}`);
		commit('deleteCarBrands', id);
	},

	async confirmImport({commit}, data) {
		await this.$axios.post('/import/car-brand/',data)
	},
});
