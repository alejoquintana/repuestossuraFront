<template>
    <div class="overlay" ref="overlayModal">
        <transition appear enter-active-class="animated slideInDown">
            <div class="modal-window">

                <div class="close-button clickable mb-4" @click="$emit('close')">
                   <span>
                       <v-icon color="white">{{$accessor.mdicons.mdicons.mdiClose}}</v-icon>
                    </span>
                </div>
                <div class="bordered-inner">
                    <div class="content mt-3" ref="content">
                        <slot></slot>
                    </div>
                </div>

                <div v-if="showScrollControls">
                    <div v-if="moreDown" class="moreDown">
                        <v-btn fab color="secondary" @click="scrollDown">
                            <v-icon>{{$accessor.mdicons.mdicons.mdiChevronDown}}</v-icon>
                        </v-btn>
                    </div>
                    <div v-if="moreUp" class="moreUp">
                        <v-btn fab color="secondary" @click="scrollUp">
                             <v-icon>{{$accessor.mdicons.mdicons.mdiChevronUp}}</v-icon>
                        </v-btn>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { User } from '~/types';

export default Vue.extend({
    data() {
        return {
            interval:null as any,
            doneMount:false,
            content:null as null|HTMLElement,
            moreDown:false,
            moreUp:false,
            initialScrollPosition:0,
        }
    },
    beforeDestroy(){
        if(this.interval)clearInterval(this.interval);

        this.$accessor.setLoading(false);
        const body = document.body;
        const scrollY = body.style.top;
        body.style.position = '';
        body.style.top = '';
        window.scrollTo(0, this.initialScrollPosition);
    },
    computed:{
        user():User{
            return (this.$auth.user as User)
        },
        showScrollControls():boolean
        {
            if(!this.content)return false
            return (this.content.scrollHeight > this.content.clientHeight);
        }
    },
    methods:{
        moveModalToDOMRoot(){
            let el = this.$refs.overlayModal ;
            document.body.appendChild(el as any);
        },
        handleScroll(){
          if(this.content)
          {
              let el = this.content;
              let dif = el.scrollHeight - el.clientHeight;
              this.moreDown = ( el.scrollHeight > el.clientHeight && dif > el.scrollTop );
              this.moreUp = ( el.scrollHeight > el.clientHeight && dif <= el.scrollTop );
          }
        },
        scrollDown()
        {
            if(this.content){
                let el = this.content;
                el.scrollTop = el.scrollHeight;
            }
        },
        scrollUp()
        {
            if(this.content){
                let el = this.content;
                el.scrollTop = 0;
            }
        }
    },
    mounted(){
        this.initialScrollPosition = document.documentElement.scrollTop;
        this.interval = setInterval(()=>{
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
        },100)
       this.content = this.$refs.content as HTMLElement;
       if(this.content){
           this.content.addEventListener('scroll',this.handleScroll);
           this.handleScroll();
       }
        const body = document.body;
        const scrollY = body.style.top;
        body.style.position = '';
        body.style.top = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
    },

})
</script>


<style lang="scss" scoped>
.moreDown{
    position:absolute;
    bottom:10%;
    right:10px;
    width:40px;
}
.moreUp{
    position:absolute;
    top:10%;
    right:10px;
    width:40px;
}
.content{
    width:103%;
    overflow: hidden;
    padding: 0 8% 8% 8%;
    padding-right: 10%;
    max-height: 80vh;
    overflow-y:scroll;
    scrollbar-width: none;
}
.content::-webkit-scrollbar {
  display: none;
}
.close-button{
    position:absolute;
    top:10px;
    right:10px;
    width:25px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    color:#fff;
    font-weight: bold;
    background-color: #000;
    z-index:950;
}
    .overlay{
        width: 100vw;
        height: 100vh;
        background-color: #00000088;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 900;
        display: flex;
        justify-content: center;
    }

    .modal-window{
        position:absolute;
        top:5%;
        z-index:910;
        min-width:600px;
        max-width: 70vw;
        padding:10px;
        background-color: #fff;
        display:flex;
        flex-direction: column;
        justify-content: center;
    }

    .bordered-inner{
        border: 2px solid #000;
    }


.shadow{
    box-shadow:0px 3px 6px #00000029 ;
}




    @media(max-width:660px){
        .modal-window{
            position:absolute;
            top:45px;
            left:50%;
            margin-left:-150px;
            min-width: 300px;
            width:300px;
        }

    }
</style>



