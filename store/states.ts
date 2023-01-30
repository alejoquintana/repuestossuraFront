import { RootState } from "~/store";

import Vue from "vue";
import { getterTree, mutationTree, actionTree } from "typed-vuex";
import { Category, Product, ProductImage } from "@/types";

/* STATE */
export const state = () => {
  return {
      states:[]
  };
};

export type catalogoState = ReturnType<typeof state>;

/* GETTERS */
export const getters = getterTree(state, {
    getStates(store){
        return store.states
    }
});

/* MUTATIONS */
export const mutations = mutationTree(state, {
    setStates(state,payload){
        state.states = payload
    }
});

/* ACTIONS */
export const actions = actionTree({ state, getters, mutations }, {
    async fetchStates({commit}){
        await this.$axios.get('/states')
            .then(r => {
                commit('setStates',r.data)
            })
    }
});
