<template>
    <gmap-map :center="mapCenter" :zoom="12" ref="mmm" :options="{styles: styles}" style="width: 100vw; height: calc(100vh - 66px);margin: -15px;">
        <google-cluster>
            <gmap-marker :key="index" v-for="(m, index) in recentPosts" :position="m.lng" :clickable="true" @click="center=m.lng"></gmap-marker>
        </google-cluster>
    </gmap-map>
</template>

<script>
import {
    mapGetters
} from 'vuex'


export default {
    computed: {
        ...mapGetters({
            recentPosts: 'recentPosts',
            recentPostsLoaded: 'recentPostsLoaded'
        })
    },
    data () {
      return {
            styles: null,
            mapCenter: null
      }
    },

    mounted() {
        this.styles = window.SETTINGS.mapStyles
        this.$store.dispatch('getPosts')
    },
    created() {
        this.mapCenter = window.SETTINGS.MAPCENTER
    }
}
</script>

<style lang="scss" scoped>
</style>