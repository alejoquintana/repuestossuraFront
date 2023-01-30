<template>
    <div>
        <v-row>
            <v-col cols="3">
               <v-icon color="blue">{{$accessor.mdicons.mdicons.mdiWhatsapp}}</v-icon>
               <b> WHATSAPP</b>
            </v-col>
            <v-col cols="2">
                  <v-text-field type="text" v-model="whatsapp_area"  @change="saveChange('whatsapp_area')" label="COD AREA"  />
            </v-col>
            <v-col cols="3">
                  <v-text-field type="text" v-model="whatsapp" @change="saveChange('whatsapp')" label="NRO"/>
            </v-col>
            <v-col cols="1">
                <v-btn v-if="whatsappUrl" color="primary" link target="_blank" :href="whatsappUrl">
                     <v-icon color="green">{{$accessor.mdicons.mdicons.mdiWhatsapp}}</v-icon> HABLAR POR WHATSAPP
                </v-btn>
            </v-col>
        </v-row>
        <v-row v-for="social in socials" :key="social.field" class="d-flex  align-center mt-4">
            <v-col cols="3" >
                <v-icon color="blue">{{$accessor.mdicons.mdicons[social.icon]}}</v-icon>
                <b>{{fieldName(social) |uc}}</b>
            </v-col>
            <v-col cols="4" >
                <v-text-field type="text" v-model="social.value" @change="saveChange(social.field)" />
            </v-col>
            <v-col cols="1">
                <v-btn v-if="getProp(social.urlProp) && getProp(social.nameProp)" color="primary" link target="_blank" :href="getProp(social.urlProp)">
                     <v-icon color="green">{{$accessor.mdicons.mdicons[social.icon]}}</v-icon> {{getProp(social.nameProp)}}
                </v-btn>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    data(){
        return {
            whatsapp:'',
            whatsapp_area:'',
            fbChatName:'Chatear por facebook',
            socials: {
                fbmessengerurl:{
                            icon:'mdiFacebookMessenger',
                            name:'URL facebook messenger',
                            field:'fbmessengerurl',
                            value:'',
                            nameProp:'fbChatName',
                            urlProp:'fbmessengerurl'
                },
                facebook:{  
                            icon:'mdiFacebook',
                            field:'facebook',
                            value:'',
                            urlProp:'facebookUrl',
                            nameProp:'facebookName'
                },
                pinterest:{ 
                            icon:'mdiPinterest',
                            field:'pinterest',
                            value:'',
                            urlProp:'pinterestUrl',
                            nameProp:'pinterestName'
                },
                instagram:{ 
                            icon:'mdiInstagram',
                            field:'instagram',
                            value:'',
                            urlProp:'instagramUrl',
                            nameProp:'instagramName'
                },
                telegram:{  
                            icon:'mdiTelegram',
                            field:'telegram',
                            value:'',
                            urlProp:'telegramUrl',
                            nameProp:'telegramName'
                },
            }
        }
    },
    methods:{
        getProp(prop){
            return this[prop];
        },
        fieldName(social){
            return social.name ? social.name : social.field
        },
        assignSocials(){
            if(!this.configs)return;
            this.whatsapp = this.configs.whatsapp ;
            this.whatsapp_area = this.configs.whatsapp_area ;
            this.socials.facebook.value = this.configs.facebook ;
            this.socials.instagram.value = this.configs.instagram
            this.socials.pinterest.value = this.configs.pinterest
            this.socials.telegram.value = this.configs.telegram
            this.socials.fbmessengerurl.value = this.configs.fbmessengerurl ; 
        
        },
        saveChange(field){
            var value;
            if(field.includes('whatsapp'))
            {
                value = this[field]
            }else{
                value = this.socials[field].value
                //console.log('value' ,value)
                //console.log('field' ,field)
            }
            let data = {
                field : field,
                value : value
            }
            //console.log('data' ,data)
            this.$accessor.configs.update(data);
        },
    },
    computed:{
        fbmessengerurl(){
            return this.socials.fbmessengerurl.value
        },
        facebookUrl(){
            return this.$accessor.configs.facebookUrl;
        },
        facebookName(){
            return this.$accessor.configs.facebookName;
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

        configs(){
            return this.$accessor.configs.getConfigs
        },
                        
    },
    watch:{
        configs(){
            this.assignSocials();
        }
    },
    async mounted(){
        await this.$accessor.configs.fetchConfigs();
        this.assignSocials()
    }
}
</script>