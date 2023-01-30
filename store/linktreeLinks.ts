import { RootState } from "~/store";

import Vue from "vue";
import { getterTree, mutationTree, actionTree } from "typed-vuex";
import { LinktreeLink } from "@/types";

/* STATE */
export const state = () => {
    return {
        links: []
    };
};

export type linktreeLinksState = ReturnType<typeof state>;

/* GETTERS */
export const getters = getterTree(state, {
    getLinks(state){
        return state.links
    },
    getNotPausedLinks(state){
        let res = state.links
        res = res.filter((link:LinktreeLink) => {
            return !link.paused
        })
        return res
    },
});

/* MUTATIONS */
export const mutations = mutationTree(state, {
    setLinks(state,payload){
        state.links =  payload
    },
});

/* ACTIONS */
export const actions = actionTree(
    { state, getters, mutations },
    {
        async fetchLinks({commit}){
            await this.$axios.get('/linktree')
                .then(r => {
                    commit('setLinks',r.data)
                })
        },

        async createLink({commit},data){
            await this.$axios.post('/link',data)
        },

        async updateLink({commit},data){
            await this.$axios.put('/link',data)
        },

        async deleteLink({ commit, state },id) {
            await this.$axios.delete(`/link/${id}`);
            let newLinks = state.links.filter((c:LinktreeLink) => {
                return c.id != id
            });
            commit('setLinks', newLinks);
        },
    }
);
