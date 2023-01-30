<template>
    <div class="top-nav">
        <v-row justify="space-between" class="px-4" align="center"> 
            <v-col lg="2">
                <v-btn icon dark @click="$emit('showMenu')">
                    <v-icon dark>
                        {{$accessor.mdicons.mdicons.mdiMenu}}
                    </v-icon>
                </v-btn>
            </v-col>
            <v-col lg="4">
                <no-ssr>
                  <span v-if="user" class="white--text"><b>{{user.name}}</b> </span>  
                </no-ssr>
            </v-col>
            <v-col cols="12" lg="2">
                <v-btn  class="white" large nuxt to="/">
                    HOME
                   <!--  <v-img class="logo-up" contain x-small src="/logo.jpg"></v-img> -->
                </v-btn>
            </v-col>
        </v-row>
    </div>
</template>

<script>

export default {
    computed:{
        user(){
            return this.$auth.user
        }
    }
}
</script>

<style scoped>
    .top-nav{
        background-color:blue;
        display:flex ;
        justify-content: flex-start ;
        width:100vw;
    }
    .logo-up{
        width:100px;
    }
</style>