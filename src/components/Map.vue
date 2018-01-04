<template>
    <gmap-map :center="{ lat: 51.07415364657628, lng: 13.762693740427494 }" :zoom="12" ref="mmm" style="width: 100vw; height: calc(100vh - 66px);margin: -15px;">
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

    mounted() {
        this.$store.dispatch('getPosts')
    }
}
</script>

<style lang="scss" scoped>
</style>