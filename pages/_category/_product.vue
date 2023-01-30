<template>
    <div>
        <div v-if="configs">
            <productPageComponent :product="product"/>
        </div>
    </div>
</template>

<script>
import categoryPageComponent from '@/components/category/Category.page.vue'
import productPageComponent from '@/components/product/Product.page.vue'
export default {
	layout: 'categories',
	name: 'tier2-page',
	components: {
		categoryPageComponent,
		productPageComponent
	},
	data(){
		return{
			fetched:false
		}
	},
	head() {
		let canonical = 'https://repuestossura.com' + this.$route.path;
		return {
			link: [{
				rel: 'canonical',
				href: canonical
			}],
			titleTemplate: this.metatitle,
			meta: [{
				name: 'description',
				content: this.metadescription,
				hid: 'description'
			}]
		}
	},
	computed: {
		configs() {
			return this.$accessor.configs.getConfigs
		},
		categories() {
			return this.$accessor.categories.getCategories
		},
		products() {
			return this.$accessor.products.getProducts
		},
		category() {
			if (!this.configs) return;
			let routeParam = this.cleanSlug(this.$route.params.category);
			if (!routeParam) return;
			return this.categories.find(c => {
				return this.cleanSlug(c.slug) === this.cleanSlug(routeParam)
			})
		},
		product() {
			if (!this.configs) return;
			let routeParam = this.cleanSlug(this.$route.params.product);
			if (!routeParam) return;
			return this.products.find(c => {
				return this.cleanSlug(c.slug) === this.cleanSlug(routeParam)
			})
		},
		selectedObj() {
			if (!this.configs) return;
			return this.product
		},
		metatitle() {
			if (!this.selectedObj) return this.$accessor.configs.siteName
			if (!this.selectedObj.metatitle) return this.selectedObj.name + ' por mayor';
			return this.selectedObj.metatitle;
		},
		metadescription() {
			if (!this.selectedObj) return this.metatitle
			if (!this.selectedObj.description) return this.metatitle
			if (!this.selectedObj.metadescription) return this.selectedObj.description
			return this.selectedObj.metadescription
		}
	},
	methods: {
		async doFetch(){
			if(this.category && this.category.id)await this.$accessor.products.fetchCategoryProducts(this.category.id)
			this.fetched =true
		},
		cleanSlug(string) {
			if (!string) return ''
			let res = string;
			res = res.trim();
			res = res.replace('/', '');
			res = res.toUpperCase();
			return res;
		}
	},
	async serverPrefetch(){
		await this.doFetch()
	},
	mounted() {
		this.doFetch()
	},
}
</script>
