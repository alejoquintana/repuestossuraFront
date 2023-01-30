<template>
    <div>
        <pageComponent/>
    </div>
</template>

<script>
import pageMetaMixin from '@/mixins/pageMetaMixin'

import pageComponent from '@/components/linktree/linktree.vue'
export default {
    layout:'categories',
    name:'linktree-page',
    components:{pageComponent},
    mixins:[pageMetaMixin]
   
}
</script>
