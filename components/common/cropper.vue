<template>
    <div class="fcc">
        <div class="px-2">
            <vue-cropper :src="src" 
                            id="cropper" 
                            ref="cropper" 
                            @ready="ready" 
                            dragMode="none" 
                            :zoomable="false"
                            :zoomOnTouch="false"
                            :zoomOnWheel="false" 
                            :aspect-ratio="aspectRatio ? aspectRatio : 1" 
                            :options="options" 
            />
        </div>
        <div class="zoom-handler mt-4 fc mb-4">
            <div class="d-flex flex-column justify-end">
                <div >
                    <v-btn block @click="cancelCrop" small color="red" dark>CANCELAR</v-btn>
                </div>
                <div class="mt-3">
                    <v-btn block @click="$emit('toggleFillBackground')" small :color="fillBackground ? 'success' : 'secondary'" >
                        <span v-if="!fillBackground">RELLENAR FONDO</span>
                        <span v-if="fillBackground"> NO RELLENAR FONDO</span>
                    </v-btn>
                </div>
                <div class="mt-3">
                    <v-btn block @click="crop" right small color="primary" v-if="!preview">
                        LISTO!
                    </v-btn>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';
import swal from 'sweetalert';
export default {
    props:['src','fillBackground','aspectRatio'],
    components:{VueCropper},
    data() {
        return {
           preview:null,
           zoom:50,
           options:{
                    dragMode:'none',
                    movable:false,
                    scalable:false,
                    zoomOnWheel:false,
                    zoomable:false,
                    toggleDragModeOnDblclick:false
                    },
           zoomInterval:null,
        }
    },
    methods:{
        cancelCrop(){
            this.$emit('cancelCrop')
        },
        zoomIn(){
            if(this.$mq == 'lg')return
            this.zoom += 5 ;
            this.changeZoom()
            this.stopZoom()
        },
        
        zoomOut(){
            if(this.$mq == 'lg')return
            this.zoom -= 5 ;
            this.changeZoom()
            this.stopZoom()
        },

        stopZoom(){
            if (this.zoomInterval){
                clearInterval(this.zoomInterval)
                this.zoomInterval = null ;
            }
        },
        stopZoomW(){
            if(this.$mq != 'lg')return;
            if (this.zoomInterval){
                clearInterval(this.zoomInterval)
                this.zoomInterval = null ;
            }
        },
        startZoom(event,direction){
            
            this.zoom = ( direction === '+' ) ? this.zoom + 5 : this.zoom -5 ;
            this.changeZoom()
            if(event){
                //  event.preventDefault()
                event.stopPropagation()
            }
            if(this.zoomInterval != null)return;
            var vm = this;
            this.zoomInterval = setInterval(() => {
                if(direction === '+') vm.zoom ++
                if(direction === '-') vm.zoom --
                vm.changeZoom()
            }, 50);
        },
        startZoomW(event,direction){
            if(this.$mq != 'lg')return;
            if(event){
                //  event.preventDefault()
                event.stopPropagation()
            }
            if(this.zoomInterval != null)return;
            var vm = this;
            this.zoomInterval = setInterval(() => {
                if(direction === '+') vm.zoom ++
                if(direction === '-') vm.zoom --
                vm.changeZoom()
            }, 50);
        },
        reset(){
            this.preview = null ;
            this.$refs.cropper.reset();
        },
        ready(){
            this.reset()
            // console.log('true',true);
        },
        changeZoom(){
            let cropper = this.$refs.cropper
            if(!cropper)return;
            cropper.zoomTo(this.zoom/100)
        },
        crop(){
            var vm = this ;
            let cropy = this.$refs.cropper.initCrop();
            const width = 900 ;
            const height = width * this.aspectRatio ;
            let cropedCanvas = this.$refs.cropper.getCroppedCanvas({fillColor:'#fff',height:height,width:width});
            let dataurl = this.$refs.cropper.getCroppedCanvas().toDataURL();
            this.preview = dataurl
            cropedCanvas.toBlob(blob=>{
                this.$emit('blob',blob)
            })
            
            
        }
    },
    mounted(){
        document.getElementById('cropper').scrollIntoView({behavior: "smooth"})
     this.$accessor.admin.setCropping(true)
        if(window){
            window.addEventListener("contextmenu", function(e) { e.preventDefault(); })
        }
        let cropper = this.$refs.cropper
        cropper.zoomOnWheel = false ;
    },
    beforeDestroy(){
       this.$accessor.admin.setCropping(false)
    },
    watch:{
        /* zoom(){
            this.changeZoom()
        } */
    }
}

</script>

<style scoped lang="scss">
.preview{
    border:1px solid $primary ;
}
.warn{
    color:red;
    font-size:12px;
}
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



</style>