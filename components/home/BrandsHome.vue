<template>
	<div class="mb-8">
		<v-row v-if="appImages && appImages.length > 0" justify="center">
			<v-col cols="2" v-for="appImg in appImages" :key="appImg.id">
				<v-img :src="$accessor.helpers.imagePath(appImg.url)"
				class="w-75" />
			</v-col>
		</v-row>
	</div>
</template>

<script>
export default {
	data() {
		return {
			model: 0,
			sum: 0
		}
	},
	methods: {
		isNuxtLink(link) {
			return link.includes('repuestossura.com') || link[0] == '/'
		},
	},
	computed: {
		appImages() {
			let code = 'home_brand' ;
			return this.$accessor.appImages.getByCodeNotPaused(code)
		},
		items() {
			if (this.appImages.length < 6) {
				return this.appImages.length
			}
			return 8
		},
		CarouselHeight() {
			let windowWidth = 0;
			if (process.client) {
				windowWidth = window.innerWidth
			}
			let percentage = this.$mq == 'lg' ? 80 : 90;
			let relAspect = this.$mq == 'lg' ? 3 : 2;
			return (windowWidth * percentage / 100) / relAspect
		}
	},
	mounted(){
		setInterval(() => {
			this.sum++
		}, 5000);
	}
}
</script>

<style scoped lang="scss">

</style>
