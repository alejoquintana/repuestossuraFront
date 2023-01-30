import { RootState } from "~/store";
import Vue from "vue";
import { getterTree, mutationTree, actionTree } from "typed-vuex";
import { Category, Product, ProductImage } from "@/types";

/* STATE */
export const state = () => {
    return {
        orders:[],
        status:'nuevo',
        pagination:null as any,
        fullOrder:null as any,
        searchTerm:'',
        retiro_id:0,
        userOrders:[],
        editedOrderItems:[]
    };
};

export type catalogoState = ReturnType<typeof state>;

/* GETTERS */
export const getters = getterTree(state, {
    getOrders(state){
        return state.orders
    },
    getStatus(state){
        return state.status
    },
    getPagination(state){
        return state.pagination
    },
    getOrder(state){
        return state.fullOrder
    },
    getEditedOrderItems(state){
        return state.editedOrderItems
    },
    getSearchTerm(state){
        return state.searchTerm
    },
    nextPageUrl(state){
        if(!state.pagination) return
        return state.pagination.next_page_url
    },
    getUserOrders(state){
        return state.userOrders
    }
});

/* MUTATIONS */
export const mutations = mutationTree(state, {
    setOrders(state,payload){
        state.orders = payload
    },
    addOrders(state,payload){
        state.orders = state.orders.concat(payload)
    },
    setPagination(state,payload){
        state.pagination = payload
    },
    setFullOrder(state,payload){
        state.fullOrder= payload
    },
    updateOrder(state,payload){
        if(!payload.field || !payload.value)return;
        state.fullOrder[payload.field] = payload.value ;
    },
    setStatus(state,payload){
        state.status = payload
    },
    setSearchTerm(state,payload){
        state.searchTerm = payload
    },
    setRetiro(state,payload){
        state.retiro_id = payload
    },
    setUserOrders(state, payload) {
        state.userOrders = payload
    },
    setEditedOrderItems(state, payload) {
        state.editedOrderItems = payload
    }

});

/* ACTIONS */
export const actions = actionTree(
    { state, getters, mutations },
    {
        async fetchOrders({commit,state}){
            let data = {
                searchTerm : state.searchTerm,
                status : state.status,
                retiro_id : state.retiro_id
            }
            await this.$axios.post('/get-paginated-orders',data)
                .then(r => {
                    commit('setPagination',r.data)
                    commit('setOrders',r.data.data)
                })
        },
        async fetchMoreOrders({commit,state},url)
        {   
            let data = {
                searchTerm: state.searchTerm,
                status: state.status,
                retiro_id: state.retiro_id
            }
            await this.$axios.post(url,data)
                .then(r => {
                    commit('setPagination', r.data)
                    commit('addOrders', r.data.data)
                })
        },
        async fetchFullOrder({commit},id){
            await this.$axios.get('/full-order/'+id)
            .then(r => {
                    commit('setFullOrder',r.data)
                })
        },
        async fetchEditedOrderItem({commit},id){
            await this.$axios.get('/edited-order-items/'+id)
                .then(r => {
                    commit('setEditedOrderItems',r.data)
                })
        },
        async update({commit},data){
            commit('updateOrder',data);
            await this.$axios.put('/order',data);
        },
        async fetchUserOrders({commit,state}) {
            await this.$axios.get('/user-orders')
                .then(r => {
                    commit('setUserOrders',r.data)
                })
        }
    }
);
