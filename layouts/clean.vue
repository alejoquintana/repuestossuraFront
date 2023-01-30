<template>
    <v-app>
        <header class=" pt-0 mt-0">
          <!--   <app-nav></app-nav -->>
        </header>    
        <v-row>
          
          <!--   <div class="nav-space" :class="{'admin-nav-space':user && user.role_id<3}" v-if="$mq=='lg'"></div> -->
            <v-col cols="12">
                <v-slide-x-transition>
                        <nuxt></nuxt>
                </v-slide-x-transition>
            </v-col>
          <!--   <div class="bottom-space"></div> -->
        </v-row>
      

      <!--   <app-footer v-if="$mq=='lg'"></app-footer>
        <mobile-footer v-else></mobile-footer>
      
        <momwebfooter></momwebfooter>
    
     
        
        <total-bouncer :total="total" v-if="$route.path != '/carrito'" ></total-bouncer>

     
        <apploading v-if="loading || firstload"></apploading>

        <registerModal></registerModal> -->
    </v-app>
</template>

<script>
/* 

import totalBouncer from './layout/total-bouncer/total-bouncer.vue';*/
/* import momwebfooter from '@/components/layout/footer/momwebfooter.vue'
import registerModal from '@/components/layout/registermodal.vue' */

/* import whatsappBtn from '@/components/layout/whatsapp.vue'; */
/* import appFooter from '@/components/layout/footer/Footer.vue';
import mobileFooter from '@/components/layout/footer/Footer-mobile.vue';
import appNav from '@/components/layout/Navbar.vue';
import totalBouncer from '@/components/layout/total-bouncer/total-bouncer.vue'; 
import apploading from '@/components/layout/loading.vue';
import categoriesPannel from '@/components/layout/default/Side-menu.vue'; */
export default {
    /* components:{momwebfooter,mobileFooter,appNav,appFooter,totalBouncer,apploading,categoriesPannel,registerModal}, */
    computed:{
        user(){
            return this.$auth.user
        },
        /* total(){
            return this.$accessor  store.getters.getTotal;
        }, */
        loading(){
            return this.$accessor.getLoading;
        }
    },
      /* mounted(){
        document.body.classList.remove('noscroll');
         if(this.$store.getters.getLoading || this.firstload){
              this.$store.commit('setFirstload');
         }
     } */
    
}
</script>

<style lang="scss" scoped>

    .redlimpbannercontainer{
        padding-right: 20px;
        width: 70%;
        margin-top: 20px;
    }


    .app-container{
       width:98.5vw;
        padding:0 ; 
       padding-top:0;
       padding-bottom: 0;
       margin-bottom: 0;
       border:1px solid  #868686;
       overflow: hidden;

    }
    .back-arrow{
        color:blue;
        margin-left:10%;
        cursor: pointer;
        font-size: 2rem;

    }

    .nav-space{
        width:100vw;
        height:41px;
    }

    .admin-nav-space{
        height: 80px;
    }

    .bottom-space{
        width:100vw;
        height:100px;
    }
</style>