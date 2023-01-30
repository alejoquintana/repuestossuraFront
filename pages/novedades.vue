<template>
    <div>
        <pageComponent/>
    </div>
</template>

<script>
import pageMetaMixin from '@/mixins/pageMetaMixin'

import pageComponent from '@/components/novedades/novedades.page.vue'
export default {
    layout:'categories',
    name:'novedades-page',
    components:{pageComponent},
    mixins:[pageMetaMixin]
   
}
</script>
