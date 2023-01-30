<template>
<div>
    <monthly v-if="isSuper" />
    <div class="mt-4">
        <list></list>
    </div>
</div>  
</template>

<script>
import list from './list.vue'
import monthly from './monthly.vue'
export default {
    components:{monthly,list},
    computed:{
        isSuper(){
            return (this.user.role_id == 1 );
        },
        user(){
            return this.$auth.user
        },
    }
}
</script>
