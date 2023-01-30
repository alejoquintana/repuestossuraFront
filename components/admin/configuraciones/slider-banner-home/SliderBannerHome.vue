<template>
    <div>
        <v-row>
            <v-col cols="6" v-for="opt in selectOptions" :key="opt.code">
                <v-btn block :color="opt.code === selected_code ? 'info' : ''" @click="setSelectedCode(opt.code)">
                    {{opt.name}}
                </v-btn>
            </v-col>
        </v-row>

        <div class="text-center dark-text bold">
            <span>
                medidas recomendadas: {{selected_code == '_wide' ? '1500x500':'800x400'}}
            </span>
        </div>

        <div>
            <span class="name-code">Agregar Banner</span>
            <v-row>
                <v-col cols="7">
                    <uploadImage v-if="uploadImg" @blobOptimizedImage="setImage" :nooptimize="true" @reset="resetImage" @deletedImg="resetImage"></uploadImage>
                </v-col>
                <v-col cols="5">
                    <v-form class="" @submit.prevent="send">
                        <v-text-field class="mt-2" hide-details label="Nombre" v-model="newName"/>
                        <v-text-field class="mt-2" hide-details label="Redirección" v-model="newTargetUrl"/>
                        <v-btn block class="mt-4" color="success" :disabled="!(newImage && newName && newTargetUrl)" type="submit">GUARDAR</v-btn>
                    </v-form>
                </v-col>
            </v-row>
        </div>
			<v-row>
				<v-col cols="6" v-for="appImage in appImages" :key="appImage.id">
					<app-image-upload :appImage="appImage" @fetch="fetch" />
				</v-col>
			</v-row>
    </div>
</template>

<script>
import uploadImage from '@/components/common/canvas-upload.vue'
import appImageUpload from './appimage-upload.vue'
export default {
    components:{appImageUpload,uploadImage},
    data() {
        return {
            uploadImg:true,
            newImage:null,
            newName:'',
            newTargetUrl:'',
            selected_code : '_wide',
            selectOptions:[
                {name:'SLIDER PC',code:'_wide'},
                {name:'SLIDER MOBILE',code:'_mobile'}
            ],
        }
    },
    computed:{
        appImages(){
            return this.$accessor.appImages.getAppImagesByCode(this.code)
        },
        code(){
            return `slider_brands_home${this.selected_code}`
        },
    },
    methods:{
        setImage(event){
            this.newImage = event;
        },
        resetImage(){
            this.newImage = null;
        },
        async send(){
            this.$accessor.setLoading(true)

            let fdata = new FormData();
            fdata.append('name',this.newName);
            fdata.append('code',this.code);
            fdata.append('target_url',this.newTargetUrl);
            fdata.append('image',this.newImage);
            await this.$accessor.appImages.createBannerHome(fdata);

            await this.fetch();
            this.uploadImg = false;
            setTimeout(() => {
                this.uploadImg = true;
            }, 500);
            this.newName = '';
            this.newTargetUrl = '';
            this.$accessor.setLoading(false)
        },
        setSelectedCode(code){
            this.resetImage();
            this.selected_code = code;
        },
        async fetch(){
            await this.$accessor.appImages.fetchAppImages();
        }
    },
    async mounted(){
        await this.fetch();
    }
}
</script>
