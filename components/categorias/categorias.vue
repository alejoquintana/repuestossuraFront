<template>
  <div class="fc">
      <v-row>
          <v-col cols="12" lg="4" v-for="category in categories " :key="category.id">
            <div>
                <card :category="category"/>
            </div>
          </v-col>
      </v-row>
  </div>
</template>

<script>
import card from './categorias.card.vue'
export default {
    components:{card},
    computed:{
        categories(){
            return this.$accessor.categories.getNotPausedCategories
        },
    },
    methods:{

    }
}
</script>
