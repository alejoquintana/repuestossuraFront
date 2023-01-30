import { RootState } from "~/store";

import Vue from "vue";
import { getterTree, mutationTree, actionTree } from "typed-vuex";
import { Category, Product, ProductImage } from "@/types";

/* STATE */
export const state = () => {
    return {
        salesChart:null,
        sales:null,
        canceledSales:null,
        salesYears:null,
        salesByStates:null,
        repeatedUrl:null,
        surveyStat:null,
        surveys:null,
        surveyStatsYears:null,
        mostSoldStats:null,
        searchHistory:null,
        searchHistoryYears:null,
        ufosStats:null,
        retiroId:null,
        monthStats:null,
        monthStatsByDelivery:null,
        retiroStats:null,
    };
};

export type catalogoState = ReturnType<typeof state>;

/* GETTERS */
export const getters = getterTree(state, {
    getSalesYears(state){
        return state.salesYears
    },
    getSalesChart(state){
        return state.salesChart
    },
    getRepeatedUrl(state){
        return state.repeatedUrl
    },
    getSales(state){
        return state.sales
    },
    getCanceledSales(state){
        return state.canceledSales
    },
    getSurveyStats(state) {
        return state.surveyStat
    },
    getSurveys(state) {
        return state.surveys
    },
    getSurveyStatsYears(state) {
        return state.surveyStatsYears
    },
    getSalesByStates(state) {
        return state.salesByStates
    },
    getMostSoldStats(state) {
        return state.mostSoldStats
    },
    getSearchHistory(state) {
        return state.searchHistory
    },
    getSearchHistoryYears(state) {
        return state.searchHistoryYears
    },
    getUFOstats(state) {
        return state.ufosStats
    },
    getMonthStats(state) {
        return state.monthStats
    },
    getMonthStatsByDelivery(state) {
        return state.monthStatsByDelivery
    },
    getRetiroStats(state) {
        return state.retiroStats
    }
});

/* MUTATIONS */
export const mutations = mutationTree(state, {
    setSalesYears(state,payload){
        state.salesYears = payload
    },
    setSalesChart(state,payload){
        state.salesChart = payload
    },
    setRepeatedUrl(state,payload){
        state.repeatedUrl = payload
    },
    setSales(state,payload){
        state.sales = payload
    },
    setCanceledSales(state,payload){
        state.canceledSales = payload
    },
    setSurveyStats(state,payload){
        state.surveyStat = payload
    },
    setSurveys(state,payload){
        state.surveys = payload
    },
    setSurveyStatsYears(state,payload){
        state.surveyStatsYears = payload
    },
    setSalesByStates(state,payload){
        state.salesByStates = payload
    },
    setMostSoldStats(state,payload){
        state.mostSoldStats = payload
    },
    setSearchHistory(state,payload){
        state.searchHistory = payload
    },
    setSearchHistoryYears(state,payload){
        state.searchHistoryYears = payload
    },
    setUFOstats(state,payload){
        state.ufosStats = payload
    },
    setRetiroId(state,payload){
        state.retiroId = payload
    },
    setMonthStats(state,payload){
        state.monthStats = payload
    },
    setMonthStatsByDelivery(state,payload){
        state.monthStatsByDelivery = payload
    },
    setRetiroStats(state,payload){
        state.retiroStats = payload
    },
});

/* ACTIONS */
export const actions = actionTree(
    { state, getters, mutations },
    {
        async fetchSalesYears({commit}){
            await this.$axios.get('/sales-years').then(r=>{
                commit('setSalesYears',r.data)
            })
        },
        async fetchSalesChart({commit}){
            await this.$axios.get('/sales-chart-stats').then(r=>{
                commit('setSalesChart',r.data)
            })
        },
        async fetchSales({commit}){
            await this.$axios.get('/sales-stats').then(r=>{
                commit('setSales',r.data)
            })
        },
        async fetchCanceledSales({commit}){
            await this.$axios.get('/canceled-sales-stats').then(r=>{
                commit('setCanceledSales',r.data)
            })
        },
        async fetchRepeatedUrl({commit}){
            await this.$axios.get('/repeated-url').then(r=>{
                commit('setRepeatedUrl',r.data)
            })
        },
        async fetchSurveyStatByDate({commit},data){
            await this.$axios.get(`/surveys-stats-by-date/${data.year}/${data.month}`).then(r=>{
                commit('setSurveyStats',r.data)
            })
        },
        async fetchSurveysByDate({commit},data){
            await this.$axios.get(`/surveys-by-date/${data.year}/${data.month}`).then(r=>{
                commit('setSurveys',r.data)
            })
        },
        async fetchSurveyStatsYears({commit}){
            await this.$axios.get('/surveys-stats-years').then(r=>{
                commit('setSurveyStatsYears',r.data)
            })
        },
        async fetchSalesByStates({commit}){
            await this.$axios.get('/sales-states').then(r=>{
                commit('setSalesByStates',r.data)
            })
        },
        async fetchSalesByStatesAndState({commit},data){
            await this.$axios.get(`/sales-states-date/${data.year}/${data.month}`).then(r=>{
                commit('setSalesByStates',r.data)
            })
        },
        async fetchMostSoldStats({commit},data){
            await this.$axios.get(`/most-sold-stats/${data.year}/${data.month}`).then(r=>{
                commit('setMostSoldStats',r.data)
            })
        },
        async fetchSearchHistory({commit},data){
            await this.$axios.get(`/search-history/${data.year}/${data.month}`).then(r=>{
                commit('setSearchHistory',r.data)
            })
        },
        async fetchSearchHistoryYears({commit},data){
            await this.$axios.get(`/search-history-years`).then(r=>{
                commit('setSearchHistoryYears',r.data)
            })
        },
        async fetchUFOstats({commit}){
            await this.$axios.get(`/ufos-stats`).then(r=>{
                commit('setUFOstats',r.data)
            })
        },

        async fetchMonthStats({commit},data){
            await this.$axios.get(`/stats-month/${data.month}/${data.year}`).then(r=>{
                commit('setMonthStats',r.data)
            })
        },
        async fetchMonthStatsByDelivery({commit},data){
            await this.$axios.get(`/stats-month-by-delivery/${data.month}/${data.year}`).then(r=>{
                commit('setMonthStatsByDelivery',r.data)
            })
        },
        async fetchCanceledStats({commit},data){
            await this.$axios.get(`/canceled-stats`).then(r=>{
                commit('setSearchHistoryYears',r.data)
            })
        },
        async fetchCanceledStatsbyMonth({commit},data){
            await this.$axios.get(`/canceled-stats-month/${data.month}/${data.year}`).then(r=>{
                commit('setUFOstats',r.data)
            })
        },
        async fetchRetiroStats({commit,rootGetters}){
            let res = [] as any;
            let retiroOptions = rootGetters['retiroOptions/getRetiroOptions']
            retiroOptions.forEach((ret:any) => {
                let el = {opt : ret, stats:null}
                this.$axios.get('/stats-by-retiro/'+ret.id).then(r => {
                    el.stats = r.data
                    res.push(el);
                })
            });
            commit('setRetiroStats',res)
        }
    }
);
