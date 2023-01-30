<template>
    <div>
        <pageComponent></pageComponent>
    </div>
</template>

<script>
import pageComponent from '@/components/admin/configuraciones/sucursales/sucursales.vue'
export default {
    components:{pageComponent},
    layout:'admin',
    middleware:'checkAdmin'
}
</script>
