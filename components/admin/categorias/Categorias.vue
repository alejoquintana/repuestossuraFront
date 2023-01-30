<template>
	<v-row class="mt-4 ma-0" justify="space-between" align="center">
		<v-col cols="12" lg="8">
			<h1>Rubros</h1>
		</v-col>
		<v-col cols="12" lg="2">
			<v-btn block depressed color="info" @click="showCreate=true">CREAR RUBRO</v-btn>
		</v-col>
		<v-col cols="12" lg="2">
			<v-btn block depressed color="success" to="/admin/rubros/importar">IMPORTAR .CSV</v-btn>
		</v-col>
		<v-col cols="12" lg="12">
			<categoryRow v-for="category in categories" :key="category.id" :category="category" />
		</v-col>
		<modal @close="closeModal()" v-if="showCreate" >
			<createCategory @close="closeModal" />
		</modal>
	</v-row>
</template>

<script>

import categoryRow from './category.row'
import modal from '@/components/common/Modal'
import createCategory from './create.category'
export default {
    components:{createCategory,modal,categoryRow},
    data() {
        return {
            showCreate:false
        }
    },
    computed:{
        configs(){
            return this.$accessor.configs.getConfigs
        },
        categories(){
            return this.$accessor.categories.getCategories
        }
    },
    methods:{

        closeModal(){
            this.showCreate = false;
        }
    },
    async mounted(){
        this.$accessor.setLoading(true)
        await this.$accessor.categories.fetchCategories();
        this.$accessor.setLoading(false)
    }
}
</script>
