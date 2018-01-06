<template>
    <div style="display: contents;">
        <v-flex xs12 v-if="!recentPosts && isSigned">
            <v-progress-circular indeterminate v-bind:size="50" color="teal"></v-progress-circular>
        </v-flex>
        <gmap-map v-if="!isSigned" :center="mapCenter" :zoom="12" ref="mmm" :options="{styles: styles}" style="width: 100vw; height: calc(100vh - 66px);margin: -15px;">
            <google-cluster :styles="cluster_styles">
                <gmap-info-window :position="selectedMarker.lng" :options="infoOptions" v-if="selectedMarker" @closeclick="selectedMarker=false">
                    <v-flex xs12 v-if="!selectedMarker">
                        <v-progress-circular indeterminate v-bind:size="50" color="teal"></v-progress-circular>
                    </v-flex>
                    <div v-else class="infobox">
                        <div class="inner">
                            <div class="image">
                                <a :href="wppath+'location/'+selectedMarker.id" class="quick-view">
                                    <div class="meta">
                                        <h2> {{selectedMarker.title.rendered}} </h2>
                                        <span class="location-access " v-bind:class="selectedMarker.accesibility">
                                                <span class="accessibility" v-bind:style="{ width: selectedMarker.accesibility + '0%' }"></span>
                                        </span>
                                    </div>
                                    <div class="imageWrapper">
                                        <div v-if="selectedMarker.images.length > 0" v-for="image in selectedMarker.images.slice(0,1)" :key="image.id">
                                            <img :src="image.large" :key="image.large" class="leaderimg">
                                            <div class="overlay"><span>Show Location</span></div>
                                        </div>
                                        <div v-if="selectedMarker.images.length < 1">
                                            <img :src="placeholderImage">
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <a class="nav-link" target="blank" :href="'http://maps.google.com/?daddr=' + selectedMarker.lat + ',' + selectedMarker.lng.lng ">openInMaps</a>
                        </div>
                    </div>
                </gmap-info-window>
                <gmap-marker v-if="m.type == 'Industry'" :key="index" v-for="(m, index) in recentPosts" :icon="marker_industry" :position="m.lng" :clickable="true" @click="center=m.lng;selectedMarker = m;"></gmap-marker>
                <gmap-marker v-if="m.type == 'Outdoor'" :key="index" v-for="(m, index) in recentPosts" :icon="marker_outdoor" :position="m.lng" :clickable="true" @click="center=m.lng;selectedMarker = m;"></gmap-marker>
                <gmap-marker v-if="m.type == 'Architecture'" :key="index" v-for="(m, index) in recentPosts" :icon="marker_architecture" :position="m.lng" :clickable="true" @click="center=m.lng;selectedMarker = m;"></gmap-marker>
                <gmap-marker v-if="m.type == 'Monument'" :key="index" v-for="(m, index) in recentPosts" :icon="marker_monument" :position="m.lng" :clickable="true" @click="center=m.lng;selectedMarker = m;"></gmap-marker>
                <gmap-marker v-if="m.type != 'Monument' && m.type != 'Architecture' && m.type != 'Outdoor' && m.type != 'Industry'" :key="index" v-for="(m, index) in recentPosts" :icon="marker_icon" :position="m.lng" :clickable="true" @click="center=m.lng;selectedMarker = m;"></gmap-marker>

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
            }),
            wppath() {
                return window.SETTINGS.WPPATH;
            }
        },

        data() {
            return {
                styles: null,
                mapCenter: null,
                cluster_styles: [{
                    url: 'https://www.yellowmap.de/Presentation/AldiSued/Content/img/pois/Clustericon.svg',
                    height: 30,
                    width: 30,
                    textColor: '#424242',
                    textSize: 11
                }],
                marker_icon: {
                    url: ''
                },
                marker_industry: {
                    url: ''
                },
                marker_outdoor: {
                    url: ''
                },
                marker_architecture: {
                    url: ''
                },
                marker_monument: {
                    url: ''
                },
                selectedMarker: null,
                showInfo: false,
                isSigned: false,
                placeholderImage: '',
                infoOptions: {
                    pixelOffset: {
                        width: 0,
                        height: -29
                    }
                }
            }
        },
        methods: {
            getIconPaths() {
                this.cluster_styles[0].url = window.SETTINGS.THEMEURL + '/dist/assets/img/clustericon.svg'
                this.marker_icon.url = window.SETTINGS.THEMEURL + '/dist/assets/img/marker.svg'
                this.marker_industry.url = window.SETTINGS.THEMEURL + '/dist/assets/img/marker_industry.svg'
                this.marker_outdoor.url = window.SETTINGS.THEMEURL + '/dist/assets/img/marker_outdoor.svg'
                this.marker_architecture.url = window.SETTINGS.THEMEURL + '/dist/assets/img/marker_architecture.svg'
                this.marker_monument.url = window.SETTINGS.THEMEURL + '/dist/assets/img/marker_monument.svg'
            }
        },

        mounted() {
            this.styles = window.SETTINGS.mapStyles
            this.isSigned = window.isSigned
            if (window.isSigned) {
              window.location.reload();
            }
            this.$store.dispatch('getPosts')
            this.placeholderImage = window.SETTINGS.THEMEURL + '/dist/assets/img/location-standard.jpg';
            
        },
        created() {
            this.mapCenter = window.SETTINGS.MAPCENTER
            this.getIconPaths();
        }
    }
</script>

<style lang="scss" scoped>

</style>