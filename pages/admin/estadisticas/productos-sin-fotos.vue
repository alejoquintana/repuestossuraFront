<template>
    <div>
        <pageComponent></pageComponent>
    </div>
</template>

<script>
import pageComponent from '@/components/admin/estadisticas/products-no-photos.vue'
export default {
    components:{pageComponent},
    layout:'admin',
    middleware:'checkAdmin' 
}
</script>