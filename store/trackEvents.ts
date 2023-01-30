import { RootState } from "~/store";

import Vue from "vue";
import { getterTree, mutationTree, actionTree } from "typed-vuex";
import {  } from "@/types";

/* STATE */
export const state = () => {
    return {
        trackEvents: [],
    };
};

export type catalogoState = ReturnType<typeof state>;

/* GETTERS */
export const getters = getterTree(state, {
    getTrackEvents(state) {
        return state.trackEvents
    },
});

/* MUTATIONS */
export const mutations = mutationTree(state, {
    setTrackEvents(state, payload) {
        state.trackEvents = payload;
    },
});

/* ACTIONS */
export const actions = actionTree(
    { state, getters, mutations },
    {
        async fetchTrackEvents({ commit }) {
            await this.$axios.get('/track-event-stats')
                .then(r => {
                    commit('setTrackEvents', r.data)
                })
        },
        async trackEvent({ commit },event) {
            await this.$axios.post('/track-event',{event:event})
        },
    }
);
