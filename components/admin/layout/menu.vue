<template>
    <div>
        <div class="d-flex justify-end pr-3">
            <v-btn large lg icon @click="$emit('hide')"  right>
                <v-icon large lg color="black">{{$accessor.mdicons.mdicons.mdiClose}}</v-icon>
            </v-btn>
        </div>
        <v-list>
            
            <v-list-item v-for="item in itemLinks" 
                        nuxt
                        :to="item.url"
                        :key="item.name">
                        <span>
                            {{item.name|uc}}
                        </span>
            </v-list-item>

            <v-list-group  v-for="item in itemGroups"
                            :key="item.name"
                            append-icon="+"
                            v-model="item.active"
                            >
                 <template v-slot:activator v-if="item.children">
                    <v-list-item-title>{{item.name | uc}}</v-list-item-title>
                </template>

                <v-list-item
                    v-for="children in item.children"
                    :key="children.name"
                    link nuxt :to="children.url"
                >
                    <v-list-item-title>
                        {{children.name|uc}}
                    </v-list-item-title>
                </v-list-item>
            </v-list-group>
            
            
            <v-list-item
                    link nuxt to="/logout"
                >
                    <v-list-item-title>
                      <v-icon>{{$accessor.mdicons.mdicons.mdiLogout}}</v-icon>
                        SALIR
                    </v-list-item-title>
            </v-list-item>
        </v-list>
    </div>
</template>

<script lang="ts">

import {AdminMenuItem} from '@/store/admin'
import Vue from 'vue'
import { User } from '~/types'
export default Vue.extend({
    methods:{
        itemComponent(item:any){
            return item.children ? 'v-list-group' : 'v-list-item'
        },
        filterItems(items:Array<AdminMenuItem>){
            if(!this.user || this.user.role_id > 2) return [] ;
            if(this.user.role_id === 1)return items;
            if(this.user.role_id === 2){
                return items.filter(item => !item.superOnly)
            }
            return [];
        }
    },
    computed:{
        user():User{
            return this.$auth.user as User
        },
        menuItems():Array<AdminMenuItem>{
            return this.$accessor.admin.menu
        },
     
        itemGroups():Array<AdminMenuItem>{
            return this.filterItems(this.menuItems.filter((mi:AdminMenuItem) => {return !!mi.children}))
        },
        itemLinks():Array<AdminMenuItem>{
             return this.filterItems(this.menuItems.filter((mi:AdminMenuItem) => {return !mi.children}))
        }
    }
})
</script>