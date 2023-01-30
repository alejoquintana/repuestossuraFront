<template>
    <div class="fc w-100">
        <div class="heading">
            <h2 >Contenido: <span class="purple--text">{{post.title}}</span></h2>
            <span v-if="post.paused" class="primary--text font-weight-bold">PAUSADO</span>
        </div>
        <div class="mt-4 w-100">    
                <v-btn color="info"  @click="newSection" v-if="!selected">
                    Nuevo Titulo
                </v-btn>
                <v-btn  color="warning" class="ml-4" v-if="selected" @click="selected=null">Volver a titulos</v-btn>
        </div>
        <div class="fc mt-4 w-100" v-if="!selected">
                
            <div v-for="s in post.sections" class="fc p-3" :key="s.id+s.title">
                <v-divider></v-divider>
                <v-row>
                    <v-col cols="6">
                        <span class="blue--text cursor-pointer" @click="setselected(s)">
                                {{s.title}}
                        </span>
                    </v-col>
                    <v-col cols="4">
                        <div class="d-flex justify-between">
                                <v-btn color="info" small v-if="s.order > 0"  @click="moveUp(s)">
                                        <v-icon>{{$accessor.mdicons.mdicons.mdiChevronUp}}</v-icon>
                                </v-btn>
                                <v-btn color="info" small v-if="s.order < post.sections.length-1"  @click="moveDown(s)">
                                        <v-icon>{{$accessor.mdicons.mdicons.mdiChevronDown}}</v-icon>
                                </v-btn>
                                <v-btn color="red" dark small  @click="deleteSection(s)">
                                        <v-icon>{{$accessor.mdicons.mdicons.mdiClose}}</v-icon>
                                </v-btn>
                        </div>
                    </v-col>
                </v-row>
            </div>
            
        </div>
        <div class="mt-4" v-if="selected">
            <div class="mt-4">
                <sect @refresh="refresh" :sect="selected"></sect>
            </div>
        </div>
    </div>
</template>

<script>
import sect from './section';
import block from './block.vue'
export default {
    data() {
        return {
           selected:null 
        }
    },
    components:{block,sect},
    props:['post'],
    
    methods:{
        savechange(section,field){
            let data = {
                section_id:section.id,
                field:field,
                value:section[field]
            }
            this.$axios.put('/section',data);
        },
        moveUp(section){
            if(section.order>0)
            {

                let swapsection = this.post.sections.find(s=>{
                    return s.order == section.order-1
                });

                swapsection.order++;
                section.order--;

                this.savechange(section,'order');
                this.savechange(swapsection,'order');

                this.post.sections = this.$accessor.helpers.orderArray(this.post.sections,'order');

            }
        },
        moveDown(section){
             if(section.order<this.post.sections.length-1)
            {
                
                let swapsection = this.post.sections.find(s=>{
                    return s.order == section.order+1
                });

                swapsection.order--;
                section.order++;

                this.savechange(section,'order');
                this.savechange(swapsection,'order');

                this.post.sections = this.$accessor.helpers.orderArray(this.post.sections,'order');
            }
        },
        deleteSection(section){
            this.$axios.delete('/section/'+section.id);
            this.post.sections = this.post.sections.filter(s => {
                return s.id!=section.id;
            })
        },
        refresh(){
            this.$emit('refresh');
            if(this.selected){
                setTimeout(() => {
                    this.selected = this.post.sections.find(s => {
                        s.id == this.selected.id
                    })
                }, 300);
            }
        },
      setselected(section){
          this.selected=section;
      },
        newSection()
        {
            let data = {
                title:'Titulo nuevo',
                post_id:this.post.id,
                order:this.post.sections.length
            }

            this.$axios.post('/section',data)
                .then(r => {
                    this.$emit('refresh');
                    
                });
        }
    }
}
</script>

<style lang="scss" scoped>
.buttons-pannel{
    width:200px;
}


.heading{
    width:100vw;
    border-bottom:1px solid #301ed5;
    margin-top:30px;
}
</style>

