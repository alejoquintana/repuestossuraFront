<template>
<div>
    <div class="fc border border-primary p-3 mt-3" v-if="order">
        <v-row justify="space-between">
            <v-col cols="2" class="d-flex justify-end">
                <v-btn link color="primary" block  target="_blank"
                :href="`${backendpath}/pdf-original/${user.reg_verif_code}/${order.id}`" >
                    <v-icon class="mr-2">{{$accessor.mdicons.mdicons.mdiFilePdf}}</v-icon>
                    PDF
                </v-btn>
            </v-col>    
        </v-row>
        <v-row>
            <v-col cols="6" lg="4">
                <span>
                    DESCUENTO APLICADO {{order.discount}}%
                </span>
            </v-col>
            <v-col cols="6" lg="2" >
                <v-btn color="info" @click="showDiscountModal=true" >
                    CAMBIAR DESCUENTO
                </v-btn>
            </v-col>
        </v-row>
        <v-row class="mt-3 mb-3">
            <v-col cols="3" v-for="opt in status_options" :key="opt.name"
                v-if="order.status != opt.name" >
                <v-btn block :color="opt.color" dark @click="setStatus(opt.name)" outlined>
                    <v-icon class="mr-2">{{$accessor.mdicons.mdicons[opt.icon]}}</v-icon>
                    {{opt.name | uc}}
                </v-btn>
            </v-col>
        </v-row>

        <div>
            <div>
                <span class="font-weight-bold text-primary">Fecha: {{order.created_at | datetime}} </span> <br>
                <span v-if="order.comments"
                        class="mt-2"> -- {{order.comments}} -- </span>
            </div>
            <div class="order-table-container">
                <v-simple-table>
                    <template class="table table-striped table-bordered mt-3">
                        <thead>
                            <tr>
                                <th>Codigo</th>
                                <th>Producto</th>
                                <th>Precio</th>
                                <th>Cantidad</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="op in order_items"
                                :key="'op'+op.id">
                                <td> {{op.code}}</td>
                                <td> {{op.name}} </td>
                                <td> ${{getPrice(op.price) | price}} </td>
                                <td> {{op.units}} </td>
                                <td> ${{op.units * getPrice(op.price) | price}} </td>
                            </tr>

                        </tbody>
                        <tfoot>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td style="color : blue">TOTAL</td>
                                <td style="color : blue"> ${{total | price}} </td>
                                </tr>
                        </tfoot>
                </template>
                </v-simple-table>
            </div>
        </div>
        <div>
                <ul>
                    <li v-if="order.user">
                        <span>Usuario:</span>
                        <span class="id-pill">{{order.user.id}}</span>
                        <span><b>{{order.user.name}}</b></span>
                        <div class="fcc">
                            <span v-if="order.user.phone">Telefono: {{order.user.phone}} </span>
                            <span v-if="order.user.email">Email: {{order.user.email}} </span>
                        </div>
                    </li>
                    <li v-if="showOrderName()">Cliente: {{order.client}} </li>
                    <li v-if="order.message">Mensaje adjunto: {{order.message}} </li>
                </ul>
                <div>
                  <!--   <h4 v-if="shipping">  <v-icon>{{$accessor.mdicons.mdicons.mdiTruck}}</v-icon> Datos de envío</h4> -->
                    <ul>
                        <li v-if="state">  Provincia: {{state.name}}</li>
                        <li v-if="city"> Ciudad: {{city.name}} </li>
                        <li v-if="shipping"> CP: {{order.cp}}  </li>
                        <li v-if="shipping"> Direccion: {{order.address}} </li>
                     <!--    <li v-if="shipping">Transporte: {{order.transport}}  </li> -->
                    </ul>
                </div>
        </div>
    </div>
    <div v-if="showDiscountModal">
        <modal @close="showDiscountModal=false">
            <div class="fcc">
                <h3>PEDIDO DE {{order.user.id}} - {{order.user.name |uc}}</h3>
                <span class="mt-4">
                    DESCUENTO APLICADO {{order.discount}}%
                </span>
                <span>
                    TOTAL ACTUAL ${{total | price}}
                </span>
                <div class="mt-4">
                    <v-text-field type="number" placeholder="NUEVO DESCUENTO" v-model="newDiscount">
                    </v-text-field>
                </div>
                <span v-if="newTotal && newTotal>0">NUEVO TOTAL  : ${{newTotal | price}}</span>
                <v-btn @click="saveNewDiscount" color="primary" :disabled="!(newTotal>0)">
                    GUARDAR
                </v-btn>
            </div>
            <hr>
            
        </modal>
    </div>
    <div v-if="!order">CARGANDO...</div>
</div>
</template>

<script>
import modal from '@/components/common/Modal.vue'
export default {
    components:{modal},
    props : ['order_id'],
    data(){
        return{
            newDiscount:'',
            showDiscountModal:false,
            order:null,
            order_items: null,
            status_options:[
                {name:'nuevo',color:'warning',icon:'mdiClock'},
                {name:'visto',color:'primary',icon:'mdiClock'},
                {name:'pagado',color:'success',icon:'mdiCurrencyUsd'},
                {name:'enviado',color:'info',icon:'mdiTruck'},
                {name:'cancelado',color:'error',icon:'mdiCloseThick'},
            ]
        }
    },
    async mounted(){
       await this.$accessor.orders.fetchFullOrder(this.order_id)
       this.order = this.fullorder.order
       this.order_items = this.fullorder.order_items
    },
    methods : {
        saveNewDiscount(){
            this.order.discount = this.newDiscount;
            this.showDiscountModal  = false;
            this.$accessor.orders.update({
                order:this.order.id,
                id:this.order.id,
                field:'discount',
                value:this.order.discount
            })
        },
        getPrice(price){
            return price - ( price * (this.order.discount/100) ) 
        },
        showOrderName(){
            let order = this.order;
            if(!order.user)return true;
            let orderUser = order.user;
            if( ( orderUser.role_id <= 2 || orderUser.seller )&& order.client) return true;
            return false;
        },
        editOrderItems(){
            this.$accessor.shop.editMode({order_info:this.order,order_items: this.order_items})
            this.$router.push('/carrito');
        },
        setStatus(status){
            var vm = this;
            this.order.status = status;
            var data = {
                order : this.order.id,
                field : 'status',
                value : status
            }
            this.$axios.put('/order',data)
                .then((response) => {
                    vm.$emit('updateOrderStatus',status);
                })
        },
    },
    computed : {
        user(){
            return this.$auth.user
        },
        fullorder(){
            return this.$accessor.orders.getOrder
        },
        shipping(){
            return  this.order.retiro_id === 1 ;
        },
        newTotal(){
            if(!this.newDiscount)return 'ERROR'
            this.newDiscount = parseInt(this.newDiscount) 
            if( !(this.newDiscount  > 0) ) return 'ERROR'
            var tot = 0;
            if (this.order && this.order_items && this.order_items.length > 0){
                this.order_items.forEach(op => {
                    let newPrice = op.price - ( op.price * (this.newDiscount/100) ) 
                    tot+= ( newPrice * op.units);
                });
            }
            return tot;            
        },
        total(){

            var tot = 0;
            if (this.order && this.order_items && this.order_items.length > 0){
                this.order_items.forEach(op => {
                    tot+= (this.getPrice(op.price) * op.units);
                });
            }

            return tot;
        },
        states(){
            return this.$accessor.states.getStates;
        },
        city(){
            if(!this.order)return null;
            if(!this.order.city_id)return null;

            var vm=this;
            let res = null;
            if(this.states && this.order){
                this.states.forEach(s => {
                    let ct =  s.cities.find(c => {
                       return c.id == vm.order.city_id
                    });
                    if (ct){res=ct}
                });
            }

            return res;
        },
        state(){
            if(this.city){
                return this.states.find(s => {
                    return this.city.state_id == s.id;
                })
            }
        },
        backendpath(){
            return this.$accessor.helpers.backendpath
        },
        retiroOptions(){
            return this.$accessor.retiroOptions.getNotPausedRetiroOptions
        },
        retiro(){
            return this.retiroOptions.find(retiro => {
                return retiro.id == this.order.retiro_id
            })
        }
    },




}
</script>

<style lang="scss" scoped>
    .order-table-container{
        max-height: 80vh;
        overflow-y:scroll;
        width:100%;
        overflow-x:scroll;
    }
</style>
