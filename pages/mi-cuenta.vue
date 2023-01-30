<template>
  <div>
      <pageComponent />
  </div>
</template>

<script>
import pageMetaMixin from '@/mixins/pageMetaMixin'

import pageComponent from '@/components/mi-cuenta/miCuenta.page.vue'
export default {
    components:{pageComponent},
    layout:'categories',
    name:'mi-cuenta-page',
    mixins:[pageMetaMixin]
}
</script>
