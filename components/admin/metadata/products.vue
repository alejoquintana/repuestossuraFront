<template>
    <div class="fc">
        <div>
            <div class="d-flex align-center justify-end" v-if="totalPages > 1">
               <v-pagination
                :prev-icon="$accessor.mdicons.mdicons.mdiChevronLeft"
                :next-icon="$accessor.mdicons.mdicons.mdiChevronRight"
                v-model="page"
                :length="totalPages"
                circle
                />
            </div>
            <v-row>
                <v-col cols="4">
                    <v-select label="VER CATEGORIA" :items="categories" item-text="name" item-value="id" v-model="selectedCategory" @change="setSelectedCategory"/>
                </v-col>
                <v-col cols="4">
                   <v-text-field v-model.lazy="searchTerm" @change="setSearchTerm" label="BUSCAR" :append-icon="$accessor.mdicons.mdicons.mdiTextSearch"></v-text-field>
                </v-col>
             </v-row>

            <div class="fc" v-if="products">
                <productRow v-for="product in products" :key="product.id" :product="product"></productRow>
            </div>
        </div>
        <v-pagination v-if="totalPages > 1"
                :prev-icon="$accessor.mdicons.mdicons.mdiChevronLeft"
                :next-icon="$accessor.mdicons.mdicons.mdiChevronRight"
                v-model="page"
                :length="totalPages"
                circle
        />

    </div>
</template>

<script>

import productRow from './meta.product.row'
export default {
    components:{productRow},
    data() {
        return {
            showCreate:false,
            page:1,
            searchTerm:'',
            selectedCategory:null,
        }
    },
    computed:{
        pagination(){
            return this.$accessor.products.pagination
        },
        currentPage(){
            return this.$accessor.products.getCurrentPage
        },
        totalPages(){
            if(!this.pagination || !this.pagination.last_page)return 1;
            return this.pagination.last_page
        },
        categories(){
            return this.$accessor.categories.categories;
        },
        products(){
            return this.$accessor.products.getProducts
        }
    },
    methods:{
        setSearchTerm(){
            //console.log('set search term ',this.searchTerm)
            this.selectedCategory=null;
            this.$accessor.products.setSelectedCategory(null)
            this.$accessor.products.setSearchTerm(this.searchTerm)
            this.page=1;
            this.$accessor.products.setCurrentPage(1);
            this.$accessor.products.fetchProducts();
        },
        setPage(page){
            //console.log('setPage',page)
            this.$accessor.products.setCurrentPage(page);
            this.$accessor.products.fetchProducts();
        },
        setSelectedCategory(){
            this.searchTerm = ''
            this.$accessor.products.setSearchTerm('')
            this.page=1;
            this.$accessor.products.setCurrentPage(1);

            this.$accessor.products.setSelectedCategory(this.selectedCategory)
            this.$accessor.products.fetchProducts();
        },
        closeModal(){
            this.showCreate = false;
            this.$accessor.products.fetchProducts();
        }
    },
    async mounted(){
        this.$accessor.setLoading(true)
        this.$accessor.products.setCurrentPage(1)
        this.$accessor.products.setSearchTerm('')
        this.$accessor.products.setSelectedCategory(null)
        await this.$accessor.categories.fetchCategories();
        await this.$accessor.products.fetchProducts();
        this.$accessor.setLoading(false)
    },
    watch:{
      page(){
           this.$accessor.products.setCurrentPage(this.page)
           this.$accessor.products.fetchProducts()
      }
    }
}
</script>

<style lang="scss" scoped>
    .page-square{
        display:flex;
        width:40px;
        height:40px;
        justify-content: center;
        align-items: center;
        border:1px solid #000;
        background-color: purple;
        color:#fff;
        cursor:pointer;
        &.selected{
            background-color: blue;
        }
    }
</style>
