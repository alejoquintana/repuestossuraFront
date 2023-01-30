<template>
  <div>
    <client-only>
      <v-app light class="fc">
        <v-navigation-drawer
        v-model="drawer"
        :clipped="clipped"
        fixed
        app
        >
        <adminMenu @hide="drawer = false"></adminMenu>
        </v-navigation-drawer>
        <div>
            <adminNav @showMenu="drawer = true"></adminNav>
        </div>
        <v-main>
          <div class="px-4" v-if="$mq=='lg'">
            <h2 class="purple--text">{{breadcrumb}}</h2>
            <nuxt/>
          </div>
          <div v-else>
            <h4>
                EL ADMINISTRADOR NO ESTA DISPONIBLE DESDE DISPOSITIVOS MOVILES
            </h4>
          </div>
        </v-main>
      </v-app>
      <loading />
      <snackbar/>
    </client-only>
  </div>
</template>

<script>
import snackbar from '@/components/common/snackbar'
import loading from '@/components/layout/loading'
import adminNav from '@/components/admin/layout/top-nav.vue'
import adminMenu from '@/components/admin/layout/menu.vue'
export default {
    components:{adminMenu,adminNav,loading,snackbar},
    name:'admin-layout',
    scrollToTop:true,
    data() {
        return {
            clipped: false,
            drawer: true,
            fixed: false,
        }
    },
    computed:{
        loading(){
            return this.$accessor.getLoading
        },
        breadcrumb(){
            return this.$route.path.replace('/admin','')
        }
    },
    methods:{
        setDrawer(event){
            this.drawer = event
        }
    },
}
</script>
