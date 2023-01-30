<template>
    <div class="fc">
       <div>
           <selector  class="mb-4" @statusChanged="statusChanged" :status="status"></selector>
       </div>
        <v-row>
            <v-col cols="4">
               <ordersTable :tableOrders="orders"  @selectedOrder="setSelected"></ordersTable>
            </v-col>
            <v-col cols="8" class="white mt-4">
                <app-order
                        v-if="selectedOrder" @updateOrderStatus="updateOrderStatus" :order_id="selectedOrder.id" :key="selectedOrder.id">
                </app-order>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import ordersTable from  './OrdersTable.vue';
import selector from  './selector.vue';
import appOrder from './Order.vue';
export default {
     metaInfo(){return{
        title: 'ADMIN'   }},

    components: {
        appOrder,
        ordersTable,
        selector
    },
    data(){
        return {
            searchTerm:'',
            canceledLoaded:false,
            filtered : [],
            selectedOrder : null,
        }
    },
    mounted(){
        this.loadOrders();
        this.$accessor.states.fetchStates();
    },
    methods : {
        updateOrderStatus(e)
        {
            if(this.selectedOrder)
            {
                this.selectedOrder.status = e;
                this.viewed=1;
            }
        },
        setSelected(event){
            this.selectedOrder=event;
        },
        viewed(order){
            if (order.viewed)
            {
                order.viewed = 1;
            }else { order.viewed = 0;}
            let data = {
                order:order.id,
                id: order.id,
                field: 'viewed',
                value: order.viewed
            }
            this.$axios.put('/order',data);
        },
        async statusChanged(event){
           this.$accessor.orders.setStatus(event);
           await this.$accessor.orders.fetchOrders();
        },
        async loadOrders()
        {
            this.$accessor.setLoading(true);
            await this.$accessor.orders.fetchOrders();
            this.$accessor.setLoading(false);
        },
    },
    computed : {
        status(){
            return this.$accessor.orders.getStatus
        },
        orders(){
            return this.$accessor.orders.getOrders
        },
    },



}
</script>

<style lang="scss" scoped>
.checkbox{
    width: 30px;
    height: 20px;
}
    .cursor-pointer {
        cursor: pointer;
    }

 .table-container{
       height: 85vh;
       scroll-behavior: auto;
       overflow-x: hidden;
       overflow-y: auto;
   }

</style>
