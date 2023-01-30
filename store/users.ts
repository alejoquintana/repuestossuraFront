import { RootState } from "~/store";

import Vue from "vue";
import { getterTree,mutationTree,actionTree } from "typed-vuex";
import { User } from "@/types";

/* STATE */
export const state = () => {
	return {
		users: [] as Array<User>,
		pagination: null as any,
	};
};

export type catalogoState = ReturnType < typeof state > ;

/* GETTERS */
export const getters = getterTree(state, {
	getUsers(state) {
		return state.users
	},
	getPagination(state) {
		return state.pagination
	}
});

/* MUTATIONS */
export const mutations = mutationTree(state, {
	setUsers(state, payload) {
		state.users = payload
	},
	addUsers(state, payload) {
		state.users = state.users.concat(payload)
	},
	updateUser(state, payload) {
		let index = state.users.findIndex((user:User) => {
			return user.id == payload.id
		})
		//state.users.splice(index, 1, payload);
		if(!index)return;
		state.users[index] = payload
	},
	setPagination(state, payload) {
		state.pagination = payload
	}
});

/* ACTIONS */
export const actions = actionTree({
	state,
	getters,
	mutations
}, {
	async fetchUsers({commit}, searchTerm) {
		let url = '/users-list'
		if (searchTerm) url = url + '/' + searchTerm
		await this.$axios.get(url)
			.then(r => {
				commit('setPagination', r.data)
				commit('setUsers', r.data.data)
			})
	},
	async fetchMoreUsers({state,commit}){
		if(state.pagination && state.pagination.next_page_url)
		{
			this.$axios.get(state.pagination.next_page_url)
				.then( r => {
					commit('setPagination',r.data)
					commit('addUsers',r.data.data)
				})
		}
	},
	async update({commit},data){
		await	this.$axios.put('/user',data)
			.then( r => {
				commit('updateUser',r.data)
			})
	},
});
