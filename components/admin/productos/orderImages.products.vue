<template>
    <div class="w-100"> 
        <draggable v-model="imgArray" @change="shouldSave=true" class="d-flex justify-space-around">
            <div v-for="image in imgArray" 
                :key="image.id" 
                class="miniature" 
                :class="{'selected':image == selected}"
                @click="setSelected(image)">
                <v-img contain :aspect-ratio="1" :src="imagePath(image.url)" />  
            </div>
        </draggable>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
 import draggable from 'vuedraggable'
import { ProductImage } from '~/types'
export default Vue.extend({
    props:['images','selected'],
    components:{draggable},
    data() {
        return {
            shouldSave:false,
            imgArray:[] as Array<ProductImage>
        }
    },
    methods:{
        imagePath(path : ProductImage | string){
                return this.$accessor.imagePath(path);
        },
        setSelected(image:ProductImage){
            this.$emit('setSelected',image)
        },
        async saveChanges(){
            let list = [];
            for (let index = 0; index < this.imgArray.length; index++) {
                const image = this.imgArray[index];
                list.push({image_id:image.id , order:index})
            }
            await this.$accessor.products.imagesOrder(list);
        },
       
    },
    mounted(){
        this.imgArray = this.images.slice();
    },
    beforeDestroy(){
        if(this.shouldSave){
            this.saveChanges();
            this.$emit('changeArray',this.imgArray)
        }
    }
})
</script>

<style lang="scss" scoped>
.miniature{
    transition:1s all;
    display: flex;
    justify-content: center;
    align-items: center;
    width:40px;
    cursor: pointer;
    height: 40px;
    overflow: hidden;
    box-shadow: 2px 2px 2px #000c;
}
.selected{
    border:1px solid blue;
    box-shadow: 6px 6px 6px #00f6;
}

</style>
