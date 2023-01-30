<template>
<div>
    <div class="container" v-if="$mq=='lg'">
        <div class="containerTitle">
            <span v-if="!ish1">{{title}}</span>
            <h1 v-if="ish1">{{title}}</h1>
        </div>
    </div>
    <div v-if="$mq!='lg'">
        <div class="containerTitle py-4">
            <span v-if="!ish1" >{{title}}</span>
            <h1 v-if="ish1">{{title}}</h1>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props:['image','color','title','ish1'],
    computed:{
        imageFullPath(){
            /* image =  https://localhost:8000/storage/images/app/icons/ofertas.png */
            return this.$accessor.helpers.imagePath(this.image)
            /* https://localhost:8000/https://localhost:8000/storage/images/app/icons/ofertas.png */
        },
        backgroundStyle(){
            return `background-color:${this.color};`
        },
        borderStyle(){
            let borderPixels = this.$mq == 'lg' ? 6 : 4 ;
            return `border:${borderPixels}px solid ${this.color};`
        },
    }
}
</script>

<style scoped lang="scss">
    .container{
        margin-top:20px;
        //position: relative;
        //display:flex;
        //align-items: center;
    }      
    .containerTitle{
        text-align: center;
        font-size: 22px;
        font-weight: bold;
        color: #000;
    }
    .containerImage{
        position: absolute;
        max-width: 136px;
        right: 5%;
        border-radius: 18px;
        overflow: hidden;   
    }
    @media(max-width:660px){
        .containerTitle{
            font-size: 18px;
        }
        .justtext{
            margin-right: 0;
        }
    }
</style>