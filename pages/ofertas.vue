<template>
    <div>
        <pageComponent />
    </div>
</template>

<script>
import pageMetaMixin from '@/mixins/pageMetaMixin'

import pageComponent from '@/components/ofertas/Ofertas.page.vue'
export default {
    layout:'categories',
    name:'ofertas-page',
    components:{pageComponent},
    mixins:[pageMetaMixin] 
}
</script>
