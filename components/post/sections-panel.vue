<template>
    <div class="d-flex flex-column" v-if="post">
         <div class="logo-row mb-3" v-if="$mq=='lg'">
             <a :href="whatsappUrl"  @click="trackevent('whatsapp_click')" target="_blank" class="phone">
                <v-icon :color="$accessor.helpers.colors.primary" large>
                    {{$accessor.mdicons.mdicons.mdiWhatsapp}}
                </v-icon>
                <span class="ml-4 phone-n">
                    {{whatsappNumber}}
                </span>
            </a>
        </div>

        <div  v-if="post.sections" class="shadow" >
            <div class="heading">
                <h3>Indice: {{post.title}}</h3>
            </div>
            <ul class="scrollable-pannel">
                <li v-for="(section, k) in post.sections" :key="section.title" class="mb-2">
                    <a class="d-flex align-items-center" :href="'#s'+section.id">
                        <span class="dark-grey-text mr-2">{{k+1}} - </span> {{section.title | ucFirst}}
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    props:['post'],
    methods:{
        imagePath(img){
          return this.$accessor.imagePath(img)
        },
        trackevent(name){
            this.$accessor.trackEvents.trackEvent(name)
        },
    },
    computed:{
        whatsappNumber(){
            return this.$accessor.configs.whatsappNumber
        },
        whatsappUrl(){
            return this.$accessor.configs.whatsappUrl;
        },
    }
}
</script>



<style lang="scss" scoped>

.title {
    color: #E72874;
    text-shadow: rgba(0,0,0,0.53333);
    font-size: 35px;
    font-weight: bold;
}


.fa-whatsapp{
    color:#25d366;
    font-size: 40px;
}
    .logo-row{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items:center;
    }

    .logo-container{
        width:237px;
        cursor: pointer;
        padding:20px;
    }

    .phone{
        display: flex;
        justify-content: center;
        align-items: center;
        .phone-n{
            color: $primary;
            font-size: 28px;
            font-weight: 600;
        }

    }

    .heading{

        background-color: #fff;
        display: flex;
        width:100%;
        justify-content: center;
        align-items: center;
        padding-bottom:5px;

        h3{
            font-size: 25px;
            text-align: center;
        }

    }
    .redtext{
        color:#E72874;
    }

    .selected{
        border-left:2px solid #E72874;
        background-color: #D52B1E33;
    }



    .shadow{
            box-shadow: 0px 6px 15px #0006;
            padding-top:5px;
    }
    .scrollable-pannel{
        border-top:1px solid $primary;
        background-color: #fff;
        padding: 15px 20px;
        max-height: 625px;
        max-width:100%;
        overflow-y: scroll;
        width:100%;
        z-index:100;

        display: flex;
        flex-direction: column;
        //align-items: flex-start;
        li{
            margin:0;
            padding:0;
            //padding-left:5px;
            a{
                color:#000;
                margin-left:5px;
            }
        }
    }


    .img-container{
        width:83px;
        border:1px solid #E72874;

    }
    ul{
        list-style: none;
        li{
            cursor: pointer;
            &:hover{
                transform: scale(1.23);
                width: 80%;
                margin: auto;
                z-index:300;
                background-color: #D52B1E33;
            }
        }
    }
     a:hover{
        color:#000;
    }

    .category-name{
        display: flex;
        width:65%;
        justify-content: center;
        text-align: center;
    }


</style>

