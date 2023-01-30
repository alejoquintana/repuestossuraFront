<template>
<div>
    <h1 class="mt-4 ml-3 ml-lg-0">{{title}}</h1>
    <!-- <div class="fc mt-7 pl-2" v-if="sucursales && sucursales.length">
        <h2>Sucursales</h2>
        <div class="mt-4 px-4" v-if="sucursales">
            <sucursal :sucursal="sucursal" v-for="sucursal in sucursales" :key="sucursal.id"/>
        </div>
    </div> -->
    <div class="left-border fc mt-8" v-if="socials && socials.length">
        <h2 class="ml-3 ml-lg-0">Escribinos, estamos para ayudarte!</h2>
        <p class="description">{{description}}</p>
        <div class="fc mt-3 ml-lg-8 w-lg-75">
            <a v-for="social in socials" :key="social.url"
            :href="social.url" target="_blank" rel="noreferrer"
            class="mt-3 font-weight-bold">
                <div @click="trackevent(social.label)" class="social-cont pa-6 d-flex align-center justify-space-between">
                    <span class="social-name">{{social.name}}</span>
                    <v-icon x-large color="#fff">{{$accessor.mdicons.mdicons[social.icon]}}</v-icon>
                </div>
            </a>
        </div>
    </div>
</div>
</template>

<script>
import sucursal from '~/components/admin/configuraciones/sucursales/sucursal.preview.vue'

export default {
    components:{sucursal},
    data() {
        return {
            defaultDescription:'Podés contactarnos por whatsapp o nuestras redes sociales. te dejamos los links',
            defaultTitle:'Contacto',
            //defaultTitle:'Ubicacion',
        }
    },
    computed:{
        meta(){
            return this.$accessor.pageMetas.getMeta('contacto');
        },
        title(){
            if(!this.meta)return this.defaultTitle
            return this.meta.title || this.defaultTitle
        },
        description(){
            if(!this.meta)return this.defaultDescription
            return this.meta.description || this.defaultDescription
        },
        socials(){
            //return this.$accessor.configs.socials;
            let res = [];
            if(this.whatsappUrl){
                res.push({label:'WHATSAPP',name:this.whatsappNumber,url:this.whatsappUrl,icon:'mdiWhatsapp'})
            }
            if(this.facebookUrl){
                res.push({label:'FACEBOOK',name:this.facebookName,url:this.facebookUrl,icon:'mdiFacebook'})
            }
            if(this.instagramUrl){
                res.push({label:'INSTAGRAM',name:this.instagramName,url:this.instagramUrl,icon:'mdiInstagram'})
            }
            if(this.telegramUrl){
                res.push({label:'TELEGRAM',name:this.telegramName,url:this.telegramUrl,icon:'mdiTelegram'})
            }
            if(this.pinterestUrl){
                res.push({label:'PINTEREST',name:this.pinterestName ,url:this.pinterestUrl,icon:'mdiPinterest'})
            }
            return res;
        },
        fbmessengerurl(){
            return this.socials.fbmessengerurl.value
        },
        facebookUrl(){
            return this.$accessor.configs.facebookUrl;
        },
        facebookName(){
            return this.$accessor.configs.facebookName;
        },
        whatsappNumber(){
            return this.$accessor.configs.whatsappNumber;
        },
        whatsappUrl(){
            return this.$accessor.configs.whatsappUrl;
        },
        instagramName(){
            return this.$accessor.configs.instagramName;
        },
        instagramUrl(){
            return this.$accessor.configs.instagramUrl;
        },
        pinterestName(){
            return this.$accessor.configs.pinterestName;
        },
        pinterestUrl(){
            return this.$accessor.configs.pinterestUrl;
        },
        telegramName(){
            return this.$accessor.configs.telegramName;
        },
        telegramUrl(){
            return this.$accessor.configs.telegramUrl;
        },
        /* sucursales(){
            return this.$accessor.sucursales.getLocations.filter(sucursal => {
                return !sucursal.paused;
            })
        }, */
        configs(){
            return this.$accessor.configs.getConfigs
        },
    },
    methods:{
        trackevent(name){
            name = name.toLowerCase()
            name = `${name}_click`
            this.$accessor.trackEvents.trackEvent(name)
        },
    },
    mounted(){
        this.$accessor.sucursales.fetchLocations()
    }
}
</script>

<style lang="scss" scoped>
@media (min-width:660px) {
    .social-cont{
        width: 75%;
    }
}
@media (max-width:659px) {
    .description{
        font-size: 14px;
        margin-bottom: 0;
        margin-left: 20px;
    }
}
.social-cont{
    background: linear-gradient(90deg,#fff 10%, #ddd 50%, $primary 100%);
    .social-name{
        font-size: 18px;
    }
}
</style>
