<template>
<v-container class="mt-4 mb-16" >
    <!-- <v-layout class="mb-4 mt-4">
        <socialLogin></socialLogin>
    </v-layout> -->
    <span v-if="errorMessage" class="red--text">
        <h4>
            {{errorMessage}}
        </h4>
    </span>
    <v-layout justify-center align-center column>
        <v-card :max-width="$mq=='lg' ? '500' : '350' " class="text-center justify-center mt-4">
            <v-icon :color="$accessor.helpers.colors.darkGrey" class="mt-8" x-large>{{$accessor.mdicons.mdicons.mdiAccountCircle}}</v-icon>
            <v-card-title primary-title class="text-center primary--text justify-center mt-4">
              <h2>  Ingresá a <br> {{$accessor.configs.siteName}} </h2>
            </v-card-title>
            <v-form  aria-label="login" ref="form" @submit.prevent="send" class="pa-4">
                <v-text-field
                    v-model="formData.email"
                    name="email"
                    label="Correo Electrónico"
                    id="email" autofocus
                    hide-details="auto"
                />
                <v-text-field v-model="formData.password"
                    label="contraseña"
                    name="password"
                    type="password"
                    hide-details="auto"
                    class="mt-4"/>


                <v-btn type="submit" color="primary" tile depressed dark block class="mt-8 " >
                    Iniciá sesión
                </v-btn>

               <!--  <div >
                    <nuxt-link to="/recuperar-contraseña" class=" mt-2 text-align-end d-flex justify-end">
                        <span class="text-secondary"> ¿Olvidaste tu contraseña? </span>
                    </nuxt-link>
                </div> -->
            </v-form>
        </v-card>
        <v-divider class="mt-4"></v-divider>
        <v-row class="mt-4">
            <v-col cols="12" class="fcc mt-4 sugestion text-center">
                    <label >
                        Aun no te resgistraste ?
                        <v-btn x-small nuxt to="/registrate" text depressed>
                            Registrate ahora
                        </v-btn>
                    </label>
            </v-col>
        </v-row>
    </v-layout>
    <modal v-if="showRegisterSugestion" @close="showRegisterSugestion=false">
        <registerSugestion></registerSugestion>
    </modal>
</v-container>
</template>

<script>
import Vue from 'vue'
import socialLogin from '@/components/auth/social-login.vue'
import { User } from '@/types'
import swal from 'sweetalert'

import modal from '@/components/common/Modal.vue'
import registerSugestion from '@/components/auth/register-sugestion.vue'

export default {
    components:{socialLogin,modal,registerSugestion},
    head() {
        return {
        titleTemplate: `Ingresa | ${this.$accessor.configs.siteName}`,
        }
  },
    layout:'default',
    name:'login',
    metaInfo(){return{
        title: 'Login'   }},
    data(){
        return{
            showRegisterSugestion:false ,
            showErrorModal:false ,
            errorMessage:'' ,
            formData:{
                email:'',
                password:''
            }
        }
    },
    computed:{
        user(){
            return (this.$auth.user )
        },
        admin(){
           return ( this.user && this.user.role_id <= 2 ) ;
        },
        issuper(){
            return ( this.user && this.user.role_id == 1 );
        }
    },
    methods:{
       async send(){
           try{
              let response = await this.$auth.loginWith('local',{data:this.formData})

           } catch(e){
              // console.log('Error response',e.response);
               this.errorMessage = e.response.data;

                if(this.errorMessage.includes('Usuario')){
                    this.showRegisterSugestion = true;
                }else{
                    swal(this.errorMessage,'','error')
                }

           }

            setTimeout(() => {
                if(this.admin){
                    let route = '/admin'
                    window.location.replace(route);
                }
            }, 500);
        }
    },
    mounted(){
        if(this.issuper)
        {
            this.$router.push('/admin');
            return;
        }
        else if(this.admin){
            let route = '/admin'
            window.location.replace(route);
            return;
        }
        setTimeout(() => {
            if(this.issuper)
            {
               this.$router.push('/admin');
               return;
            }
            else if(this.admin){
                let route = '/admin'
                window.location.replace(route);
                return;
            }
        }, 500);
    }


}
</script>


<style lang="scss" scoped>



.login-btn{
    font-size:30px;
    padding:10px 0;
}
.f-card{
    max-width: 600px;
    box-shadow:0px 10px 10px #000c;
}
.f-header{
    text-align:center;
    color:#E80C69;
    background-color: none;
    font-weight: bold;
}
.mtc{
    margin-top:30px;
}
@media(max-width:660px){
    .login-btn{
        font-size: 18px;
    }
    .f-card{
        max-width: 360px;
    }
    h2{
        font-size: 28px !important;
    }
}
</style>
