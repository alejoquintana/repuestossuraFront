<template>
<div>
    <div class="fc">
        <h1 class=" pl-2 titlePage">{{title}}</h1>
        <v-row class="mt-4">
            <v-col cols="11" lg="8" offset="1">
                <div class="left-border fc">
                    <p>{{description}}</p>
                </div>
            </v-col>
        </v-row>
        <div class="w-100 fcc mt-lg-4 px-lg-4" v-if="links">
            <div v-for="link in links" :key="link.id" @click="trackevent(link.name)" class="mt-6" :class="$mq=='lg' ? 'w-50':'w-100'">
                <nuxt-link v-if="isNuxtLink(link.url)" :to="link.url">
                    <div class="linktree-btn">
                        {{link.name | uc}}
                        <span v-if="link.paused">- PAUSADO</span>
                    </div>
                </nuxt-link>
                <a v-if="!isNuxtLink(link.url)" :href="link.url" target="_blank">
                    <div class="linktree-btn">
                        {{link.name | uc}}
                        <span v-if="link.paused">- PAUSADO</span>
                    </div>
                </a>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            defaultTitle:'Linktree',
        }
    },
    computed:{
        defaultDescription(){
            return ``
        },
        meta(){
            return this.$accessor.pageMetas.getMeta('donde-estamos');
        },
        title(){
            if(!this.meta)return this.defaultTitle
            return this.meta.title || this.defaultTitle
        },
        description(){
            if(!this.meta)return this.defaultDescription
            return this.meta.description || this.defaultDescription
        },
        links(){
            return this.$accessor.linktreeLinks.getNotPausedLinks
        },
    },
    methods:{
        isNuxtLink(link){
            if (link.includes('repuestossura.com') || link[0] == '/') {
                return true
            }
            return false
        },
        trackevent(name){
            name = name.replaceAll(' ', '_')
            name = `linktree-${name}`
            this.$accessor.trackEvents.trackEvent(name)
        },
    },
    serverPrefetch(){
        this.$accessor.linktreeLinks.fetchLinks()
    },
    mounted(){
        this.$accessor.linktreeLinks.fetchLinks()
    }

}
</script>
