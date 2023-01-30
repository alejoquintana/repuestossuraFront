import { RootState } from "~/store";

import Vue from "vue";
import { getterTree, mutationTree, actionTree } from "typed-vuex";
import { Category, Product, ProductImage } from "@/types";
import { Location } from "~/types/Location";

/* STATE */
export const state = () => {
    return {
        locations:[] as Array<Location>
    };
};

export type catalogoState = ReturnType<typeof state>;

/* GETTERS */
export const getters = getterTree(state, {
    getLocations(state){
        return state.locations
    }
});

/* MUTATIONS */
export const mutations = mutationTree(state, {
    setLocations(state,payload){
        state.locations = payload
    }
});

/* ACTIONS */
export const actions = actionTree(
    { state, getters, mutations },
    {
        async fetchLocations({commit}){
            await this.$axios.get('/locations').then(r=>{
                commit('setLocations',r.data)
            })
        },
        async create({commit}){
            await this.$axios.post('/location');
        },
        async update({commit},data){
            await this.$axios.put('/location',data);
        },
        async destroy({commit,state},id){
            await this.$axios.delete('/location/'+id);
            let newLocations = state.locations.filter((l : Location) => {
                return l.id != id;
            })
            commit('setLocations',newLocations);
        }
    }
);
