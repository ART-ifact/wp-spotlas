<template>
    <div style="display: contents;">
        <v-flex xs12 v-if="!recentPosts">
            <v-progress-circular indeterminate v-bind:size="50" color="teal"></v-progress-circular>
        </v-flex>
        <gmap-map :center="mapCenter" :zoom="12" ref="mmm" :options="{styles: styles}" style="width: 100vw; height: calc(100vh - 66px);margin: -15px;">
        <google-cluster :styles="cluster_styles">
            <gmap-info-window :position="selectedMarker.lng" :options="infoOptions" v-if="selectedMarker"  @closeclick="selectedMarker=false">
                <v-flex xs12 v-if="!selectedMarker">
                    <v-progress-circular indeterminate v-bind:size="50" color="teal"></v-progress-circular>
                </v-flex>
                <div v-else class="infobox">
                    <div class="inner">
                        <div class="image">
                            <a :href="'/wordpress/location/'+selectedMarker.id" class="quick-view">
                                <div class="meta">
                                    <h2> {{selectedMarker.title.rendered}} </h2>
                                    <span class="location-access " v-bind:class="selectedMarker.accesibility">
                                        <span class="accessibility" v-bind:style="{ width: selectedMarker.accesibility + '0%' }"></span>
                                    </span>
                                </div>
                                <div class="imageWrapper">
                                    <div v-if="selectedMarker.images.length > 0" v-for="(image, index) in selectedMarker.images.slice(0,1)" :key="image.id">
                                        <img  :src="image.large" :key="image.large" class="leaderimg">
                                        <div class="overlay"><span>Show Location</span></div>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <a class="nav-link" target="blank" :href="'http://maps.google.com/?daddr=' + selectedMarker.lat + ',' + selectedMarker.lng.lng ">openInMaps</a>
                    </div>
                </div>
            </gmap-info-window>
            <gmap-marker v-if="m.category == 'Landscape'" :key="index" v-for="(m, index) in recentPosts" :icon="landscape" :position="m.lng" :clickable="true"  @click="center=m.lng;selectedMarker = m;" ></gmap-marker>
            <gmap-marker v-if="m.category == 'Building'" :key="index" v-for="(m, index) in recentPosts" :icon="builing" :position="m.lng"
                :clickable="true" @click="center=m.lng;selectedMarker = m;" ></gmap-marker>
            <gmap-marker v-if="m.category != 'Building' && m.category != 'Landscape'" :key="index" v-for="(m, index) in recentPosts"
                :icon="marker_icon" :position="m.lng" :clickable="true" @click="center=m.lng;selectedMarker = m;" ></gmap-marker>
        </google-cluster>
    </gmap-map>
    </div>
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
            showInfo: false,
            infoOptions: {
                pixelOffset: {width: 0, height: -25}
            }
      }
    },
     methods: {
                toggleInfoWindow( idx) {
                    //check if its the same marker that was selected if yes toggle
                    if (this.currentMidx == idx) {
                    this.infoWinOpen = !this.infoWinOpen;
                    }
                    //if different marker set infowindow to open and reset current marker index
                    else {
                    this.infoWinOpen = true;
                    this.currentMidx = idx;
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