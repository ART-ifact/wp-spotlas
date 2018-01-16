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
                                            <div class="overlay"><span>{{ $t('message.showLocation') }}</span></div>
                                        </div>
                                        <div v-if="selectedMarker.images.length < 1">
                                            <img :src="placeholderImage">
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <a class="nav-link" target="blank" :href="'http://maps.google.com/?daddr=' + selectedMarker.lat + ',' + selectedMarker.lng.lng ">{{ $t('message.openInMaps') }}</a>
                        </div>
                    </div>
                </gmap-info-window>
                <gmap-marker v-if="m.category == 'landscape'" :key="index" v-for="(m, index) in recentPosts" :icon="marker_landscape" :position="m.lng" :clickable="true" @click="center=m.lng;selectedMarker = m;"></gmap-marker>
                <gmap-marker v-if="m.category == 'building'" :key="index" v-for="(m, index) in recentPosts" :icon="marker_building" :position="m.lng" :clickable="true" @click="center=m.lng;selectedMarker = m;"></gmap-marker>
                <gmap-marker v-if="m.category == 'urban'" :key="index" v-for="(m, index) in recentPosts" :icon="marker_urban" :position="m.lng" :clickable="true" @click="center=m.lng;selectedMarker = m;"></gmap-marker>
                <gmap-marker v-if="m.category == 'water'" :key="index" v-for="(m, index) in recentPosts" :icon="marker_water" :position="m.lng" :clickable="true" @click="center=m.lng;selectedMarker = m;"></gmap-marker>
                <gmap-marker v-if="m.category != 'landscape' && m.category != 'building' && m.category != 'urban' && m.category != 'water'" :key="index" v-for="(m, index) in recentPosts" :icon="marker_icon" :position="m.lng" :clickable="true" @click="center=m.lng;selectedMarker = m;"></gmap-marker>

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
                marker_landscape: {
                    url: ''
                },
                marker_building: {
                    url: ''
                },
                marker_urban: {
                    url: ''
                },
                marker_water: {
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
                this.marker_landscape.url = window.SETTINGS.THEMEURL + '/dist/assets/img/marker_landscape.svg'
                this.marker_building.url = window.SETTINGS.THEMEURL + '/dist/assets/img/marker_building.svg'
                this.marker_urban.url = window.SETTINGS.THEMEURL + '/dist/assets/img/marker_urban.svg'
                this.marker_water.url = window.SETTINGS.THEMEURL + '/dist/assets/img/marker_water.svg'
            },
            /**
             * Prepared Filter Watcher
             */
            filter() {
                this.$root.$children[0].$watch("filter");
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
            this.$root.$children[0]._data.showBackButton = false;
        }
    }
</script>

<style lang="scss" scoped>

</style>