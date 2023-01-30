<template>
<div class="fc">
    <v-divider color="green"></v-divider>
    <v-row>
        <v-col cols="6">
              <h4>Orden:{{block.order+1}}</h4>
        </v-col>
    </v-row>
    <v-row class="mt-4">
        <v-col cols="6">
            <v-btn color="info" 
                    small 
                    class=" mb-4" 
                    v-if="!block.text" 
                    @click="block.text='Texto del bloque'">
                    Agregar texto
            </v-btn>
             <v-textarea v-if="block.text"
                        v-model.lazy="block.text" 
                        rows="1" 
                        class="form-control" 
                        @change="savechange('text')" />
        </v-col>
        <v-col cols="6">
            <div class="fc">
                <div>
                    <imageUploader :label="block.image ? 'CAMBIAR FOTO' : 'ELEGIR FOTO'" @blobOptimizedImage="setImage" @reset="resetImage" />
                    <div v-if="block.image && !img">
                        <v-img :src="$accessor.imagePath(block.image)" :alt="block.imagealt"/>
                        <v-btn color="error" class="mt-3" @click="deleteImg">
                            <v-icon>{{$accessor.mdicons.mdicons.mdiDelete}}</v-icon>
                        </v-btn>
                    </div>
                </div>
                <div v-if="img">
                    <v-btn color="success"  class="mt-3" @click="saveimg">
                        GUARDAR FOTO
                    </v-btn>
                </div>
                
            </div>
        </v-col>
    </v-row>
    <v-divider color="green"></v-divider>
</div>
</template>

<script>
import imageUploader from '@/components/common/canvas-upload'
export default {
    props:['block'],
    components:{imageUploader},
    data(){
        return {
            img:null,
            keepimg:null,
        }
    },
    methods:{
        deleteImg(){
            swal({
                title:`Confirmar borrado de la imagen`,
                text:'desea continuar?',
                buttons:{
                    confirm:{text:'SI'},
                    cancel:{text:'NO',visible:true,closeModal:true,value:false},
                }
            }).then( (r) => {
                if(!r)return;
                this.$accessor.posts.destroyImage(this.block.id).then(()=>{
                    this.fetch()
                })
                this.$accessor.snackbarNotify('Imagen borrada');
            })
        },
        setImage(event){
            this.img = event;
        },
        resetImage(){
            this.img = null
        },
         saveimg(){
                var vm =this;
                const file = this.img;
                if (file == null){
                    swal('No se ha seleccionado una imagen','','error');
                } else {

                    var fdata =  new FormData();
                    fdata.append('image',file);
                    fdata.append('block_id',this.block.id)              
                   
                    this.$axios.post('/blockimage',fdata)
                    this.keepimg=this.img;
                    this.img=null;
                    
    
                   
                }

        },
        
        savechange(field)
        {
            let data = {
                id: this.block.id,
                field:field,
                value:this.block[field]
            }

            this.$axios.put('/block',data);
        }
    }
}
</script>


<style lang="scss" scoped>
.miniature{
    width:200px;
}
.display-none{
    opacity:0;
}

.border-bot{
    border-bottom:2px solid #000;
}
</style>
