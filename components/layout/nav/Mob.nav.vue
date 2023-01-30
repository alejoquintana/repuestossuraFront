<template>
    <div class="fc">
        <v-container>
            <v-row align="center" justify="space-between" no-gutters>
                <v-col cols="6" class="py-0">
                    <nuxt-link to="/">
                        <v-img :src="$accessor.helpers.largeLogo" contain/>
                    </nuxt-link>
                </v-col>
                <v-col cols="4" class="d-flex justify-space-around">
                    <!-- <div @click="showSearchBar = !showSearchBar">
                        <v-icon class="icon">
                            {{$accessor.mdicons.mdicons.mdiMagnify}}
                        </v-icon>
                    </div> -->
                    <div v-if="!$accessor.helpers.no_shop">
                        <nuxt-link :to="accountLink">
                            <v-icon class="font-weight-bold" :color="$accessor.helpers.colors.primary">
                                {{$accessor.mdicons.mdicons.mdiAccount}}
                            </v-icon>
                        </nuxt-link>
                    </div>
                    <v-menu>
                        <template v-slot:activator="{ on, attrs }">
                            <v-icon v-bind="attrs" v-on="on"
                                :color="$accessor.helpers.colors.primary">
                                {{$accessor.mdicons.mdicons.mdiMenu}}
                            </v-icon>
                        </template>
                        <v-list color="#fff">
                            <v-list-item >
                                <v-list-group :value="false" @click.stop>
                                    <template v-slot:activator >
                                        <v-list-item-content>
                                            <v-list-item-title>
                                                <span>
                                                    CATEGORIAS
                                                </span>
                                                <v-icon>{{$accessor.mdicons.mdicons.mdiMenuDown}}</v-icon>
                                            </v-list-item-title>
                                        </v-list-item-content>
                                    </template>

                                    <v-list-item v-for="category in list"
                                                    :key="category.id"
                                                    nuxt
                                                    :to="category.slug">
                                            {{category.name | uc}}
                                    </v-list-item>

                                </v-list-group>
                            </v-list-item>
                            <v-list-item v-for="item in items" :key="item.url"
                                nuxt link :to="item.url">
                                <v-list-item-title>{{ item.name |uc }}</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-col>
            </v-row>
            <hr class="my-3">
            <v-scroll-y-transition>
                <search-bar v-if="showSearchBar"/>
            </v-scroll-y-transition>
				<p>VENTA MAYORISTA DE AUTOPARTES</p>
        </v-container>
    </div>
</template>

<script>
import searchBar from './searchbar.nav.vue'
import blackbarTopnav from './blackbar.topnav.vue'
export default {
    components:{blackbarTopnav,searchBar},
    data() {
        return {
            showSearchBar:false,
            items:[
                //{name:'DONDE ESTAMOS',url:'/donde-estamos'},
                {name:'COTIZADOR',url:'/cotizador'},
                {name:'UBICACION',url:'/ubicacion'},
                //{name:'COTIZADOR',url:'/cotizador'},
                {name:'CATALOGO DIGITAL',url:'/catalogo-digital'},
            ]
        }
    },
    computed:{
        user(){
            return this.$auth.user
        },
        accountLink(){
            if(!this.user)return '/login';
            if(this.admin)return '/admin';
            return '/mi-cuenta'
        },
        configs(){
            return this.$accessor.configs.getConfigs
        },
        list(){
            return this.$accessor.categories.getListForMenues
        },

    }
}
</script>
