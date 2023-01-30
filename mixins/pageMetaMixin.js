export default{
    head() {
        let canonical = 'https://repuestossura.com' + this.$route.path;
        return {
            link: [
                { rel: 'canonical', href: canonical }
            ],
            titleTemplate: this.metatitle,
            meta: [
                { name: 'description', content: this.metadescription, hid: 'description' }
            ]
        }
    },
    computed:{
        pageMeta(){
            let path = this.$route.path ;
            return this.$accessor.pageMetas.getMeta(path);
        },
        metatitle(){
            if(!this.pageMeta)return this.$accessor.configs.siteName
            return this.pageMeta.metatitle || this.$accessor.configs.siteName
        },
        metadescription(){
            if(!this.pageMeta)return this.$accessor.configs.siteName
            return this.pageMeta.metadescription || this.metatitle
        }
    }
}
