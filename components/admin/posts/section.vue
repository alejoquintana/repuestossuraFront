<template>
    <div>
        <div class="fc" v-if="sect">
            <v-text-field label="TITULO DE SECCION" 
                        v-model.lazy="sect.title"  
                        @change="saveSectionTitle()" />
            <div>
                <v-btn color="info" @click="newblock">NUEVO BLOQUE</v-btn>
            </div>
            <div class="blocks" v-if="sect.blocks">
                <div v-for="b in sect.blocks" :key="'b'+b.id">
                    <v-row>
                        <v-col cols="10" >
                            <block @refresh="$emit('refresh')" :block="b" class="mt-4"></block>
                        </v-col>
                        <v-col cols="2" class="fc">
                            <v-btn color="info" small v-if="b.order>0" class="mt-3" @click="moveUp(b)">
                                <v-icon>{{$accessor.mdicons.mdicons.mdiChevronUp}}</v-icon>
                            </v-btn>
                            <v-btn color="info" small v-if="b.order < sect.blocks.length-1" class="mt-3" @click="moveDown(b)">
                                <v-icon>{{$accessor.mdicons.mdicons.mdiChevronDown}}</v-icon>
                            </v-btn>
                            <v-btn color="red" dark small class="mt-3" @click="delblock(b)"> 
                                <v-icon>{{$accessor.mdicons.mdicons.mdiClose}}</v-icon>
                                BORRAR BLOQUE
                            </v-btn>    
                        </v-col>
                    </v-row>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import block from './block.vue'
export default {
    
    data() {
        return {
           selected:null 
        }
    },
    components:{block},
    props:['sect'],
    
    methods:{
         savechange(block,field){
            let data = {
                id:this.sect.id,
                field:field,
                value:this.sect[field]
            }
            this.$axios.put('/block',data);
        },
        moveUp(block){
            if(block.order>0)
            {

                let swapblock = this.sect.blocks.find(b=>{
                    return b.order == block.order-1
                });

                swapblock.order++;
                block.order--;

                this.savechange(block,'order');
                this.savechange(swapblock,'order');

                this.sect.blocks = this.$accessor.helpers.orderArray(this.sect.blocks,'order');

            }
        },
        moveDown(block){
            if(block.order<this.sect.blocks.length-1)
            {

                let swapblock = this.sect.blocks.find(b=>{
                    return b.order == block.order+1
                });

                swapblock.order--;
                block.order++;

                this.savechange(block,'order');
                this.savechange(swapblock,'order');

                this.sect.blocks = this.$accessor.helpers.orderArray(this.sect.blocks,'order');

            }
        },
        
        linejumptext(value){
    
            if (value) {
                value = value.replace(/\n/g, "<br>");
                return value.trim();
            }

        },
        delblock(block){
            this.$axios.delete('/block/'+block.id)
                .then(r=>{
                    this.sect.blocks = this.sect.blocks.filter(b => {
                        return b.id != block.id;
                    })
                });
        },
        newblock(){
            let data={
                section_id:this.sect.id,
                order:this.sect.blocks.length
            }

            this.$axios.post('/block',data)
            .then(r=>{
                this.sect.blocks.push(r.data);
              
            });
        },
        saveSectionTitle(){
            let data = {
                section_id:this.sect.id,
                field:'title',
                value:this.sect.title
            }
            this.$axios.put('/section',data);
        },
        
    },
    
}
</script>

<style lang="scss" scoped>
  .purple{
        color:#301ED5;
    }

    .heading{
        width:100vw;
        border-bottom:1px solid #301ed5;
        margin-top:30px;
    }
</style>
