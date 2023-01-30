<template>
    <div>
       admin
    </div>
</template>

<script>
import pageComponent from '@/components/admin/configuraciones/Configuraciones.vue'
export default {
    components:{pageComponent},
    layout:'admin',
    middleware:'checkAdmin' 
}
</script>