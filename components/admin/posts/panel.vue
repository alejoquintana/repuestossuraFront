<template>
    <v-row>
        <v-col cols="12" lg="3">
           <div class="purple--text">
                Indice de posts
            </div> 
            <div class="fcc" v-if="posts">
                <div  v-for="post in posts" :key="post.title+post.id" class="clickable" @click="selected=post">
                  <span class="purple--text">
                        {{postDate(post)}} 
                  </span>  
                  - {{post.title}}
                </div>
            </div>
        </v-col>
        <v-col cols="12" lg="8">
            <div class="fc">
                <h1 class="title purple--text">
                    Posts
                </h1>
                <v-row>
                    <v-col cols="4" class="p-2">
                        <v-btn block color="info" @click="newPost">
                            Crear post
                        </v-btn>
                    </v-col>
                    <v-col cols="4" class="p-2">
                        <v-btn block color="red" dark v-if="selected" @click="deletePost">
                            Borrar Post
                        </v-btn>
                    </v-col>
                    <v-col cols="4" class="p-2"  v-if="selected && !selected.paused">
                        <v-btn block color="info" @click="togglePaused">
                            Pausar Post
                        </v-btn>
                    </v-col>
                    <v-col cols="4" class="p-2" v-if="selected && selected.paused">
                        <v-btn block  color="success" @click="togglePaused">
                            Activar Post
                        </v-btn>
                    </v-col>
                   
                </v-row> 
                <div class="fc" v-if="selected">
                        <v-text-field label="TITULO" type="text" v-model.lazy="selected.title" @change="saveChange('title')" />
                        <v-btn link :href="'/info/'+selected.url" target="_blank" color="info">Visitar Post</v-btn>
                        <v-text-field label="URL"  type="text" v-model.lazy="selected.url" @change="saveChange('url')"/> 
                        <v-text-field label="METATITULO" type="text" v-model.lazy="selected.metatitle" @change="saveChange('metatitle')" />
                        <v-textarea rows="1" label="METADESCRIPCION"  type="text" v-model.lazy="selected.metadescription" @change="saveChange('metadescription')"  />          
            
                </div>
            </div>
        </v-col>
        <v-col cols="12" >
            
            <div v-if="selected" class="mt-4 px-4 w-100">
                <sections :post="selected" @refresh="refreshPosts"></sections>
            </div>
        </v-col>
       
        <div class="bottom-space">

        </div>
       
    </v-row>
</template>


<script lang="ts">
import Vue from 'vue'
import sections from './sections.vue'
import swal from 'sweetalert'

export default Vue.extend({
    components:{sections},
    data(){
        return{
            selected:null as any,
        }
    },
    mounted(){
       this.refreshPosts();
    },
    computed:{
        posts():Array<any>{
            return this.$accessor.posts.getPosts
        }
    },
    methods:{
        togglePaused(){
            this.selected.paused=!this.selected.paused;
         
            let data = {
                id:this.selected.id,
                post_id:this.selected.id,
                field:'paused',
                value:this.selected.paused ? 1 : 0
            }

            this.$axios.put('/post',data);
        },
        saveChange(field:string){
            let data={
                id:this.selected.id,
                field:field,
                value:this.selected[field]
            }
            this.$axios.put('/post',data);
        },
        postDate(post:any){
            let date = new Date(post.created_at);
            return `${date.getDate()} ${date.getMonth()+1} ${date.getFullYear()}`
            
        },
        async refreshPosts(){
            //await this.$accessor.posts.fetchPosts()
            if(this.selected){
                this.selected = this.posts.find( (p:any) => {
                return p.id == this.selected.id;
                })
            }else{
                this.selected= this.posts[0];
            }
        },
        newPost(){
            this.$axios.post('/post')
                .then(r=>{
                    this.refreshPosts();
                    setTimeout(() => {
                        this.selected = this.posts[this.posts.length-1];
                    }, 300);
                });
        },
        deletePost(){
            var vm = this;
            swal({
                title: "¿Estas seguro de eliminar esta Post?",
                text: "",
                icon: "warning",
                buttons: [
                    'Cancelar',
                    'Borrar!'
                ],
                dangerMode: true,
            }).then((isConfirm) => {
                if (isConfirm){   
                    this.$axios.delete('/post/'+this.selected.id)
                    .then(r=>{
                        this.refreshPosts();
                    });
                }
            });
            
        }
    }
})
</script>


<style lang="scss" scoped>

.separation{
    width:100vw;
    border-bottom:2px solid #301ED5;
    margin-top:30px;
}
.block-btn{
    height: 45px;
    font-size: 20px;
}
    .purple{
        color:#301ED5;
    }

    .title{
        border-bottom:1px solid #301ED5;
    }

    .bottom-space{
        width:100vw;
        height:200px;
    }
</style>