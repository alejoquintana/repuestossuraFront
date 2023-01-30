<template>
    <div>
       
        <h3 class="mt 4">{{month}} / {{year}}</h3>
        <graph v-if="isSuper" :year="year" :month="month"/>
        <div class="mt-4">
            <h3>POR TIPO DE ENVIO</h3>
            <table class="table table-striped" v-if="tableRow">
                <thead>
                    <th>-</th>
                    <th>RETIRO EN DEPOSITO</th>
                    <th>ENVIO AL INTERIOR</th>
                    <th>ENVIO GRATIS</th>
                </thead>
                <tbody>   
                    <tr>
                        <td><b>PEDIDOS</b></td>
                        <td>{{tableRow.c_retiro}}</td>
                        <td>{{tableRow.c_interior}}</td>
                        <td>{{tableRow.c_gratis}}</td>
                    </tr>
                    
                    <tr>
                        <td><b>ORIGINAL</b></td>
                        <td>${{tableRow.retiro_original/100 |price}}</td>
                        <td>${{tableRow.interior_original/100 |price}}</td>
                        <td>${{tableRow.gratis_original/100 |price}}</td>
                    </tr>
                    
                    <tr>
                        <td><b>EDITADO</b></td>
                        <td>${{tableRow.retiro_editado/100 |price}}</td>
                        <td>${{tableRow.interior_editado /100|price}}</td>
                        <td>${{tableRow.gratis_editado/100 |price}}</td>
                    </tr>

                </tbody>
            </table>
            <div v-if="!tableRow">
                Cargando...
            </div>
        </div>
    </div>
</template>


<script>
import graph from './month-graph'
export default {
    components:{graph},
    props:['year','month'],
    computed:{
        tableData(){
            return null
            //return this.$accessor.stats.getMonthStatsByDelivery
        },
        tableRow(){
            if(!this.tableData)return
            return this.tableData[0]
        },
        user(){
            return this.$accessor.getUser;
        },
        isSuper(){
            return (this.user && this.user.role_id == 1);
        },
        deliveryOptions(){
            return this.$accessor.orders.deliveryOptions
        },
    },
    mounted(){
       //this.$accessor.stats.fetchMonthStatsByDelivery({month:this.month,year:this.year})
    }
}
</script>
