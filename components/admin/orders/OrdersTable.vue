<template>
    <div class="table-container" @scroll="onScroll">
        <v-simple-table class="table table-striped table-hover">
            <template v-slot:default>
                <tbody>
                    <tr>
                        <td colspan="3">
                            <input type="text" class="form-control" v-model="searchTerm" @keydown="debounceHandleSearch" >
                        </td>
                    </tr>
                    <tr>
                        <td colspan="3">
                        <select v-model="retiro_id" class="form-control" @change="setRetiro">
                            <option :value="0">
                                TODO
                            </option>
                            <option :value="opt.id" v-for="opt in retiro_options" :key="opt.code">
                                {{opt.name}}
                            </option>
                        </select>
                        </td>
                    </tr>
                    <tr  v-for="order in orders"
                            :key="'order'+order.id"
                            @click ="setSelectedOrder(order)"
                            style="cursor:pointer"
                            :class="{'selected' : selected && order.id == selected.id}">
                        <td>
                            <span class="text-secondary">#{{order.id}}</span>
                            <br>
                            {{order.created_at | datetime}}
                        </td>
                        <td>
                            <span class="id-pill" v-if="order.user">#{{order.user.id}} <br> </span>
                            <span v-if="order.user"> <b> {{order.user.name}} </b></span>
                            <span v-if="showOrderName(order)"> <br> {{order.name}}</span>
                        </td>
                        <td>
                            <input v-if="order.status!='cancelado'" type="checkbox" v-model="order.viewed" @change="viewed(order)"  class="form-control checkbox">
                            <span v-if="order.status=='cancelado'" class="fa fa-check"></span>
                        </td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>




    </div>
</template>

<script>
import debounce from 'v-debounce'
export default {
    directives:{debounce},

    data(){
        return {
            timer:null,
            fetching:false,
            retiro_id : 0,
            searchTerm:'',
            canceledLoaded:false,
            filtered : [],
            selected : null,
        }
    },
    methods : {
        debounceHandleSearch(){
            if(this.timer){
                clearTimeout(this.timer);
            }
            this.timer = setTimeout(() => {
                this.handleSearch();
            }, 1000);
        },
        async onScroll(e, p) {
            if(this.fetching)return;
            if(!this.nextPageUrl)return
            let el = e.target;
            if(e.target.scrollTop + 100 > e.target.scrollHeight - e.target.clientHeight) {
                this.fetching = true;
                await this.loadMore();
                this.fetching = false;
            }
        },

        async handleSearch(){
            var vm = this;
            if(vm.fetching)return;
            vm.fetching = true;
            vm.$accessor.orders.setSearchTerm(vm.searchTerm)
            await vm.$accessor.orders.fetchOrders();
            vm.fetching = false
        },
        async loadMore(){
            await this.$accessor.orders.fetchMoreOrders(this.nextPageUrl);
        },
        setRetiro(){
            this.$accessor.orders.setRetiro(this.retiro_id);
            this.$accessor.orders.fetchOrders();
        },
        showOrderName(order){
            if(!order.user)return true;
            let orderUser = order.user;
            if( ( orderUser.role_id <= 2 || orderUser.seller ) && order.name){
                return true;
            }
            return false;
        },
        setSelectedOrder(order){
            this.selected=order;
            this.$emit('selectedOrder',order);
        },
        viewed(order){
            order.viewed = order.viewed ? 1 : 0;
            order.status = order.viewed ? 'visto' : 'nuevo';
            let data = {
                order:order.id,
                id: order.id,
                field: 'viewed',
                value: order.viewed
            }
            this.$axios.put('/order',data);
        },




    },
    mounted(){
        this.$accessor.retiroOptions.fetchRetiroOptions()
    },
    computed : {
        nextPageUrl(){
            return this.$accessor.orders.nextPageUrl
        },
        retiro_options(){
            return this.$accessor.retiroOptions.getRetiroOptions;
        },
        orders(){
            return this.$accessor.orders.getOrders;
        }
    },



}
</script>

<style lang="scss" scoped>
.selected{
    background-color:#0000ff66 !important;
    font-weight: bold;
}
.checkbox{
    width: 30px;
    height: 20px;
}
    .cursor-pointer {
        cursor: pointer;
    }

 .table-container{
       height: 75vh;
       scroll-behavior: auto;
       overflow-x: hidden;
       overflow-y: auto;
   }

</style>
