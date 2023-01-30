import { RootState } from "~/store";

import Vue from "vue";
import { getterTree, mutationTree, actionTree } from "typed-vuex";
import { Category, Product, ProductImage } from "@/types";
import { mdiThumbsUpDown } from "@mdi/js";

/* STATE */
export const state = () => {
    return {
        processing: true,
        pdfs: null
    };
};

export type catalogoState = ReturnType<typeof state>;

/* GETTERS */
export const getters = getterTree(state, {
    getPdfs(state){
        return state.pdfs
    },
    getProcessing(state){
        return state.processing
    },
});

/* MUTATIONS */
export const mutations = mutationTree(state, {
    setPdfs(state,payload){
        state.pdfs =  payload
    },
    setProcessing(state,payload){
        state.processing =  payload
    }
});

/* ACTIONS */
export const actions = actionTree(
    { state, getters, mutations },
    {
        async fetchPdfs({commit}){
            await this.$axios.get('/posts')
            .then(r => {
                commit('setPdfs',r.data)
            })
        },
        async trigerJob({commit}){
            await this.$axios.get('/catalogo-deposito-job')
            .then(r=>{
                commit('setProcessing',true)
            });
        },
        async checkProcessing({commit}){
            await this.$axios.get('/processing-job')
            .then(r => {
                commit('setProcessing',!!r.data)
            });
        }
    }
);
