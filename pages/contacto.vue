<template>
    <div>
        <pageComponent/>
    </div>
</template>

<script>
import pageMetaMixin from '@/mixins/pageMetaMixin'

import pageComponent from '@/components/contacto/Contacto.vue'
export default {
    layout:'categories',
    name:'contacto-page',
    components:{pageComponent},
    mixins:[pageMetaMixin]
   
}
</script>
