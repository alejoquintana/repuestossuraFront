import {
    getterTree,
    actionTree,
    mutationTree
} from "nuxt-typed-vuex";

import { RootState } from '~/store'

export const state = () => {
    return {
        configs:null as any,
        siteName:'Suspensión sura',
        siteNameSecond:'Suspensión sura',
    }
}

export type ConfigState = ReturnType<typeof state>

export const getters = getterTree(state, {
    getConfigs(state){
        return state.configs;
    },
    whatsappNumber(state){
        if(!state.configs)return null;
        if (!state.configs.whatsapp || !state.configs.whatsapp_area) return null;
        let area = state.configs.whatsapp_area;
        let num = state.configs.whatsapp;
        return `${area} - ${num}`;
    },
    whatsappUrl(state): string | null {
        if(!state.configs)return null;
        if (!state.configs.whatsapp || !state.configs.whatsapp_area) return null;
        let area = state.configs.whatsapp_area;
        let num = state.configs.whatsapp;
        let wha = `54${area}${num}`;
        return `https://wa.me/${wha}`;
    },
    instagramName(state): string | null {
        let configs = state.configs;
        if (configs.instagram) {
            let res = configs.instagram.replace('https://', '');
            res = res.replace('www.', '');
            res = res.replace('instagram.com/', '');
            res = res.replace('/', '');
            return `@${res}`;
        }
        return null
    },
    instagramUrl(state): string | null {
        let configs = state.configs;
        if (configs.instagram) {
            if (configs.instagram.includes('https://')) {
                return configs.instagram;
            } else if (configs.instagram.includes('instagram.com/')) {
                return `https://${configs.instagram}`
            } else {
                return `https://instagram.com/${configs.instagram}`
            }
        }
        return null
    },
    facebookName(state): string | null {
        let configs = state.configs;
        if (configs.facebook) {
            let res = configs.facebook.replace('https://', '');
            res = res.replace('www.', '');
            res = res.replace('facebook.com/', '');
            res = res.replace('/', '');
            return `/${res}`
        }
        return null
    },
    facebookUrl(state): string | null {
        let configs = state.configs;
        if (configs.facebook) {
            if (configs.facebook.includes('https://')) {
                return configs.facebook;
            } else if (configs.facebook.includes('facebook.com/')) {
                return `https://${configs.facebook}`
            } else {
                return `https://facebook.com/${configs.facebook}`
            }
        }
        return null
    },
    pinterestName(state){
        let configs = state.configs;
        if (configs.pinterest) {
            let res = configs.pinterest.replace('https://', '');
            res = res.replace('www.', '');
            res = res.replace('ar.pinterest.com/', '');
            res = res.replace('/', '');
            res = res.replace('/', '');
            return `/${res}`
        }
        return null
    },
    pinterestUrl(state): string | null {
        let configs = state.configs;
        if (configs.pinterest) {
            if (configs.pinterest.includes('https://')) {
                return configs.pinterest;
            } else if (configs.pinterest.includes('pinterest.com/')) {
                return `https://${configs.pinterest}`
            } else {
                return `https://ar.pinterest.com/${configs.pinterest}`
            }
        }
        return null
    },
    telegramName(state){
        let configs = state.configs;
        if (configs.telegram) {
            let res = configs.telegram.replace('https://', '');
            res = res.replace('www.', '');
            res = res.replace('t.me/', '');
            res = res.replace('/', '');
            res = res.replace('/', '');
            return `/${res}`
        }
        return null
    },
    telegramUrl(state): string | null {
        let configs = state.configs;
        if (configs.telegram) {
            if (configs.telegram.includes('https://')) {
                return configs.telegram;
            } else if (configs.telegram.includes('t.me/')) {
                return `https://${configs.telegram}`
            } else {
                return `https://t.me/${configs.telegram}`
            }
        }
        return null
    },
	socials(state,getters){
		 let res = []
		 let instagramName = getters.instagramName
		 let instagramUrl = getters.instagramUrl
		 let facebookName = getters.facebookName
		 let facebookUrl = getters.facebookUrl
		 let pinterestName = getters.pinterestName
		 let pinterestUrl = getters.pinterestUrl
		 let telegramName = getters.telegramName
		 let telegramUrl = getters.telegramUrl
		 let whatsappNumber = getters.whatsappNumber
		 let whatsappUrl = getters.whatsappUrl
        /* if(whatsappUrl && whatsappNumber){
            res.push({label:'WHATSAPP',name:whatsappNumber,url:whatsappUrl,icon:'mdiWhatsapp'})
        } */
		 if (instagramName && instagramUrl) {
			 res.push({name: instagramName,url: instagramUrl,icon: 'mdiInstagram'})
		 }
		 if (facebookName && facebookUrl) {
			 res.push({name: facebookName,url: facebookUrl,icon: 'mdiFacebook'})
		 }
		 if (pinterestName && pinterestUrl) {
			 res.push({name: pinterestName,url: pinterestUrl,icon: 'mdiPinterest'})
		 }
		 if (telegramName && telegramUrl) {
			 res.push({name: telegramName,url: telegramUrl,icon: 'mdiTelegram'})
		 }
		 return res
	 },
    hidePrices(state,getters,rootState,rootGetters){
        let configs = state.configs ;
        if(!configs)return true ;
        return configs.hide_prices
    }
});

export const mutations = mutationTree(state, {
    setConfigs(state,payload){
        state.configs = payload
    },
    saveChange(state,payload){
        if(!payload.field)return;
        state.configs[payload.field] = payload.value
    }
})

export const actions = actionTree({ state, getters, mutations }, {
    async fetchConfigs({commit}){
        await this.$axios.get('/configs')
            .then(r => {
                commit('setConfigs',r.data)
            })
    },
    async update({commit},data){
        commit('saveChange',data);
        await this.$axios.put('/configs',data);
    }
})

export default {
    namespaced: true as true,
    state,
    getters,
    actions,
    mutations
}
