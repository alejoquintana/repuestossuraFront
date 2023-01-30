<template>
  <div>
      <div v-if="showBanner" class="d-flex justify-center w-100">

          <nuxt-link v-if="linkIsInternal" :to="banner.target_url">
            <v-img contain :src="$accessor.helpers.imagePath(banner.url)" :alt="banner.alt" />
          </nuxt-link>

          <a v-if="link && !linkIsInternal" :href="banner.target_url">
            <v-img contain :src="$accessor.helpers.imagePath(banner.url)" :alt="banner.alt" />
          </a>

          <div v-if="!link">
            <v-img contain :src="$accessor.helpers.imagePath(banner.url)" :alt="banner.alt" />
          </div>

      </div>
  </div>
</template>

<script>
export default {
    computed:{
        appImages(){
            return this.$accessor.appImages.getAppImages
        },
        showBanner(){
            if(!this.banner)return false;
            if(!this.banner.url)return false;
            if(this.banner.paused)return false;
            let currentPage = this.$route.path;
            if(!this.banner.allPages && currentPage != '/' )return false;
            return true;
        },
        banner(){
            if(!this.appImages)return;
            let code = this.$mq == 'lg' ? 'banner_home_wide' : 'banner_home_mobile';
            return this.appImages.find(appimage => {return appimage.code === code});
        },
        link(){
            if(!this.banner)return false;
            if(!this.banner.target_url)return false;
            return this.banner.target_url
        },
        linkIsInternal(){
            if(!this.link)return false;
            return !this.link.includes('http');
        }
    },
    async serverPrefetch(){
        await this.$accessor.appImages.fetchAppImages()
    },
    mounted(){
        if(!this.banner)this.$accessor.appImages.fetchAppImages()
    }
}
</script>
