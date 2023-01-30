<template>
    <div class="row ">
        <div class="col-12">
            <h2>Metadata de paginas</h2> 
            <hr>
        </div>
   
        
        <hr>
        <v-row>
            <v-col cols="3" class="fc">
                 <div>
                    <v-btn block v-for="meta in metadatas" 
                            :key="meta.id"
                            @click="selected=meta"
                            class=" white-bold"
                            :class="{'primary' : selected == meta}">
                            {{meta.page | uc}}
                    </v-btn>
                 </div>
            </v-col>
            <v-col cols="9">
                <div v-if="selected">
                    <h2> {{selected.page | ucFirst}} </h2>

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
                    <div class="p2 row">
                        <label class="col-12 col-lg-4">
                            Titutlo
                        </label>
                        <textarea rows="5" v-model.lazy.trim="selected.title" @change="save(selected,'title')" 
                            type="text" class="col-12 col-lg-8 form-control"></textarea>
                    </div>
                    <div class="p2 row">
                        <label class="col-12 col-lg-4">
                            Descripcion
                        </label>
                        <textarea rows="5" v-model.lazy.trim="selected.description" @change="save(selected,'description')" 
                            type="text" class="col-12 col-lg-8 form-control"></textarea>
                    </div>
                </div>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    
    data(){
        return{
            selected : null,
        }
    },
    computed:{
        metadatas(){
            return this.$accessor.pageMetas.getAllMeta
        }
    },
  
    methods :{
        async save(meta,field){
            var data = {
                id : meta.id,
                field : field,
                value : meta[field]
            }
            await this.$accessor.pageMetas.update(data);
             this.$accessor.snackbarNotify(`Cambio guardado`)
        }
    }

}
</script>
