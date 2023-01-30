import { RootState } from "~/store";

import Vue from "vue";
import { getterTree, mutationTree, actionTree } from "typed-vuex";
import { Category, Product, ProductImage, RetiroOption } from "@/types";

/* STATE */
export const state = () => {
    return {
        retiroOptions: [] as Array<RetiroOption>
    };
};

export type catalogoState = ReturnType<typeof state>;

/* GETTERS */
export const getters = getterTree(state, {
    getRetiroOptions(state){
        return state.retiroOptions
    },
    getNotPausedRetiroOptions(state){
        let retiroOptions = state.retiroOptions;
        let res = retiroOptions.filter(options => {
            return options.active == 1
        });
        return res;
    }
});

/* MUTATIONS */
export const mutations = mutationTree(state, {
    setRetiroOptions(state,payload){
        state.retiroOptions = payload   
    }
});

/* ACTIONS */
export const actions = actionTree(
    { state, getters, mutations },
    {
        async fetchRetiroOptions({commit}){
            await this.$axios.get('/retiro-options')
                .then(r => {
                    commit('setRetiroOptions',r.data)
                })
        },
        async create({commit,state,rootState},data){
            await this.$axios.post('/retiro-option',data);
        },
        async update({commit,state,rootState},data){
            await this.$axios.put('/retiro-option',data);
        }
    }
);
