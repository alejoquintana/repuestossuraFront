import { RootState } from "~/store";

import Vue from "vue";
import { getterTree, mutationTree, actionTree } from "typed-vuex";
import { Category, Product, ProductImage } from "@/types";
import { mdiThumbsUpDown } from "@mdi/js";

/* STATE */
export const state = () => {
    return {
        posts: [] as Array<Product>,
        postTitles:[]
    };
};

export type catalogoState = ReturnType<typeof state>;

/* GETTERS */
export const getters = getterTree(state, {
    getPosts(state){
        return state.posts
    },
    getPostTitles(state){
        return state.postTitles
    }
});

/* MUTATIONS */
export const mutations = mutationTree(state, {
    setPosts(state,payload){
        state.posts =  payload
    },
    setPostTitles(state,payload){
        state.postTitles = payload
    }
});

/* ACTIONS */
export const actions = actionTree(
    { state, getters, mutations },
    {
        async fetchPosts({commit}){
            /* await this.$axios.get('/posts')
                .then(r => {
                    commit('setPosts',r.data)
                }) */
        },
        async fetchPostTitles({commit}){
            await this.$axios.get('/posttitles')
                .then(r => {
                    commit('setPostTitles',r.data)
                })
        },
        async delete({ commit, state },id) {
            await this.$axios.delete(`/post/${id}`);
            let newPosts = state.posts.filter(c => {
                return c.id != id
            });
            commit('setPosts', newPosts);
        },
        async destroyImage(id) {
            await this.$axios.delete(`/block-image/${id}`);
        },
    }
);
