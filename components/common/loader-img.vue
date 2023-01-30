<template>
    <v-responsive :aspect-ratio="aspectRatio">
        <div class="d-flex justify-center align-center h-100">
            <img v-if="loaded" :src="src" :alt="alt">
            <div v-if="!loaded" class="relative dot-loader-container">
                <dot-loader :loading="!loaded" size="20px"></dot-loader>
            </div>
        </div>
    </v-responsive>
</template>

<script>
import dotLoader from 'vue-spinner/src/PulseLoader.vue';
export default {
    props:['src','alt','aspectRatio'],
    components:{dotLoader},
    data(){
        return{
            loaded:false
        }
    },
    methods:{
        preload(){
            var vm = this;
            let element = new Image();
            element.alt=this.alt;
            element.setAttribute('ref','imageref');
            element.onload = () =>{
                vm.loaded = true;
            }
            element.src = this.src;
        }
    },
    mounted(){
        this.preload();
    }
}
</script>

<style lang="scss" scoped>
.relative-dot-loader{
    width:100%;
    height:100%;
    min-height: 100px;
}
</style>
