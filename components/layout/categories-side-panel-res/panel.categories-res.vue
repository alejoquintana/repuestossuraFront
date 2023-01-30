<template>
  <div class="fc contenedor">
      <div v-for="item in list " :key="item.id">
          <card :category="item" />
      </div>
  </div>
</template>

<script>
import card from './card.category.panel.vue'
export default {
    components:{card},
    computed:{

        list(){
          return this.$accessor.categories.getListForMenues
        },
    },
    methods:{
    }
}
</script>

<style lang="scss" scoped>
.contenedor{
        border-bottom: 2px solid $tertiary;
    }
</style>
