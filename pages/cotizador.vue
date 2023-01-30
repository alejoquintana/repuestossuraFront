<template>
<div>
    <pageComponent />
</div>
</template>

<script>
import pageMetaMixin from '@/mixins/pageMetaMixin'

import pageComponent from '@/components/cotizador/Cotizador.page.vue'
export default {
    components:{pageComponent},
    layout:'categories',
    name:'cotizador-page',
    mixins:[pageMetaMixin]
}
</script>
