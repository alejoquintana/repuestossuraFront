import { RootState } from "~/store";

import Vue from "vue";
import { getterTree, mutationTree, actionTree } from "typed-vuex";
import { Category, Product, ProductImage, PageMeta } from "@/types";

/* STATE */
export const state = () => {
  return {
      allMeta:[]
  };
};

export type catalogoState = ReturnType<typeof state> ;

/* GETTERS */
export const getters = getterTree(state, {
    getAllMeta(store){
        return store.allMeta
    },
    getMeta:(store) => (page:string) =>{
        if(!store.allMeta)return;
        return store.allMeta.find((meta: PageMeta) => {
          if(page == '/') return meta.page === 'home' 
          page = page.replace('/','');
          return page === meta.page;
        });
    }
});

/* MUTATIONS */
export const mutations = mutationTree(state, {
  setAllMeta(store,payload){
    store.allMeta = payload;
  }
});

/* ACTIONS */
export const actions = actionTree({ state, getters, mutations }, {
  async fetchAllMeta({commit}){
     await this.$axios.get("/metadatas")
      .then(r => {
        commit('setAllMeta',r.data)
      });
  },
  async update({commit},data){
    await this.$axios.put('/metadata',data);
  }
});
