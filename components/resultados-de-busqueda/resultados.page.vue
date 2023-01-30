<template>
  <div>
      <div v-if="!searchTerm">
        <h1> No hay resultados para: {{searchTerm}} </h1>
        <v-btn nuxt to="/cotizador">Ver todos los productos</v-btn>
      </div>
      <div v-if="searchTerm">
          <h1>
            Resultados de busqueda para: "{{this.searchTerm}}"
          </h1>
          <v-container>
            <v-row>
              <v-col cols="12" lg="4" v-for="result in searchResults" :key="result.id">
                <productCard :product="result"/>
              </v-col>
            </v-row>
          </v-container>
        <!-- <div>
          <h1>No se encontraron resultados: "{{this.getSearchTerm}}"</h1>
          <v-btn nuxt to="/cotizador">Ver todos los productos</v-btn>
        </div> -->
      </div>
      
  </div>
</template>

<script>
import productCard from '@/components/product/card.product.vue'
/* export default {
    computed : {
        searchTerm(){
            return this.$route.query.term;
        },
        categories(){
            return this.$store.getters['categories/getCategories'];
        },
        products(){
            var vm =this;
            if(!this.searchTerm)return [];
            let searchTerm = this.searchTerm.toUpperCase().trim();
            let terms = vm.searchTerm.split(' ');
            let res = [];
            let allProducts = this.$store.getters['products/getProducts'];
            allProducts.forEach(prod => {
                let productName = prod.name.toString().toUpperCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                let addtores = true;
                
                terms.forEach(term => {
                    
                    term = term.toUpperCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                    let lastChar = term[term.length -1];
                    if (lastChar == 'S')
                    {
                        term = term.substring(0, term.length-1);
                    }
                    lastChar = term[term.length -1];
                    if (lastChar == 'E')
                    {
                        term = term.substring(0, term.length-1);
                    }
                    if ( !productName.includes(term) ){
                        addtores=false;
                    } 
                        
                });
                if (addtores){
                    res.push(prod)
                }
            });                
            return res;    
        },
    },
} */

export default {
  components:{productCard},
  computed:{
    searchTerm(){
      return this.$route.query.term
    },
    searchResults(){
        let res = []
        this.products.forEach(product => {
            if ( this.compatibleSearch(product.name) ){
                res.push(product)
            }
        });
        return res
    },
    products(){
        return this.$accessor.products.getProducts
    }
  },
  methods:{
    compatibleSearch(searchString){ 
        let searchTerm = this.searchTerm.toUpperCase();
        searchString = searchString.toUpperCase();
        searchString = searchString.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        let terms = searchTerm.split(' ');
        let res = true
        
        terms.forEach(term => {
            term = term.toUpperCase()
            term = term.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            let lastChar = term[term.length - 1]
            if (lastChar == 'S') {
                term = term.substring(0, term.length - 1)
            }
            if (lastChar == 'E') {
                term = term.substring(0, term.length - 1)
            }
            if (!searchString.includes(term)) {
                res = false
            }
        });
        return res
    }, 
  }
}
</script>
