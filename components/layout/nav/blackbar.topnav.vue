<template>
    <div>
        <div v-if="sentences && sentences.length" class="minbuy-topnav" >
            <v-carousel height="fill-height" interval="6000" cycle :show-arrows="false" hide-delimiters >
                <v-carousel-item v-for="sentence in sentences" :key="sentence.id">
                    <p class="white-bold text-center mb-0">{{sentence.text}}</p>
                </v-carousel-item>
            </v-carousel>
        </div>

    </div>
</template>

<script>
export default {
    data(){return{
        selected:0,
        transition:true
    }},
    computed:{
        sentences(){
            return this.$accessor.blackBarTexts.getTexts
        }  
    },
    methods:{
        changeSentence(){
            setInterval(() => {
                this.transition = false
                this.selected++
                this.selected = this.selected % this.sentences.length
                this.transition = true
            }, 5000);
        }
    },
    async mounted(){
        await this.$accessor.blackBarTexts.fetchTexts()
        this.changeSentence('test1')
    }
}
</script>

<style scoped lang="scss">
.minbuy-topnav{
    background-color: #000;
    color: #fff;
    //text-align: center;
    padding: 8px 0;
    font-size: 14px;
    display: flex;
    justify-content: center;
}
.transition{
    animation: in 5s infinite;
}
.white-text{
    color: #fff;
    text-align: center;
}
@keyframes in {
    0%{opacity: 0;}
    20%{opacity: 1;}
}

@media(max-width: 660px){
    .minbuy-topnav{
        font-size: 12px;
        padding: 4px 0;
    }
}
</style>