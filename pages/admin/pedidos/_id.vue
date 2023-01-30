<template>
    <page-component></page-component>
</template>


<script>
import pageComponent from '@/components/admin/orders/log-editions.vue';
export default {
    name:'log_edited_order-admin',
    components:{pageComponent},
    layout:'admin',
    middleware:'checkAdmin',
    async mounted () {
        let order_id = this.$route.params.id;
        await this.$accessor.orders.fetchFullOrder(order_id)
        await this.$accessor.orders.fetchEditedOrderItem(order_id)
    }
}
</script>

<style lang="scss" scoped>
</style>