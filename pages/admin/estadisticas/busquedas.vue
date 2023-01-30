<template>
    <div>
        <pageComponent></pageComponent>
    </div>
</template>

<script>
import pageComponent from '@/components/admin/estadisticas/busquedas.vue'
export default {
    components:{pageComponent},
    layout:'admin',
    middleware:'checkAdmin' 
}
</script>