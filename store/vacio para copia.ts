import { RootState } from "~/store";

import Vue from "vue";
import { getterTree, mutationTree, actionTree } from "typed-vuex";
import { Category, Product, ProductImage } from "@/types";

/* STATE */
export const state = () => {
  return {
   
  };
};

export type catalogoState = ReturnType<typeof state>;

/* GETTERS */
export const getters = getterTree(state, {
  
});

/* MUTATIONS */
export const mutations = mutationTree(state, {
  
});

/* ACTIONS */
export const actions = actionTree(
  { state, getters, mutations },
  {
   
  }
);
