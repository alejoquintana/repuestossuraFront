<template>
    <div>
        <categoryPageComponent :category="$accessor.categories.otrosProductos" />
    </div>
</template>

<script>
import pageMetaMixin from '@/mixins/pageMetaMixin'

import categoryPageComponent from '@/components/otros-productos/otros-productos.page.vue'

export default {
    layout:'categories',
    name:'otros-productos-page',
    components:{categoryPageComponent},
    mixins:[pageMetaMixin] 
}
</script>
