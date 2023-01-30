<template>
    <div class="mt-4">
        <v-row>
            <v-col cols="12" lg="6" class="px-2 mt-4">
                <v-btn @click="socialLogin('facebook')" block class="primary">
                    <v-icon left color="white" large class="mr-4">{{$accessor.mdicons.mdicons.mdiFacebook}}</v-icon>
                    Ingresá con Facebook
                </v-btn>    
            </v-col>
            <!-- <v-col cols="12" lg="6" class="px-2 mt-4">
                <v-btn @click="socialLogin('google')" block color="white">
                    <div class="google-logo-container h100">
                        <img class="google-logo" contain :src="$accessor.helpers.imagePath('/storage/images/app/google-logo.jpg')" alt="google" />
                    </div>
                    Ingresá con Google 
                </v-btn>    
            </v-col> -->
        </v-row>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    methods:{
        socialLogin(service:string){
            window.location.replace(`${this.$accessor.helpers.backendpath}/api/oauth-login/${service}`);
        }
    }
})
</script>

<style lang="scss" scoped>
   @media(max-width:1300px){
       .google-logo{
           max-width:44px;
       }
   }
</style>