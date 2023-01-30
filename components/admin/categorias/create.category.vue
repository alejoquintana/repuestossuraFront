<template>
    <div class="fcc">
        <div class="fcc" v-if="!cropping">
            <h4>CREAR CATEGORIA</h4>
            <v-text-field v-model="code"  label="CODIGO" />
            <v-text-field v-model="name"  label="NOMBRE" />
            <v-textarea  v-model="description" label="DESCRIPCION" rows="3" />
        </div>
        <imageUpload  :aspectRatio="1/1.3" @blobs="setImage" @reset="resetImage"></imageUpload>
        <v-btn color="primary" class="mt-4" v-if="!cropping" @click="save" :disabled="!name || !code">
            <v-icon>{{$accessor.mdicons.mdicons.mdiUpload}}</v-icon>
            GUARDAR
        </v-btn>
    </div>
</template>

<script>
import imageUpload from '@/components/common/canvas-upload'
export default {
    components:{
        imageUpload
    },
    data() {
        return {
            image:null,
            name:'',
            code:'',
            description:'',
        }
    },
    computed:{
        cropping(){
            return this.$accessor.admin.getCropping
        }
    },
    methods:{
        resetImage(){
            this.image = null;
        },
        setImage(event){
            if(!event || !event[0])return;
            this.image = event[0]
        },
        async save(){
            if(!this.name)return;
            if(!this.code)return;
            let fdata = new FormData();
            fdata.append('code',this.code)
            fdata.append('name',this.name)
            if(this.description) fdata.append('description',this.description)
            if(this.image) fdata.append('image',this.image)

            this.$accessor.setLoading(true)
            await this.$accessor.categories.saveCategory(fdata);
            this.$accessor.snackbarNotify('Categoria creada');
            await this.$accessor.categories.fetchCategories();
            this.$accessor.setLoading(false)
            this.$emit('close')

        },
    }
}
</script>
