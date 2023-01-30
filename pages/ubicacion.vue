<template>
    <div>
        <pageComponent/>
    </div>
</template>

<script>
import pageMetaMixin from '@/mixins/pageMetaMixin'

import pageComponent from '@/components/ubicacion/Ubicacion.vue'
export default {
    layout:'default',
    name:'donde-estamos-page',
    components:{pageComponent},
    mixins:[pageMetaMixin]

}
</script>
