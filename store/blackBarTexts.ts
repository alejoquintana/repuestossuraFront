import { RootState } from "~/store";

import Vue from "vue";
import { getterTree, mutationTree, actionTree } from "typed-vuex";
import { } from "@/types";
import { mdiThumbsUpDown } from "@mdi/js";

/* STATE */
export const state = () => {
    return {
        texts:[]
    };
};

export type blackBarTextsState = ReturnType<typeof state>;

/* GETTERS */
export const getters = getterTree(state, {
    getTexts(state){
        return state.texts
    },
});

/* MUTATIONS */
export const mutations = mutationTree(state, {
    setTexts(state,payload){
        state.texts =  payload
    },
});

/* ACTIONS */
export const actions = actionTree( { state, getters, mutations } , {

        async fetchTexts({commit}){
            await this.$axios.get('/black-bar-texts')
                .then(r => {
                    commit('setTexts',r.data)
                })
        },

        async create({ commit, state }, data) {
            await this.$axios.post('/black-bar-text', data)
        },

        async update({ commit, state }, updateData: { id: number, field: string, value: any }) {
            let text = state.texts.find((c:any) => {
                return c.id === updateData.id
            })
            if (text) {
                (text as any)[updateData.field] = updateData.value
            }
            await this.$axios.put('/black-bar-text', updateData);
        },

        async delete({ commit, state },id) {
            await this.$axios.delete(`/black-bar-text/${id}`);
            let newTexts = state.texts.filter((c:any) => {
                return c.id != id
            });
            commit('setTexts', newTexts);
        },
    }
);
