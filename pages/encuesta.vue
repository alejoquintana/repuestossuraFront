<template>
  <pageComponent />
</template>

<script>
import pageMetaMixin from '@/mixins/pageMetaMixin'
import pageComponent from '@/components/encuesta/Encuesta.page.vue'
export default {
    layout:'categories',
    name:'encuesta-page',
    components:{pageComponent},
    mixins:[pageMetaMixin]
}
</script>
