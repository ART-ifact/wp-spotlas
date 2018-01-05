<template>
    <gmap-map :center="mapCenter" :zoom="12" ref="mmm" :options="{styles: styles}" style="width: 100vw; height: calc(100vh - 66px);margin: -15px;">
        <google-cluster :styles="cluster_styles">
            <gmap-info-window :position="selectedMarker.lng" :options="infoOptions" v-if="selectedMarker">
                <div class="infobox">
                    <div class="inner">
                        <div class="image">
                            <div class="overlay">
                                <div class="wrapper">
                                    <a :href="'/wordpress/location/'+selectedMarker.id" class="quick-view">quickview</a>
                                </div>
                            </div>
                            <a :href="'/wordpress/location/'+selectedMarker.id" class="quick-view">
                                <div class="meta">
                                    <h2> {{selectedMarker.title.rendered}} </h2>
                                    <div class="progress">
                                        <div class="progress-bar" style="width: '+selectedMarker.accesibility+'0%"></div>

                                    </div>
                                </div>
                            </a>
                            <div class="imageWrapper">
                                <div v-if="selectedMarker.images.length > 0" v-for="(image, index) in selectedMarker.images.slice(0,1)" :key="image.id">
                                    <img  :src="image.thumb" :key="image.thumb" class="leaderimg">

                                </div>
                            </div>
                        </div>
                        <a class="nav-link" target="blank" :href="'http://maps.google.com/?daddr=' + selectedMarker.lat + ',' + selectedMarker.lng ">openInMaps</a>
                    </div>
                </div>
            </gmap-info-window>
            <gmap-marker v-if="m.category == 'Landscape'" :key="index" v-for="(m, index) in recentPosts" :icon="landscape" :position="m.lng" :clickable="true" @click="center=m.lng;selectedMarker = m;" ></gmap-marker>
            <gmap-marker v-if="m.category == 'Building'" :key="index" v-for="(m, index) in recentPosts" :icon="builing" :position="m.lng"
                :clickable="true" @click="center=m.lng;selectedMarker = m;" ></gmap-marker>
            <gmap-marker v-if="m.category != 'Building' && m.category != 'Landscape'" :key="index" v-for="(m, index) in recentPosts"
                :icon="marker_icon" :position="m.lng" :clickable="true" @click="center=m.lng;selectedMarker = m;" ></gmap-marker>
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
            },
            selectedMarker: null,
            infoOptions: {
                pixelOffset: {width: 0, height: -25}
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