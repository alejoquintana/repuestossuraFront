<template>
    <div class="fc">
        <v-divider color="blue"></v-divider>
        <v-row>
            <v-col cols="2" class="cursor-pointer">
                <v-img contain :src="portada"></v-img>
            </v-col>
            <v-col cols="10">
                <v-row>
                    <v-col cols="12">
                        {{product.name}}  
                        <span v-if="product.category" class="secondary--text">
                            [ {{product.category.name}} ]
                        </span> 
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="8" class="fc">
                        <v-row>
                            <v-col cols="3" class="fc">
                                <div v-if="product.category">
                                    <span> URL CATEGORIA </span>
                                    <span>{{product.category.slug}}</span>
                                </div>
                            </v-col>
                            <v-col cols="4">
                                <v-text-field  v-model="product.slug" @change="saveSlug()"  label="URL" />
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="5">
                                <v-text-field v-model="product.metatitle" @change="saveChange('metatitle')"  label="METATITULO" />
                            </v-col>
                            <v-col cols="7">
                                <v-textarea  v-model="product.metadescription" @change="saveChange('metadescription')" label="METADESCRIPCION" rows="1" />
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
        <v-divider color="blue"></v-divider>
    </div>
</template>

<script>
import swal from 'sweetalert'
export default {
    props:['product'],
    computed:{
        portada(){
            return this.$accessor.products.portada(this.product);
        },
        categories(){
            return this.$accessor.categories.categories
        },
       
    },
    methods:{
       async saveSlug(){
            this.product.slug  = this.product.slug.replace(/\s+/g, '-').toLowerCase().trim();
            
            let data = {
                id:this.product.id,
                field: 'slug',
                value: this.product.slug
            }
            
            await this.$accessor.products.update(data);
            this.$accessor.snackbarNotify(`${this.product.name} | Cambio guardado`);
        },
        async saveChange(field,event){
            let data = {
                id:this.product.id,
                field: field,
                value: this.product[field]
            }
            await this.$accessor.products.update(data);
            this.$accessor.snackbarNotify(`${this.product.name} | Cambio guardado`);
        },
    }
}
</script>

<style scoped>
    .image-container{
        width:100px;
    }
</style>