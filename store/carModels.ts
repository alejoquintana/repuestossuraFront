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
		carModels: [] as Array<any>
	};
};

export type carModelsState = ReturnType < typeof state > ;

/* GETTERS */
export const getters = getterTree(state, {
	getCarModels(state) {
		return state.carModels
	},
	getCarModel:(state) => (car_model_id:number) => {
		return state.carModels.find(model => model.id == car_model_id)
	},
	getCarModelByCode:(state) => (code:string) => {
		return state.carModels.find(model => model.code == code)
	},
});

/* MUTATIONS */
export const mutations = mutationTree(state, {
	setCarModels(state, payload) {
		state.carModels = payload
	},
	addCarModels(state, payload) {
		state.carModels.push(payload)
	},
	updateCarModel(state, payload) {
		let index = state.carModels.findIndex((c:any) => {
			return c.id === payload.id
		})
		if (index) {
			state.carModels[index][payload.field] = payload.value
		}
	},
	deleteCarModels(state, payload) {
		let newTexts = state.carModels.filter((c: any) => {
			return c.id != payload
		});
		state.carModels = newTexts
	},
});

/* ACTIONS */
export const actions = actionTree({state,getters,mutations}, {

	async fetch({commit}) {
		await this.$axios.get('/car-models')
			.then(r => {
				commit('setCarModels', r.data)
			})
	},

	async create({commit}, data) {
		await this.$axios.post('/car-model', data).then(response => {
			commit('addCarModels', response.data);
		})
	},

	async update({commit}, updateData:{id:number,field:string,value:any}) {
		commit('deleteCarModels', updateData);
		await this.$axios.put('/car-model', updateData);
	},

	async destroy({commit}, id) {
		await this.$axios.delete(`/car-model/${id}`);
		commit('deleteCarModels', id);
	},

	async confirmImport({ commit }, data) {
		await this.$axios.post('/import/car-models/', data)
	},
});
