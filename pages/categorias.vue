<template>
  <pageComponent />
</template>

<script>
import pageMetaMixin from '@/mixins/pageMetaMixin'
import pageComponent from '@/components/categorias/categorias.vue'
export default {
    layout:'categories',
    name:'categorias-page',
    components:{pageComponent},
    mixins:[pageMetaMixin]

}
</script>
