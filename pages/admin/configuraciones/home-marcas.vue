<template>
    <div>
        <pageComponent></pageComponent>
    </div>
</template>

<script>
import pageComponent from '@/components/admin/configuraciones/home-marcas/HomeMarcas.vue'
export default {
    components:{pageComponent},
    layout:'admin',
    middleware:'checkAdmin' 
}
</script>