<template>
	<div>
		<div class="primary white--text bold t20 pa-4">CATEGORIAS</div>
		<v-row v-if="list" justify="start" class="mt-3">
			<v-col cols="6" lg="3" class="border-red"  v-for="item in list" :key="item.id">
				<nuxt-link color="primary" :to="item.slug" class="footer-link mt-2"   >
					{{item.name.trim()}}
				</nuxt-link>
			</v-col>
		</v-row>
	</div>
</template>

<script>
export default {
	computed:{
		list(){
			return this.$accessor.categories.getListForMenues
		},
	},
	mounted(){
		this.$accessor.categories.fetchNotPausedCategories
	},
}
</script>

<style lang="scss" scoped>
.border-red{
	border-left: 2px solid $red;
}
.footer-link{
	color: $blue;
	word-wrap: break-word;
}
</style>
