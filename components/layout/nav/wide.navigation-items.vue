<template>
    <div>
        <v-row class=" rounded-xl rounded-b-0 secondary" dark>
            <v-col cols="1"></v-col>
            <v-col cols="2" class="relative">
                <v-menu offset-y style="z-index:99;">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                        text
                        v-bind="attrs"
                        v-on="on"
                        class="font-weight-bold"
                        >
                            CATEGORIAS
                            <v-icon dark>{{$accessor.mdicons.mdicons.mdiMenuDown}}</v-icon>
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item
                        v-for="(category, index) in categories"
                        :key="index"
                        nuxt link :to="category.slug"
                        >
                            <v-list-item-title>{{ category.name |uc }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-col>
            <v-col cols="2"  v-for="item in items" :key="item.url">
                <v-btn class="font-weight-bold text-center" block link text nuxt :to="item.url">{{item.name}}</v-btn>
            </v-col>
            <v-col cols="1"></v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            items:[
                {name:'DONDE ESTAMOS',url:'/donde-estamos'},
                {name:'CONTACTO',url:'/contacto'},
                {name:'COTIZADOR',url:'/cotizador'},
                {name:'CATALOGO DIGITAL',url:'/catalogo-digital'},
            ]
        }
    },
    computed:{
        categories(){
            return this.$accessor.categories.getNotPausedCategories
        }
    }
}
</script>
