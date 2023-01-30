<template>
    <v-layout row justify-center>
        <v-flex xs12 >
            <v-chip class="price-pill" outlined>
                ${{product.price|price}} C/U
            </v-chip>
        </v-flex>
    </v-layout>    
</template>

<script>
export default {
    props:['product']
}
</script>
