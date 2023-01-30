<template>
    <div class="fcc mt-4 w-100">
        <div class="fcc relative w-100" v-if="canvaspreviews.length">
                <div class="imgpreview" >
                    <v-img contain :aspect-ratio="1" :src="selected" />
                    <div class="controls" v-if="canvaspreviews.length > 1">
                       <v-btn fab small color="primary" class="control-square" @click="prev">
                           <v-icon x-large>{{$accessor.mdicons.mdicons.mdiChevronLeft}}</v-icon>
                       </v-btn>
                       <v-btn fab small color="primary" class="control-square" @click="next">
                           <v-icon x-large>{{$accessor.mdicons.mdicons.mdiChevronRight}}</v-icon>
                       </v-btn>
                    </div>
                </div>
        </div>

        <div v-if="canvaspreviews.length > 1" class="w-100">
             <div   class="d-flex justify-space-around mt-4 w-100">
                <div v-for="image in canvaspreviews"
                    :key="image"
                    class="miniature"
                    :class="{'selected':image == selected}"
                    @click="selected = image">
                    <img :src="image">
                </div>
            </div>
        </div>

        <div class="relative">
            <v-btn block class="secondary rounded-xl rounded-br-0">
               <div v-if="!label">
                    <span v-if="!multiple">ELEGIR FOTO</span>
                    <span v-if="multiple">ELEGIR FOTOS</span>
                </div>
               <span v-else> {{label}} </span>
            </v-btn>
            <input  @change="setPreviews"
                    type="file"
                    ref="daFile"
                    name="file"
                    accept="image/x-png,image/gif,image/jpeg"
                    class="display-none-input"
                    :multiple="multiple" >
        </div>
    </div>
</template>

<script>
import swal from 'sweetalert';
export default {
    props:['label','multiple','callback','oldimages'],
    data() {
        return {
            selected:null,
            canvaspreviews:[],
            previndex:[],
            previews:[],
            blobs:[],
            previewI:0,
            previewurl:null,
            canvaspreview:null,
            blobimage:null
        }
    },
    methods:{
        prev(){
            if(this.previewI > 0) this.previewI--
            else this.previewI = (this.previews.length - 1);
            this.selected = this.canvaspreviews[this.previewI]
        },
        next(){
            if(this.previewI < this.previews.length-1) this.previewI++
            else this.previewI = 0;
            this.selected = this.canvaspreviews[this.previewI]
        },
        reset(){
            this.previews = [];
            this.canvaspreviews = [];
            this.blobs = [];
            this.previewurl = '';
            this.imageuploaded = false;
            this.$accessor.setLoading(false);
            this.$emit('reset')
            return;
        },
        async setPreview(file,i){
            var vm = this;
            let files = (this.$refs.daFile).files
            if(!files)return;
            let loadingMessage = `Cargando ${i} de ${files.length}`;
            this.$accessor.setLoadingMessage(loadingMessage);
            let prev = await URL.createObjectURL(file)
            vm.previews.push(prev)
            await this.resize(prev);

        },
        async setPreviews()
        {
            this.reset() ;

            var vm = this ;
            this.$accessor.setLoading(true) ;
            this.imageuploaded=true ;
            let files = (this.$refs.daFile).files ;



             if(!files || !files[0] )
             {
                   this.reset();
                   return;
             }

            let i = 1;
            await files.forEach(async f => {
                await vm.setPreview(f,i)
                i++

                if(i == files.length+1){
                    vm.$accessor.setLoading(false)
                    vm.selected = vm.canvaspreviews[0]
                }
            });


            //this.$accessor.setLoadingMessage=null;


        },
        async resize(previewurl){
            var vm = this;

            const imgElement = document.createElement('img');
            imgElement.src = previewurl;

            imgElement.onload = async function(e){

                const canvas = document.createElement('canvas');
                const MAX_WIDTH = 600;

                const scaleSize = MAX_WIDTH / e.target.width;

                canvas.width = MAX_WIDTH;
                canvas.height = e.target.height * scaleSize ;

                const ctx = canvas.getContext("2d");

                ctx.drawImage(e.target, 0, 0, canvas.width, canvas.height);

                const srcEncoded = await ctx.canvas.toDataURL(e.target, "image/jpeg") ;

                await ctx.canvas.toBlob(e => {
                    /* vm.blobimage = e; */
                   /*  vm.$emit('blobOptimizedImage',e); */
                    vm.blobs.push(e);

                    vm.$emit('blobs',vm.blobs)

                    if(!this.multiple){
                        vm.$emit('blob',vm.blobs[0])
                    }


                });

                vm.canvaspreviews.push(srcEncoded) ;



                if(!vm.selected) vm.selected = vm.canvaspreviews[0]

            }



        },
    }
}
</script>

<style scoped lang="scss">
    .imgpreview, .preview-container {
        width:150px;
       // height: 300px;
        //max-width: 100%;
        display:flex;
        justify-content: center;
        align-content: center;
        overflow: hidden;
    }

   .controls{
       position:absolute;
       top:30%;
       display: flex;
       margin: auto;
       width: 100%;
       max-width:250px;
       justify-content: space-between;
       padding:10px;
       font-size: 30px;
    }


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
