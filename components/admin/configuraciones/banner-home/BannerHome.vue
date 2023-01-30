<template>
    <div>
        <v-row>
            <v-col cols="6" v-for="opt in selectOptions" :key="opt.code">
                <v-btn block :color="opt.code === selected_code ? 'info' : ''" @click="setSelectedCode(opt.code)">
                    {{opt.name}}
                </v-btn>
            </v-col>
        </v-row>
        <div class="text-center">
            <span class="dark-text">{{selected_code == "_wide" ? '1280px':'660px'}} X N</span>
        </div>
        <div v-for="appImageCode in appImageCodes" :key="appImageCode">
            <app-image-upload :code="appImageCode+selected_code" @fetch="fetch" />
        </div>
    </div>
</template>

<script>
import uploadImage from '@/components/common/canvas-upload.vue'
import appImageUpload from './appimage-upload.vue'
export default {
	components: {
		uploadImage,
		appImageUpload
	},
	data() {
		return {
			image: null,
			selected_code: '_wide',
			selectOptions: [{
					name: 'BANNER PC',
					code: '_wide'
				},
				{
					name: 'BANNER MOBILE',
					code: '_mobile'
				}
			],
			appImageCodes: [
				'banner_home',
			]
		}
	},
	computed: {
		selectedObj() {
			if (!this.bannerWide || !this.bannerMobile) return;
			if (!this.selectedProp) return;
			return this[this.selectedProp]
		},
		selectedProp() {
			if (this.selected_code === 'banner_home_mobile') return 'bannerMobile'
			if (this.selected_code === 'banner_home_wide') return 'bannerWide'
		},
		appImages() {
			return this.$accessor.appImages.getAppImages
		},
		bannerWide() {
			if (!this.appImages) return;
			return this.appImages.find(image => {
				return image.code == 'banner_home_wide'
			})
		},
		bannerMobile() {
			if (!this.appImages) return;
			return this.appImages.find(image => {
				return image.code == 'banner_home_mobile'
			})
		}
	},
	methods: {
		async uploadImage() {
			this.$accessor.setLoading(true)
			let fdata = new FormData();
			fdata.append('id', this.selectedObj.id);
			fdata.append('image', this.image);
			await this.$accessor.appImages.upload(fdata);
			await this.$accessor.appImages.fetchAppImages();
			this.resetImage();
			this.$accessor.setLoading(false)
			this.$router.go();
		},
		setImage(event) {
			this.image = event;
		},
		resetImage() {
			this.image = null;
		},
		toggle(field) {
			if (!this.selectedObj) return;
			let data = {
				id: this.selectedObj.id,
				field: field,
				value: this.selectedObj[field] ? 0 : 1
			}
			this.$accessor.appImages.update(data);
		},
		saveChange(field, value) {
			this.$accessor.appImages.update({
				id: this.selectedObj.id,
				field,
				value
			})
		},
		setSelectedCode(code) {
			this.resetImage();
			this.selected_code = code;
		},
		getComputed(prop) {
			return this[prop];
		},
		async banner_home_init() {
			/* ESTA FUNCION DEBERIA EJECUTARSE SOLO LA PRIMERA VEZ, PARA CREAR LOS OBJETOS EN LA BASE DE DATOS */
			if (this.bannerMobile || this.bannerWide) return;
			let data = {
				code: 'banner_home_wide',
				name: 'banner home wide',
				paused: 1,
				all_pages: 0
			}
			await this.$accessor.appImages.create(data);
			data = {
				code: 'banner_home_mobile',
				name: 'banner home mobile',
				paused: 1,
				all_pages: 0
			}
			await this.$accessor.appImages.create(data);

			await this.$accessor.appImages.fetchAppImages();
		},
		async fetch() {
			await this.$accessor.appImages.fetchAppImages();
		}
	},
	async mounted() {
		var vm = this;
		await this.fetch();
		setTimeout(() => {
			if (!vm.bannerWide && !vm.bannerMobile) {
				//console.log('banner init')
				vm.banner_home_init()
			}
		}, 1000);
	}
}
</script>
