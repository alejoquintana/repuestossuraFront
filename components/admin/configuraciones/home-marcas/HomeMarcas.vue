<template>
    <div>
        <div class="text-center fc bordered eleavtion-6 mb-4" >
            <h2>CREAR MARCA</h2>
            <span class="dark-text">200px X 100px</span>
				<v-row>
					<v-col cols="6">
            		<uploadImage v-if="!dismountUploader" @blobOptimizedImage="setImage" :nooptimize="true" @reset="resetImage" ></uploadImage>
					</v-col>
					<v-col cols="6">
						<div class="w-50">
							<v-text-field  v-model="newname" placeholder="NOMBRE DE LA MARCA"/>
						</div>
						<v-btn color="primary" @click="uploadImage" v-if="image">GUARDAR</v-btn>
					</v-col>
				</v-row>
        </div>
        <div>
            <v-container v-for="appImage in brandImages" :key="appImage.id">
					<appImageRow :appImage="appImage" />
            </v-container>
        </div>
    </div>
</template>

<script>
import appImageRow from './appImageRow.vue'
import uploadImage from '@/components/common/canvas-upload.vue'
export default {
    components:{ uploadImage , appImageRow },
    data() {
        return {
            dismountUploader:false,
            newname:'',
            image:null,
            imageCode : 'home_brand',
        }
    },
    computed:{
        appImages(){
            return this.$accessor.appImages.getAppImages
        },
        brandImages(){
            if(!this.appImages)return
            return this.appImages.filter(img=>img.code == this.imageCode)
        }
    },
    methods:{
        async uploadImage(){
            this.$accessor.setLoading(true)
            let fdata = new FormData();
            fdata.append('image',this.image);
            fdata.append('code',this.imageCode);
            fdata.append('name',this.newname);
            this.dismountUploader = true ;
            await this.$accessor.appImages.create(fdata);426
            await this.$accessor.appImages.fetchAppImages();
            this.resetImage();
            this.$accessor.setLoading(false)
            this.dismountUploader = false ;
           // this.$router.go();
        },
        setImage(event){
            this.image = event;
        },
        resetImage(){
            this.image = null;
            this.newname='';
        },
        saveChange(field,value){
            this.$accessor.appImages.update({id:this.selectedObj.id,field,value})
        },
        async fetch(){
            await this.$accessor.appImages.fetchAppImages();
        }
    },
    async mounted(){
        var vm = this ;
        await this.fetch();

    }
}
</script>
