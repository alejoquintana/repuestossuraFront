<template>
	<find-product />
</template>

<script>
import card from './card.category.panel.vue'
import findProduct from '@/components/home/Find.Product.vue'
export default {
    components:{card,findProduct},
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

</style>
