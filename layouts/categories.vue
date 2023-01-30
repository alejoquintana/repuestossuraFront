<template>
  <v-app>
    <navWide max-width="1400" v-if="$mq=='lg'" />
    <navMob v-if="$mq!='lg'" />
    <v-main max>
        <v-container >
            <v-row>
                <v-col v-if="$mq=='lg'" cols="4">
                    <findProduct/>
                </v-col>
                <v-col cols="12" lg="8" class="pt-0 px-0 mt-4">
                    <div @click="goback()" class="btn-volver" v-if="$mq!='lg'" >
                        <div class="btnback">
                            <v-icon :color="$accessor.helpers.colors.primary">{{$accessor.mdicons.mdicons.mdiChevronLeft}}</v-icon>
                        </div>
                        Volver
                    </div>
                    <!-- <configurableBanner/> -->
                    <nuxt/>
                </v-col>
            </v-row>
        </v-container>
    </v-main>
    <appLoading/>
    <registerModal/>
    <appfooter/>
    <carritoFlotante v-if="showCarrito"/>
  </v-app>
</template>

<script>

import configurableBanner from '@/components/common/configurable-banner.vue'
import registerModal from '@/components/common/register-modal'
import appLoading from '@/components/layout/loading'
import navWide from '@/components/layout/nav/Wide.nav'
import navMob from '@/components/layout/nav/Mob.nav'
import appfooter from '@/components/layout/footer/Footer.vue'
import carritoFlotante from '@/components/layout/carrito/carrito.productos.vue'
import findProduct from '@/components/home/Find.Product.vue'

export default {
    components:{findProduct,navWide,navMob,appLoading,registerModal,appfooter,configurableBanner,carritoFlotante},
    scrollToTop:true,
    data () {
        return {
            title: 'repuestossura'
        }
    },
    mounted(){
        //this.$accessor.products.fetchallProducts()
    },
    computed:{
        showCarrito(){
            let currentPage = this.$route.path;
            if(currentPage == '/carrito')return false;
            return true;
        }
    },
    methods:{
        goback(){
            this.$router.back()
        },
    }
}
</script>

<style scoped lang="scss">
.btn-volver{
    color: $tertiary;
    display: flex;
    align-items: center;
    cursor: pointer;
}
.btnback{
    @extend .fcc;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 2px solid $tertiary;
    margin-right: 5px;
}
</style>
