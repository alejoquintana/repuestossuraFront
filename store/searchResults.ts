import { RootState } from "~/store";

import Vue from "vue";
import { getterTree, mutationTree, actionTree } from "typed-vuex";
import { Category, Product, ProductImage } from "@/types";

/* STATE */
export const state = () => {
    return {
        searchTerm:'',
        searchHistory:[],
    };
};

export type catalogoState = ReturnType<typeof state>;

/* GETTERS */
export const getters = getterTree(state, {
    getSearchTerm(state){
        return state.searchTerm
    },
    getSearchHistory(state){
        return state.searchHistory
    },
    compatibleSearch:(state) => (searchString:string) : Boolean => {
        let searchTerm = state.searchTerm.toUpperCase();
        searchString = searchString.toUpperCase();
        let terms = searchTerm.split(' ');
        let res = true as Boolean
        
        terms.forEach(term => {
            term = term.toUpperCase()
            let lastChar = term[term.length - 1]
            if (lastChar == 'S') {
                term = term.substring(0, term.length - 1)
            }
            if (lastChar == 'E') {
                term = term.substring(0, term.length - 1)
            }
            if (!searchString.includes(term)) {
                res = false
            }
        });
        return res
    },

    getSearchResults(state,getters,rootState,rootGetters){
      let products = rootGetters['products/getProducts'] ;
      let res = [] as Array<any>
      products.forEach( ( product : Product ) => {
          if (getters.compatibleSearch(product.name) ){
              res.push(product)
          }
      });
      return res
    },
});

/* MUTATIONS */
export const mutations = mutationTree(state, {
    setSearchTerm(state,payload){
        state.searchTerm = payload
    },
    setSearchHistory(state,payload){
        state.searchHistory = payload
    }
});

/* ACTIONS */
export const actions = actionTree(
    { state, getters, mutations },
    {
        async saveSearchHistory({ state, commit }, term) {
            await this.$axios.post('/search-history', { term: term })
        },
        async fetchSearchHistory({ state, commit }) {
            await this.$axios.get('/search-history').then(r => {
                commit('setSearchHistory', r.data);
            })
        },
    }
);
