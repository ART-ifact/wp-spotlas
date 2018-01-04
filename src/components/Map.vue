<template>
    <gmap-map :center="mapCenter" :zoom="12" ref="mmm" :options="{styles: styles}" style="width: 100vw; height: calc(100vh - 66px);margin: -15px;">
        <google-cluster :styles="cluster_styles">
            <gmap-marker v-if="m.category == 'Landscape'" :key="index" v-for="(m, index) in recentPosts" :icon="landscape" :position="m.lng" :clickable="true" @click="center=m.lng"></gmap-marker>
            <gmap-marker v-if="m.category == 'Building'" :key="index" v-for="(m, index) in recentPosts" :icon="builing" :position="m.lng" :clickable="true" @click="center=m.lng"></gmap-marker>
            <gmap-marker v-if="m.category != 'Building' && m.category != 'Landscape'" :key="index" v-for="(m, index) in recentPosts" :icon="marker_icon" :position="m.lng" :clickable="true" @click="center=m.lng"></gmap-marker>
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
            mapCenter: null,
            cluster_styles : [
                {
                    url: 'https://www.yellowmap.de/Presentation/AldiSued/Content/img/pois/Clustericon.svg',
                    height: 53,
                    width: 53,
                    textColor: '#FFFFFF',
                    textSize: 13
                }
            ],
            marker_icon : {
               url: 'https://www.walmart.ca/assets/img/pip/pickup-icon.svg'
            },
            landscape : {
                url: 'https://www.walmart.ca/assets/img/pip/pickup-icon.svg'
            },
            builing : {
                url: 'https://www.walmart.ca/assets/img/pip/pickup-icon.svg'
            }
            
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