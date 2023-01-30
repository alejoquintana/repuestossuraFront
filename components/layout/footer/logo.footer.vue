<template>
<div>
    <nuxt-link to="/" class="fcc">
        <div class="fcc w-75">
            <v-img class="logo-down" nuxt-link to="/" contain :src="$accessor.appImages.getLogo" />
        </div>
    </nuxt-link>
    <div v-if="whatsappNumber" class="d-flex align-center justify-center mt-3">
        <v-icon large color="white">{{$accessor.mdicons.mdicons.mdiWhatsapp}}</v-icon>
        <a :href="whatsappUrl" @click="trackevent('whatsapp_click')" target="_blank" class="white-bold ml-2 wpp">
            {{whatsappNumber}}
        </a>
    </div>
</div>
</template>

<script>
export default {
    computed:{
        whatsappNumber(){
            return this.$accessor.configs.whatsappNumber
        },
        whatsappUrl(){
            return this.$accessor.configs.whatsappUrl;
        },
    },
    methods:{
        trackevent(name){
            this.$accessor.trackEvents.trackEvent(name)
        },
    }
}
</script>

<style scoped lang="scss">
.corazon{
    width:42px;
}
.logo-down{
    width: 75%;
}
.wpp{
    font-size: 28px;
    font-weight: bolder;
}
</style>