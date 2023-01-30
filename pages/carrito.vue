<template>
  <pageComponent />
</template>

<script>
import pageMetaMixin from '@/mixins/pageMetaMixin'
import pageComponent from '@/components/carrito/Carrito.page.vue'
export default {
    layout:'categories',
    name:'carrito-page',
    components:{pageComponent},
    mixins:[pageMetaMixin]
}
</script>
