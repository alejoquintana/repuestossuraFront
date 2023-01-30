<template>
    <v-row class="w-100">
        <v-col cols="12" lg="4" class="fc">
            <sectionsPanel :post="post"></sectionsPanel>
        </v-col>
        <v-col cols="12" lg="8">
            <h1 class="title" v-if="$mq=='lg'">{{post.title}}</h1>
            <div v-for="sect in post.sections"  :key="'asd'+sect.title">
               <h2 class="mt-4 subtitle" :id="'s'+sect.id">
                    {{sect.title | ucFirst}}
                </h2>
                <div v-for="block in sect.blocks" :key="block.id">
                    <div class="fc mt-4 pl-2">
                        <div v-if="block.image && $mq!='lg'">
                            <v-img :src="imagePath(block.image)" />
                        </div>
                        <v-row>
                            <v-col cols="12" :lg="block.image ? 6 : 12" v-if="block.text">
                                <div v-html="linejumptext(block.text)"> </div>
                            </v-col>
                            <v-col cols="12" :lg="block.text ? 6 : 12" v-if="block.image && $mq=='lg'">
                                <v-img :src="imagePath(block.image)" contain :aspect-ratio="1" />
                            </v-col>
                        </v-row>
                    </div>
                </div>
            </div>
        </v-col>
    </v-row>
</template>

<script>
import sectionsPanel from './sections-panel.vue'
export default {
    props:['post'],

    components:{sectionsPanel},
    methods:{
          linejumptext(value){
            if (value) {
                value = '<p> ' + value.replace(/\n/g, "<br>")+' </p>';
                return value.trim();
            }
      },
      imagePath(img){
          return this.$accessor.imagePath(img)
      }
    }
}
</script>

<style lang="scss" scoped>
.title{
    display: flex;
    justify-content: flex-start;
    width:100%;
    border-bottom:1px solid $primary;
    padding:10px;
    text-align: left;
}

.redtext{
    color:#E72874;
}

.side-pannel
{
    .panel-top{
        border-bottom:1px solid #E72874;
        color:#E72874;
        font-size: 25px;
        text-align: center;
        display: flex;
        width:100%;
        padding:10px;
        justify-content: center;
    }


    background-color: #fff;
    box-shadow: 6px 6px #00000029;
}

@media(max-width:660px)
{
    .title{
        font-size: 25px;
    }
}
</style>

