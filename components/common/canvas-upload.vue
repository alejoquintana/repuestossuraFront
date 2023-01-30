<template>
	<div class="fcc max-w-uploader">

		<cropper v-if="useCropper && srcForCropper" @cancelCrop="useCropper=false"
			@toggleFillBackground="toggleFillBackground" :fillBackground="fillBackground" :src="srcForCropper"
			@blob="setCropped" @croped="croped" :aspectRatio="rectangular ? 1/1.3 : 1" />

		<div class="fcc" v-if="!useCropper">
			<div class="fcc cropperfcc" v-if="canvaspreviews.length">
				<div class="imgpreview relative">
					<v-img :src="selected" :key="previewI" />
					<div class="controls" v-if="canvaspreviews.length > 1">
						<div class="control-square" @click="prev">
							<v-icon>{{$accessor.mdicons.mdicons.mdiChevronLeft}}</v-icon>
						</div>
						<div class="control-square" @click="next">
							<v-icon>{{$accessor.mdicons.mdicons.mdiChevronRight}}</v-icon>
						</div>
					</div>
					<v-btn absolute small style="bottom:20px;" right fab color="primary" @click="goCrop" v-if="!useCropper">
						<v-icon>{{$accessor.mdicons.mdicons.mdiCrop}}</v-icon>
					</v-btn>
					<v-btn absolute small style="bottom:20px;" left fab color="error" @click="deleteImg()">
						<v-icon>{{$accessor.mdicons.mdicons.mdiTrashCan}}</v-icon>
					</v-btn>
				</div>
			</div>

			<div v-if="canvaspreviews.length > 1" class="w-100">
				<div class="d-flex justify-space-around mt-4 w-100">
					<div v-for="image in canvaspreviews" :key="'min'+image" class="miniature"
						:class="{'selected':image == selected}" @click="setSelected(image)">
						<img :src="image" />
					</div>
				</div>
			</div>

			<div class="relative">
				<v-btn block class="admi-button mt-3" color="primary">
					<span v-if="!label"> ELEGIR FOTO </span>
					<span v-else> {{label}} </span>
				</v-btn>
				<input @change="setPreviews" type="file" ref="daFile" name="file" accept="image/x-png,image/gif,image/jpeg"
					class="display-none-input" :multiple="multiple">
			</div>
		</div>
	</div>
</template>

<script>
import cropper from './cropper.vue'
import swal from 'sweetalert';
export default {
    props:['label','multiple','callback','oldimages','aspectRatio','rectangular','nooptimize','maxwidth'],
    components:{cropper},
    data() {
        return {
            canvasPreviewsOriginals : [],
            useCropper:false,
            firstTimeCropped:true,
            selected:null,
            canvaspreviews:[],
            previews:[],
            blobs:[],
            previewI:0,
            previewurl:null,
            canvaspreview:null,
            srcForCropper:null,
            blobimage:null,
            showCroper:true,
            fillBackground:false
        }
    },
    computed:{
        user(){
            return this.$auth.user
        },
    },
    methods:{
        setSelected(image){
            this.selected = image
            this.previewI = this.canvaspreviews.indexOf(image)
        },
        toggleFillBackground(){
            this.useCropper = false;
            this.fillBackground = !this.fillBackground
            this.goCrop();
        },
        async goCrop(){
            this.srcForCropper = null;
            this.useCropper = true;
            await this.resizeForCropper(this.canvasPreviewsOriginals[this.previewI])
            this.$accessor.admin.setCropping(true)
        },
        async deleteImg(){
            swal({
                title:'Está seguro de eliminar esta imagen ?',
                text:'desea continuar?',
                buttons:{
                    confirm:{text:'SI, ELIMINAR'},
                    cancel:{text:'NO',visible:true,closeModal:true,value:false},
                }
            }).then( (r) => {
                if (!r) return;
                let index = this.previewI;
                this.canvasPreviewsOriginals.splice(index, 1);
                this.canvaspreviews.splice(index, 1);
                this.previews.splice(index, 1);
                this.blobs.splice(index, 1);
                this.selected = this.canvaspreviews[0];
                this.previewI = 0;
                this.$emit('deletedImg')
                //.splice(this.previewI, 1);
            })
        },
        returnBlob(e){
            //console.log('e',e);
            return e;
        },
        croped(e){
           this.previews = [e.dataurl]
           this.previewI = 0 ;
           this.showCroper = false;
           this.selected = e.dataurl ;
           this.showCroper = true
        },
        setCropped(ev){
            var vm = this;
            this.$emit('blobs',[ev])
            this.$emit('blobOptimizedImage',ev)
            let dataurl = URL.createObjectURL(ev)
            this.selected = dataurl
            this.previews[this.previewI] = dataurl
            this.canvaspreviews[this.previewI] = dataurl
            vm.blobs[this.previewI] = ev ;
            vm.$emit('blobs',vm.blobs)
            if(!this.multiple){
                vm.$emit('blobOptimizedImage',vm.blobs[0])
            }
            this.useCropper = false;
        },
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
            this.canvasPreviewsOriginals = [];
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
        async setPreviews(event){
            if (!event) return;
            this.reset();
            var vm = this;
            this.imageuploaded=true;
            let files = (this.$refs.daFile).files;
            if(!files || !files.length) return;

            this.$accessor.setLoading(true);

            if (!files || !files[0]) {
                this.reset();
                return;
            }

            let i = 1;
            await [...files].forEach(async f => {
                // console.log('f',f);
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
                const ctx = canvas.getContext("2d");

                if(!vm.nooptimize){
                    const MAX_WIDTH = this.maxwidth || 600;
                    let width = e.target.width < MAX_WIDTH ? e.target.width : MAX_WIDTH;

                    const scaleSize = width / e.target.width;

                    canvas.width = width;
                    canvas.height = e.target.height * scaleSize ;

                    ctx.drawImage(e.target, 0, 0, canvas.width, canvas.height);
                }

                if(vm.nooptimize){
                    canvas.width = e.target.width;
                    canvas.height = e.target.height;
                    ctx.imageSmoothingEnabled  = false;
                    ctx.drawImage(e.target, 0, 0);
                }

                const srcEncoded = await ctx.canvas.toDataURL(e.target, "image/jpeg") ;

                await ctx.canvas.toBlob(e => {
                    // vm.blobimage = e;
                    // vm.$emit('blobOptimizedImage',e);
                    vm.blobs.push(e);

                    vm.$emit('blobs',vm.blobs)

                    if(!this.multiple){
                        vm.$emit('blobOptimizedImage',vm.blobs[0])
                    }
                });

                vm.canvaspreviews.push(srcEncoded) ;
                vm.canvasPreviewsOriginals.push(srcEncoded) ;

                if(!vm.selected) vm.selected = vm.canvaspreviews[0]

            }

            this.canvaspreviews = [];

        },
        async resizeForCropper(previewurl){
            var vm = this;
            const imgElement = document.createElement('img');
            imgElement.src = previewurl;
            imgElement.style.background = "white";

            imgElement.onload = async function(e){

                const canvas2 = document.createElement('canvas');
                canvas2.setAttribute("id", "canvas2");
                canvas2.setAttribute("ref", "canvas2");

                let MAX_WIDTH = 1500;
                let MAX_HEIGHT = 1500;
                if (vm.rectangular) {
                    MAX_HEIGHT *= 1.3
                }

                let widthIsBigger = e.target.width >= e.target.height
                let biggerThanAspRat = e.target.width / e.target.height >= vm.aspectRatio
                let scaler = biggerThanAspRat ? MAX_WIDTH : MAX_HEIGHT ;

                let biggerSide = widthIsBigger ? e.target.width : e.target.height;
                let smallerSide = widthIsBigger ? e.target.height : e.target.width;

                let scale = biggerSide / scaler;

                biggerSide /= scale ;
                smallerSide /= scale ;

                //console.log(e.target.width,e.target.height);
                e.target.width = widthIsBigger ? biggerSide : smallerSide
                e.target.height = widthIsBigger ? smallerSide : biggerSide
                //console.log(e.target.width,e.target.height);

                canvas2.width  = MAX_WIDTH;
                canvas2.height = MAX_HEIGHT;

                let imgStartsInCanvasWidth = widthIsBigger ? 0 : (MAX_WIDTH-e.target.width) / 2;
                let imgStartsInCanvasHeight = widthIsBigger ? (MAX_HEIGHT-e.target.height) / 2 : 0;

                const ctx = canvas2.getContext("2d");

                ctx.save();
                ctx.fillStyle = 'white';
                ctx.fillRect(0, 0, MAX_WIDTH,MAX_HEIGHT);
                ctx.restore();

                if (vm.fillBackground) {
                    ctx.save();
                    ctx.filter = 'blur(10px)';
                    ctx.translate(-750, -750);
                    ctx.drawImage(e.target, 750, 750, MAX_WIDTH+10,MAX_HEIGHT+10);
                    ctx.restore();
                }

                ctx.save();
                ctx.fillStyle = 'white';
                ctx.fillRect(imgStartsInCanvasWidth, imgStartsInCanvasHeight, e.target.width, e.target.height);
                ctx.restore();

                ctx.drawImage(e.target, imgStartsInCanvasWidth, imgStartsInCanvasHeight, e.target.width, e.target.height);

                const srcEncoded = await ctx.canvas.toDataURL(e.target, "image/jpeg") ;
                vm.srcForCropper = srcEncoded
                canvas2.remove();
            }
            imgElement.remove();
        },
    },
}
</script>

<style scoped lang="scss">
.max-w-uploader{
	max-width: 350px;
}
.control-square{
    width:30px;
}
.imgpreview, .preview-container {
    width:100%;
    // height: 300px;
    max-width: 500px;
    display:flex;
    justify-content: center;
    align-content: center;
    overflow: hidden;
}

.controls{
    position:absolute;
    top:30%;
    display: flex;
    width:100%;
    justify-content: space-between;
    padding:10px;
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
.console{
    width: 34%;
    left: 23px;
    background: #fff;
}
.w-10{
    width: 50px !important;
}



</style>
