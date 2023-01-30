<template>
    <v-overlay color="secondary" v-if="loading" class="overlay">
        <div class="overlay-inner">
            <v-progress-circular  indeterminate color="primary"  size="100"></v-progress-circular>
        </div>
    </v-overlay>
</template>

<script lang="ts">
import Vue from 'vue'
import { mybool } from '~/types';
export default Vue.extend({
   data() {
       return {
           loading:false
       }
   },
   methods:{
      start() {
        this.loading = true
      },
      finish() {
        this.loading = false
      }
   }
})
</script>

<style lang="scss" scoped>
.overlay{
    z-index:990;
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
    z-index:99999;
    .loading-spinner{
        width:200px;
        height: 200px;
    }
}
</style>
