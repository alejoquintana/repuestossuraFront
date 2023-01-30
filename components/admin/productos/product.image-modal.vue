<template>
  <div class="w-100">
     <div class="newProduct">
        <div class="fcc">
            <div class="fcc">
                <span class="t20">
                    {{product.name}}
                </span>
            </div>

            <div class="controls" v-if="!imageuploaded && product.images.length > 1 ">
                    <v-icon @click="changei('-')">{{$accessor.mdicons.mdicons.mdiChevronLeft}}</v-icon>
                    <v-icon @click="changei('+')">{{$accessor.mdicons.mdicons.mdiChevronRight}}</v-icon>
            </div>

            <div class="preview-img-container mt-4 relative" v-if="!imageuploaded">
                    <v-img contain :aspect-ratio="1" :src="imagePath(product.images[i])"   />
            </div>

            <div class="delete-container fcc" v-if="!imageuploaded ">
                <v-btn x-small class="red white--text mt-1" danger  @click="del" v-if="product.images && product.images.length">
                    Borrar
                </v-btn>
                <v-btn x-small class="blue white--text mt-2" @click="setFirst" v-if="i>0">definir portada</v-btn>
            </div>

            <orderImages v-if="product.images.length > 1 && !imageuploaded && showOrderImages"
                     class="mt-4"
                     :selected="product.images[i]"
                     :images="product.images"
                     @changeArray="replaceImagesArray"
                     @setSelected="setSelected"
                     >
            </orderImages>


            <v-row class="w-100">
                <v-col cols="12" class="d-flex justify-center text-center">
                    <div class="fcc cursor-pointer w-100">
                        <canvasUpload :aspectRatio="1/1.3" :rectangular="true" label="agregar fotos" @blobs="setImages" @reset="resetImage" :multiple="true" ref="canvasupload">  </canvasUpload>
                    </div>
                </v-col>
            </v-row>
        </div>

        <div class="w-100 d-flex justify-end mt-4">
            <v-btn @click="send" :loading="$accessor.loading" v-if="!$accessor.admin.getCropping"
                    class="secondary rounded-xl rounded-br-0"> Listo, ya termine! </v-btn>
        </div>

     </div>

  </div>
</template>

<script lang="ts">
import Vue, {PropOptions} from 'vue'
import {Product,ProductImage} from '~/types';
import orderImages from './orderImages.products.vue'
import canvasUpload from '@/components/common/canvas-upload.vue'
export default Vue.extend({
	components: {
		canvasUpload,
		orderImages
	},
	props: {
		product: {} as PropOptions < Product >
	},
	data() {
		return {
			showOrderImages: true as boolean,
			i: 0,
			imageuploaded: false,
			files: null as any,
			showForm: false,
			previewurl: '',
		}
	},
	methods: {
		async saveArrayChanges() {
			let imgArray = this.product.images;
			if (!imgArray || !imgArray.length) return;
			let list = [];
			for (let index = 0; index < imgArray.length; index++) {
				const image = imgArray[index];
				list.push({
					image_id: image.id,
					order: index
				})
			}
			await this.$accessor.products.imagesOrder(list)
		},
		async setFirst() {
			let imgArray = this.product.images;
			this.$accessor.setLoading(true);
			this.showOrderImages = false;
			let img = imgArray[this.i]; //copio la imagen a reubicar
			imgArray = imgArray.filter(i => { //la quito del array
				return img.id != i.id
			})
			imgArray.unshift(img); //la coloco al inicio
			this.i = 0;
			let list = [];
			for (let index = 0; index < imgArray.length; index++) {
				const image = imgArray[index];
				list.push({
					image_id: image.id,
					order: index
				})
			}
			await this.$accessor.products.imagesOrder(list); //guardo  los cambios
			this.product.images = imgArray;
			setTimeout(() => {
				this.showOrderImages = true;
				this.$accessor.setLoading(false);
			}, 200);
		},
		resetImage() {
			this.imageuploaded = false;
			this.files = null;
		},
		setImages(e: any) {
			this.imageuploaded = true;
			this.files = e;
		},
		imagePath(path: ProductImage | string) {
			return this.$accessor.imagePath(path);
		},
		setSelected(event: ProductImage) {
			for (let index = 0; index < this.product.images.length; index++) {
				const image = this.product.images[index];
				if (event == image) {
					this.i = index
				}
			}
		},
		replaceImagesArray(event: Array < ProductImage > ) {
			this.product.images = event;
		},
		async send() {
			var vm = this;
			if (this.imageuploaded) {
				this.showOrderImages = false;
				this.$accessor.setLoading(true);
				const files = vm.files;
				var i = 1;
				const n = files.length;
				var loadingmessage;
				loadingmessage = `Subiendo imagen ${i} de ${n}`;
				this.$accessor.setLoadingMessage(loadingmessage);
				files.forEach(async (f: any) => {
					let fdata = new FormData();
					fdata.append('image', f);
					fdata.append('product_id', this.product.id.toString());
					await vm.$accessor.products.uploadImage(fdata)
						.then(() => {
							if (i == files.length) {
								this.$accessor.setLoadingMessage('');
								this.$accessor.setLoading(false);
								this.$emit('close');
							}
							i++;
							loadingmessage = `Subiendo imagen ${i} de ${n}`;
							this.$accessor.setLoadingMessage(loadingmessage);
						})
				});
			} else {
				this.$accessor.setLoading(false);
				this.$emit('close');
			}
		},
		async del() {
			this.showOrderImages = false;
			this.$accessor.setLoading(true);
			await this.$accessor.products.deleteImage(this.product.images[this.i])
			this.product.images = this.product.images.filter(image => {
				return image.id != this.product.images[this.i].id
			});
			this.i = 0;
			this.$accessor.setLoading(false);
			this.showOrderImages = true;
		},
		changei(side: '-' | '+') {
			if (side == '-') {
				if (this.i == 0) {
					this.i = this.product.images.length - 1;
				} else {
					this.i--
				}
			} else {
				if (this.i == this.product.images.length - 1) {
					this.i = 0;
				} else {
					this.i++
				}
			}
		},
	},
})
</script>

<style lang="scss" scoped>
.delete-container {
	display: flex;
	justify-content: center;
	.btn-delete {
		display: flex;
		justify-content: center;
		align-items: center;
	}
}
.controls {
	padding: 0 25%;
	position: absolute;
	top: 30%;
	width: 100%;
	display: flex;
	justify-content: space-between;
	.fa {
		cursor: pointer;
		font-size: 20px;
		color: blue;
	}
}
.edit-field {
	width: 270px;
}
.preview-img-container {
	width: 120px;
	height: 120px;
	border: 1px solid $primary;
	overflow: hidden;
	display: flex;
	border-radius: 15px;
	padding: 5px;
	justify-content: center;
	align-items: center;
	overflow: hidden;
	// box-shadow: 0px 5px 6px #0006;
}
.input-img-button {
	position: relative;
	cursor: pointer;
	overflow: hidden;
}
</style>
