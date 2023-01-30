<template>
    <div class="fc">
        <div>
            <ul>
                <li v-for="item in dummyDataMenu" >
                    <a :href="item.url">
                        {{item.name}}
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            numeroA:1,
            numeroB:2,
            dummyDataMenu:[
                {name:'menu1',url:'/menu1'},
                {name:'menu2',url:'/menu2'},
                {name:'menu3',url:'/menu3'},
                {name:'menu4',url:'/menu4'},
                {name:'menu5',url:'/menu5'},
                {name:'menu6',url:'/menu6'},
                {name:'menu7',url:'/menu7'},
                {name:'menu8',url:'/menu8'},
                {name:'menu9',url:'/menu9'},
            ]
        }
    },
    computed:{
        suma(){
            return this.numeroA + this.numeroB
        }
    },
    methods:{
        restarA(){
            this.numeroA--
        },
        restarB(){
            this.numeroB--
        },
        division(a,b){
            return a/b ;
        }
    },
}
    
</script>

<style scoped>
    .grande{
        font-size: 45px;
    }

</style>