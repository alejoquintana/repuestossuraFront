<template>
  <pageComponent />
</template>

<script>
import pageMetaMixin from '@/mixins/pageMetaMixin'
import pageComponent from '@/components/encontrar-repuesto/Encontrar-repuesto.page.vue'
export default {
    layout:'categories',
    name:'encontrar-repuesto-page',
    components:{pageComponent},
    mixins:[pageMetaMixin]
}
</script>
