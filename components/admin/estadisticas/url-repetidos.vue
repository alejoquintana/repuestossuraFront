<template>
    <div>
        <table class="table table-bordered table-striped">
            <thead>
                <th>Id</th>
                <th>Codigo</th>
                <th>Producto</th>
                <th>Url</th>
            </thead>
            <tbody>
                <tr v-for="p in repeated" :key="p.id">
                    <td>{{p.id}}</td>
                    <td>{{p.code}}</td>
                    <td>{{p.name}}</td>
                    <td>{{p.slug}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>


<script>
export default {
    data(){
        return{
            repeated: null
        }
    },
    computed:{
        /* products() {
            return this.$store.getters['products/getProducts'];
        }, */
    },
    methods:{
        async repeatedUrlProducts(){
            let r = await this.$axios.get('/repeated-url');
            return r
        },
    },
    mounted(){
       this.$axios.get('/repeated-url')
        .then(r => {
            this.repeated = r.data;
        })
    },
}
</script>
