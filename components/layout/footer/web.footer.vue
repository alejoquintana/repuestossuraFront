<template>
	<div>
		<v-row justify="end" align="center">
			<v-col cols="3">
				<nuxt-link to="/">
					<v-img :src="$accessor.helpers.largeLogo" contain />
				</nuxt-link>
			</v-col>
			<v-col cols="4">
				<p class="text-safe mb-0">
					COMPRA SEGURO<br>30 AÑOS EN EL RUBRO
				</p>
			</v-col>
			<v-col cols="5">
				<navItems footer />
			</v-col>
			<v-col cols="12" v-if="categories.length">
				<categories />
			</v-col>
		</v-row>
	</div>
</template>

<script>
import navItems from '../commons/nav-items.vue'
import categories from './categories.footer.vue'
import logo from './logo.footer.vue'
export default {
    components:{logo,categories,navItems},
	 computed:{
		categories(){
            return this.$accessor.categories.getListForMenues
        }
	 }
}
</script>
<style lang="scss" scoped>
	.text-safe{
		color: $blue;
		font-size: 22px;
		font-weight: bold;
	}
</style>
