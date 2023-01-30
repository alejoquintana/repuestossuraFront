<template>
<div>
    <v-simple-table>
        <thead>
            <tr>
                <th>id</th>
                <th>code</th>
                <th>category_id</th>
                <th>name</th>
                <th>paused</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="product in products" :key="product.id">
                <td>{{ product.id }}</td>
                <td>{{ product.code }}</td>
                <td>{{ product.category_id }}</td>
                <td>{{ product.name }}</td>
                <td>{{ product.paused ? 'PAUSADO' : 'ACTIVO' }}</td>
            </tr>
        </tbody>
    </v-simple-table>
</div>
</template>

<script>
export default {
    components: {

    },
    data(){return{

    }},
    computed: {
        products(){
            return this.$accessor.products.withNoPhotos
        }
    },
    methods: {

    },
    mounted(){
        this.$accessor.products.fetchProductsWithNoPhotos()
    }
}
</script>

<style lang="scss" scoped>

</style>
