<template>
    <div>
        <pageComponent></pageComponent>
    </div>
</template>

<script>
import pageComponent from '@/components/admin/productos/ImportProducts.vue'
export default {
    components:{pageComponent},
    layout:'admin',
    middleware:'checkAdmin'
}
</script>
