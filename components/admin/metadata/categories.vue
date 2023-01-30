<template>
    <div class="fc">
        <div>
            <h2>Descripciones y metadata de Categorias</h2>
            <hr>
        </div>
        
        <v-row>
            <v-col cols="3" class="fc">
                <div>
                    <v-btn block v-for="category in categories" 
                            :key="category.id"
                            @click="selected=category"
                            :class="{'primary' : selected == category}">
                            {{category.name}}
                    </v-btn>
                </div>
            </v-col>
            <v-col cols="9">
                <div v-if="selected">
                    <v-row>
                        <v-col cols="2">
                            <v-img contain :aspect-ratio="1" :src="$accessor.imagePath(selected.image)"/>
                        </v-col>
                        <v-col cols="10">
                            <h2> {{selected.name}} </h2>
                        </v-col>
                    </v-row>
                    <div class="p2 row">
                        <label class="col-12 col-lg-4">
                            URL
                        </label>
                        <textarea rows="2" v-model.lazy.trim="selected.slug" @change="saveSlug(selected)" 
                            type="text" class="col-12 col-lg-8 form-control"></textarea>
                    </div>
                    <div class="p2 row">
                        <label class="col-12 col-lg-4">
                            Descripcion
                        </label>
                        <textarea rows="5" v-model.lazy.trim="selected.description" @change="save(selected,'description')" 
                            type="text" class="col-12 col-lg-8 form-control"></textarea>
                    </div>
                    <div class="p2 row">
                        <label class="col-12 col-lg-4">
                            Meta Titutlo
                        </label>
                        <textarea rows="5" v-model.lazy.trim="selected.metatitle" @change="save(selected,'metatitle')" 
                            type="text" class="col-12 col-lg-8 form-control"></textarea>
                    </div>
                    <div class="p2 row">
                        <label class="col-12 col-lg-4">
                            Meta Descripcion
                        </label>
                        <textarea rows="5" v-model.lazy.trim="selected.metadescription" @change="save(selected,'metadescription')" 
                            type="text" class="col-12 col-lg-8 form-control"></textarea>
                    </div>
                </div>
            </v-col>
        </v-row>              
    </div>

</template>

<script>
import modal from '@/components/common/Modal.vue'
export default {
    components:{
        modal
    },
   
    data(){
        return{
            selected : null,
        }
    },
    computed:{
        categories(){
            return this.$accessor.categories.getCategories
        }
    },
    methods :{
       
        async save(category,field){
            var data = {
                id : category.id,
                field : field,
                value : category[field]
            }
            await  this.$accessor.categories.updateCategory(data);
            this.$accessor.snackbarNotify(`${category.name} | Cambio guardado`)
        },
        saveSlug(category){
            if(this.selected.slug){

                this.selected.slug  = this.selected.slug.replace(/\s+/g, '-').toLowerCase().trim();
                
                let dups = this.categories.find(c => {
                    return c.slug === this.selected.slug && c.id != this.selected.id;
                });

                if (dups){
                    swal('Cuidado!','Ya existe una categoria con esa URL','warning');
                }else{
                    this.save(category,'slug');
                }
            }
        }
    },
    mounted(){
        this.$accessor.categories.fetchCategories()
    },
    watch:{
        'selected.slug'(){
            if(this.selected.slug){

                this.selected.slug  = this.selected.slug.replace(/\s+/g, '-').toLowerCase().trim();
            }
        }
    },
    

}
</script>

<style scoped>
img{
    width: 100%;
}
    .overflow-hidden{
        overflow: hidden;
    }

.scroll-y{
    height:500px;
    overflow-y:scroll;

}
</style>