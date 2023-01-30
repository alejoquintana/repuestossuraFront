<template>
	<div class="d-flex">
		<img  :src="$accessor.helpers.imagePath(appImages[0])" class="home-img" />
	</div>
</template>

<script>
export default {
	data(){
		return{
		}
	},
	computed:{
		appImages() {
			let code = 'banner_home';
			code = `${code}${this.$mq == 'lg' ? '_wide' : '_mobile'}`;
			return this.$accessor.appImages.getByCodeNotPaused(code)
		},
	},
}
</script>

<style lang="scss" scoped>
.home-img{
	width:100%;
}
.border{
	border: 2px solid $blue;
	color: $blue;
}
select{
	color: $blue;
}
.prepend-icon{
	background: $gray;
	height: 100%;
	aspect-ratio: 1;
	font-size: 24px;
	font-weight: bold;
}
</style>
