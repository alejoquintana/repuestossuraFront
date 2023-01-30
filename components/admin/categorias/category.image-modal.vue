<template>
    <div class="fcc">
        <div class="text-center">
            <h4>{{category.name}}</h4>
        </div>
        <div class="img-container" v-if="!image">
            <v-img contain :aspect-ratio="1" :src="$accessor.helpers.imagePath(category.image)"></v-img>
        </div>
        <imgupload @reset="reset" @blobs="setImage"/>
        <v-btn v-if="!cropping" color="primary" :disabled="!image" @click="save" class="mt-4">
            GUARDAR
        </v-btn>
    </div>
</template>

<script>
import imgupload from '@/components/common/canvas-upload'
export default {
    props:['category'],
    components:{imgupload},
    data() {
        return {
            image:null
        }
    },
    computed:{
        cropping(){
            return this.$accessor.admin.getCropping
        }
    },
    methods:{
        reset(){
            this.image = null
        },
        setImage(event)
        {
            let images = event
            if ( images && images[0] ) this.image = images[0]

        },
        async save(){
            if(!this.image)return;
            let data = new FormData();
            data.append('image',this.image);
            data.append('id',this.category.id);
            this.$accessor.setLoading(true)
            await this.$accessor.categories.changeImage(data);
            await this.$accessor.categories.fetchCategories();
            this.$accessor.setLoading(false)
            this.$emit('close')
        }
    }
}
</script>

<style scoped>
    .img-container{
        width:150px;
    }
</style>
