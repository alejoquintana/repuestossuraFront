<template>
  <v-app>
    <navWide max-width="1400" v-if="$mq=='lg'" />
    <navMob v-if="$mq!='lg'" />
    <v-main max class="d-flex align-center">
		<v-container>
        <nuxt/>
		</v-container>
        <!-- <configurableBanner/> -->
    </v-main>
    <appLoading/>
    <registerModal/>
    <appfooter/>
    <carritoFlotante/>
    <whatsapp/>
  </v-app>
</template>

<script>
import whatsapp from '@/components/layout/whatsapp.vue'
import configurableBanner from '@/components/common/configurable-banner.vue'
import registerModal from '@/components/common/register-modal'
import appLoading from '@/components/layout/loading'
import navWide from '@/components/layout/nav/Wide.nav'
import navMob from '@/components/layout/nav/Mob.nav'
import appfooter from '@/components/layout/footer/Footer.vue'
import carritoFlotante from '@/components/layout/carrito/carrito.productos.vue'
export default {
  components:{navWide,navMob,appLoading,registerModal,whatsapp,appfooter,configurableBanner,carritoFlotante},
  scrollToTop:true,
  data () {
    return {
      title: 'TinoDeco'
    }
  },
  mounted(){
    //this.$accessor.products.fetchallProducts()
  }
}
</script>
