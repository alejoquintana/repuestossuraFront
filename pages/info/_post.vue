<template>
    <postcomponent v-if="product" :post="product" class="posts"></postcomponent>
</template>


<script>
import postcomponent from '@/components/post/Post.vue';
export default {
    name:'post-finder',
    components:{postcomponent},
    layout:'default',
    async fetch ({ store, params }) {
        //await store.dispatch('posts/fetchPosts');
    },
    head() {
            let canonical ='https://tinodeco.com'+this.$route.path;
     
        return {
              link:[
                {rel:'canonical',href:canonical}
            ],
            titleTemplate: this.metatitle,
            meta: [
                { name: 'description', content: this.metadescription, hid:'description' }

            ]
        }
    },

    computed:{
        posts(){
            return this.$accessor.posts.getPosts
        },
          product()
        {
            let res = null;
            let param = '/' + this.$route.params.post;
     
            if(this.posts)
            {
                param = param.replace('//','/');
                res  = this.posts.find(c => {
                    let slug = '/'+c.url;
                    slug = slug.replace('//','/');
             
                    if (!c.paused || this.admin)
                    {
                        return slug == param;
                    }
               
               });

            }
         
        
            if(!res)
            {
               // this.$router.push('/');
            }
            else{
             
                return res;
            }
        },
          metatitle(){
            if (this.product )
            {
                
                return this.product.metatitle ? this.product.metatitle : this.product.title           }else{return ''}
            
        },
        metadescription(){
            if (this.product){
                if (this.product.metadescription)
                {
                    return this.product.metadescription;
                }
               
                else return this.product.title;
                    
            }  else{return ''}
            
        },
    }
}
</script>

<style lang="scss" scoped>
.posts{
    width: 90vw;
    margin: auto;
}
</style>