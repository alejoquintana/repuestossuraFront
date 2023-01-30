<template>
  <div>
      <v-row>
          <!-- <v-col cols="6">
              <social/>
          </v-col> -->
          <v-col cols="12">
              <categories />
          </v-col>
      </v-row>
  </div>
</template>

<script>
import categories from './categories.footer'
import logo from './logo.footer'
export default {
    components:{logo,categories}
}
</script>
