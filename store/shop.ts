import { RootState } from "~/store";

let calculateSubtotal = (product:Product, units:number) => {
    if (!units) return 0;
    return product.price * units;
}

import Vue from "vue";
import { getterTree, mutationTree, actionTree } from "typed-vuex";
import { Category, Product, ProductImage, ShopListItem } from "@/types";

/* STATE */
export const state = () => {
    return {
        list:[] as Array<ShopListItem>,
        userData:{
            user_id:0,
            shipping:0,
            name:'',
            email:'',
            phone:'',
            address:'',
            city_id:null,
            cp:'',
            message:'',
            total:0
        },
        onEditMode:false,
        editOrder:null,
        retiroOptions:null,
        editWarnings:"",
    };
};

export type catalogoState = ReturnType<typeof state>;

/* GETTERS */
export const getters = getterTree(state, {
    getUserData(state){
        return state.userData
    },
    getRetiroOptions(state){
        return state.retiroOptions
    },
    getList(state){
        return state.list
    },
    getEditOrder(state){
        return state.editOrder
    },
    getListItem : (state) => (product:Product):ShopListItem|undefined => {
        let list = state.list;
        let item = list.find( (i:ShopListItem) => {
            return (product.id == i.product.id )
        })
        return item;
    },
    getReducedList(state){
        let res = [] as Array<{id:number,units:number}>;
        state.list.forEach( (li:ShopListItem) => {
            let reducedItem = { id:li.product.id,units:li.units }
            res.push(reducedItem);
        })
        return res;
    },
    getTotal(state){
        let res = 0;
        state.list.forEach((li:ShopListItem) => {
            res+=li.product.price*li.units;
        })
        return res;
    }
});

/* MUTATIONS */
export const mutations = mutationTree(state, {
    setUserData(state,payload){
        state.userData = payload;
    },
    updateList(state,payload:ShopListItem){
        let exists = state.list.find( (li:ShopListItem) => {
            return ( li.product.id === payload.product.id )
        })
        if(exists){
            exists.units = payload.units ;
        }else{
            state.list.push(payload);
        }
        /* filtrar los units 0 */
        state.list = state.list.filter((li:ShopListItem)=>{
            return li.units > 0 ;
        })
    }
});

/* ACTIONS */
export const actions = actionTree(
    { state, getters, mutations },
    {
        async send({commit,state,getters,rootState}){
            let fdata = {
                list: getters.getReducedList,
                userdata:getters.getUserData,
                total:getters.getTotal
            }
            rootState.loading =true
            await this.$axios.post('/order',fdata)
            state.list = [] ;
            rootState.loading =false
        
        },

        editMode({state,getters,rootState,rootGetters}, fullorder) {

            let order = fullorder.order_info
            let order_items = fullorder.order_items

            let products = rootGetters['products/getProducts']

            let findProduct = (id:number) => {
                let res;
                let found = products.find((p:Product) => {
                    return p.id == id
                });
                if (found) {
                    res = found;
                }
                return res;
            }

            state.onEditMode = true;
            state.editOrder = order;
            state.list = [];

            state.editWarnings = '';

            if (!order_items || !order_items.length) return

            if (order.edited) {
                let rawDate = new Date(order_items[0].created_at);
                let editDate = rawDate.getDate() + "-" + (rawDate.getMonth() + 1) + "-" + rawDate.getFullYear() + ' / ' + rawDate.getHours() + ':' + rawDate.getMinutes() + 'hs';
                state.editWarnings += ` <b>Ultima edición de este pedido:</b> ${editDate} <br/>`
            }
            order_items.forEach((item:any) => {
                let prodItem = findProduct(item.product_id);

                if (prodItem) {
                    let listItem:ShopListItem = {
                        product: prodItem,
                        units: item.units,
                        subtotal: function (): number {
                                let units = this.units as number;
                                return item.price * units;
                            }
                        }
                    state.list.push(listItem);
                } else {
                    state.editWarnings += `<b> No se agregó ${item.name}.</b>  Puede estar pausado o fue eliminado. <br/>`
                }
            });
        },

        async saveEditedOrder({state,commit},data){
            await this.$axios.post('/edited-order',{order_id : data.id,order_items : state.list})
            /*
            .then(r =>{
                window.location.replace('/admin/pedidos')
            });
            */
        },

    }
);
