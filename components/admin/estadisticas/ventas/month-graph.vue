<template>
    <div>
        <div v-if="stmonth && canceledMonth">
            <div class="fc">
                <div>Total pedidos en la web: {{cantidadSumada}} por ${{ totalSumado | price}} </div>
                <v-row>
                    <v-col cols="11" class="offset-1">
                        <div class="fc">
                            <span>
                                {{canceledMonth.cantidad}} cancelados ${{canceledMonth.original_total/100|price}}
                            </span>
                            <span>
                                {{stmonth.cantidad}} pedidos OK (nuevos,vistos,pagados y enviados)
                            </span>
                            <div class="offset-1 fc">
                                <span>Total sin editar: ${{stmonth.original_total/100|price}}</span>
                                <span>Total editado: ${{stmonth.edited_total/100|price}}</span>
                                <span>Diferencia: ${{(stmonth.original_total/100) - (stmonth.edited_total/100)|price}}</span>
                                <div class="mt-4">

                                </div>
                            </div>
                        </div>
                    
                    </v-col>
                    <v-col cols="11" class="offset-1 mt-4">
                        <span>% basado encantidad de pedidos:</span>
                        <div class="offset-1 fc">
                            <span>{{pagadosPercent|price}}% pagado/enviado</span>
                            <span>{{canceladosPercent|price}}% cancelado</span>
                            <span>{{otrosPercent|price}}% nuevo/visto</span>
                        </div>
                    </v-col>
                </v-row>
                <div class="mt-4">
                    <div v-for="opt in retiroMonth" :key="opt.opt.id" class="fc mt-4">
                        <span><b>{{opt.opt.name}}</b></span>
                        <span>pedidos ok: {{opt.stats.cantidad }}</span>
                        <span>total sin editar: ${{opt.stats.original_total/100|price}}</span>
                        <span>total editado: ${{opt.stats.edited_total/100|price}}</span>
                        <span>diferencia: ${{(opt.stats.original_total - opt.stats.edited_total)/100|price}}</span>
                        <span>{{cpagados(opt)}} {{cpagados(opt) == 1 ? 'pagado' : 'pagados'}} <span v-if="cpagados(opt)"> por ${{ pagados(opt) |price  }} </span> </span>
                    </div>
                </div>
            </div>
        </div>
       
    </div>
</template>


<script>
export default {
    props:['year','month'],
    computed:{
        retiroStats(){
            return this.$accessor.stats.getRetiroStats
        },
        canceledStats(){
            return this.$accessor.stats.getCanceledStats
        },
        dailyStats(){
            return this.$accessor.stats.getstmonthats
        },
        stats(){
            return this.$accessor.stats.getStats
        },
        retiroMonth(){
            let res = [];
            if(!this.retiroStats)return;
            this.retiroStats.forEach(el => {
                let newstats = el.stats.find(row => {
                    return row.dyear == this.year && row.dmonth == this.month
                })
                let newel = {opt : el.opt,stats:newstats}
                res.push(newel)
            });
            return res;
        },
        pagadosPercent(){
            if(!this.stmonth || !this.canceledMonth)return 0
            let totalPedidos = this.cantidadSumada ; 
            let pagenv = parseInt(this.stmonth.c_enviados) + parseInt(this.stmonth.c_pagados);
            return Math.round( ( pagenv / totalPedidos )*100)
        },
        otrosPercent(){
            if(!this.stmonth || !this.canceledMonth)return 0
            let totalPedidos = this.cantidadSumada ; 
            let nuevosVistos = parseInt(this.stmonth.cantidad)-parseInt(this.stmonth.c_pagados)-parseInt(this.stmonth.c_enviados)
            return Math.round( ( nuevosVistos / totalPedidos )*100)
        },
        canceladosPercent(){
            if(!this.stmonth || !this.canceledMonth)return 0
            let totalPedidos = this.cantidadSumada ; 
            return Math.round( ( this.canceledMonth.cantidad / totalPedidos )*100)
        },
        stmonth(){
            if(!this.stats)return
            return this.stats.find(row => {
                return row.dyear == this.year && row.dmonth == this.month
            })
        },
        canceledMonth(){
            if(!this.canceledStats)return
            return this.canceledStats.find(row => {
                return row.dyear == this.year && row.dmonth == this.month
            })
        },
        cantidadSumada(){
            if(!this.stmonth || !this.canceledMonth)return 0
            return this.stmonth.cantidad + this.canceledMonth.cantidad
        },
        totalSumado(){
            if(!this.stmonth || !this.canceledMonth)return 0
            let res = (parseInt(this.stmonth.original_total)/100) + (parseInt(this.canceledMonth.original_total)/100)
            return res
        }

    },
    methods:{
        cpagados(opt){
            return  parseInt(opt.stats.c_pagados) + parseInt(opt.stats.c_enviados)
        },
        pagados(opt){
            return ( ( opt.stats.pagados/100 ) + ( opt.stats.enviados/100 ) ) 
        },
    },
    mounted(){
       this.$accessor.stats.fetchCanceledStats()
       this.$accessor.stats.fetchRetiroStats()
    }
}
</script>
