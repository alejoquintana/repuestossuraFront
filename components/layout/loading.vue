<template>
    <div color="secondary" v-if="loading" class="loading-overlay">
        <div class="overlay-inner fcc">
            <v-progress-circular  indeterminate color="primary"  size="100"></v-progress-circular>
            <h2 v-if="loadingMessage" class="text-center loadingmessage">{{loadingMessage}}</h2>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mybool } from '~/types';
export default Vue.extend({
    computed:{
        loading():mybool
        {
            return this.$accessor.loading;
        },
        loadingMessage(){
            return this.$accessor.getLoadingMessage;
        }
    }
})
</script>

<style lang="scss" scoped>
.loading-overlay{
    z-index:998;
    position:fixed;
    top:0;
    left:0;
    color:rgba(blue,.5);
}
.overlay-inner{
    background-color: #ccc9;
    width:100vw;
    height: 100vh;
    position:fixed;
    top:0;
    left:0;
    display:flex;
    justify-content: center;
    align-items:center;
    z-index:999;
    .loading-spinner{
        z-index:999;
        width:200px;
        height: 200px;
    }
    .loadingmessage{
        z-index:9999;
        font-weight: bold;
        color:blue;
    }
}
</style>
