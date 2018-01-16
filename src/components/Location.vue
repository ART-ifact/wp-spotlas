<template>
    <v-layout row wrap>
        <v-flex xs12 v-if="loading">
            <v-progress-circular indeterminate v-bind:size="50" color="teal"></v-progress-circular>
        </v-flex>
        <v-toolbar v-if="locationdata && !hash" card color="grey darken-3" class="location-toolbar">
            <v-btn v-if="showBackButton" dark color="blue-grey darken-3" class="btn-back" @click="back()">back</v-btn>
            <v-spacer></v-spacer>
            <v-btn :href="wppath+'edit/'+locationdata.id" dark  color="teal">
                {{ $t('message.edit') }}
            </v-btn>
            <v-btn @click.native="dialog = true" dark  color="red darken-4">
                {{ $t('message.delete') }}
            </v-btn>
        </v-toolbar>
        <v-flex xs12 v-if="locationdata">
            <h1 class="location-title">{{ locationdata.title.rendered }}</h1>
            <span class="location-access " v-bind:class="'_'+locationdata.accesibility">
                    <span class="accessibility" v-bind:style="{ width: locationdata.accesibility + '0%' }"></span>
            </span>
        </v-flex>
        <v-flex xs12 class="mt-2" v-if="locationdata.shared">
                <v-text-field dark color="teal" v-bind:label="'This Location is shared with the following Link:'" v-model="locationdata.shareURL" readonly></v-text-field>
        </v-flex>

        <v-flex xs12 sm6 class="pa-3" v-if="locationdata">
            <v-carousel dark>
                <v-carousel-item v-if="locationdata.images.length > 0" v-for="(image,i) in locationdata.images" v-bind:src="image.large" :key="i"></v-carousel-item>
                <v-carousel-item v-if="locationdata.images.length < 1" v-bind:src="placeholderImage"></v-carousel-item>
            </v-carousel>
            <gmap-map v-if="locationdata" :center="locationdata.lng" :options="{styles: styles}" :zoom="14" style="width: 100%; min-height: 300px">
                <gmap-marker v-if="locationdata.category == 'landscape'" :icon="marker_landscape" :position="locationdata.lng"></gmap-marker>
                <gmap-marker v-if="locationdata.category == 'building'" :icon="marker_building" :position="locationdata.lng"></gmap-marker>
                <gmap-marker v-if="locationdata.category == 'urban'" :icon="marker_urban" :position="locationdata.lng"></gmap-marker>
                <gmap-marker v-if="locationdata.category == 'water'" :icon="marker_water" :position="locationdata.lng"></gmap-marker>
                <gmap-marker v-if="locationdata.category != 'landscape' && locationdata.category != 'building' && locationdata.category != 'urban' && locationdata.category != 'water'" :icon="marker_icon" :position="locationdata.lng"></gmap-marker>
            </gmap-map>
        </v-flex>
        <v-flex xs12 sm6 class="pa-3" v-if="locationdata">
            <v-container fluid>
                <v-layout wrap>
                    <v-flex xs6>
                        <h4 class="mb-2">{{ $t('message.category') }}</h4>
                        <span v-if="locationdata.category == 'landscape'">
                            <v-icon>local_florist</v-icon>
                            {{ $t('message.landscape') }}
                        </span>
                        <span v-if="locationdata.category == 'building'">
                            <v-icon>home</v-icon>
                            {{ $t('message.building') }}
                        </span>
                        <span v-if="locationdata.category == 'urban'">
                            <v-icon>location_city</v-icon>
                            {{ $t('message.urban') }}
                        </span>
                        <span v-if="locationdata.category == 'water'">
                            <v-icon>directions_boat</v-icon>
                            {{ $t('message.water') }}
                        </span>
                    </v-flex>
                    <v-flex sm6 xs12>
                        <h4>{{ $t('message.type') }}</h4>
                        <span v-for="type in locationdata.type" :key="type">
                            <v-chip v-if="type == 'industry'" text-color="white" color="blue-grey darken-2">{{ $t('message.industry') }}</v-chip>
                            <v-chip v-if="type == 'panorama'" text-color="white" color="blue-grey darken-2">{{ $t('message.panorama') }}</v-chip>
                            <v-chip v-if="type == 'historic'" text-color="white" color="blue-grey darken-2">{{ $t('message.historic') }}</v-chip>
                            <v-chip v-if="type == 'sunrise'" text-color="white" color="blue-grey darken-2">{{ $t('message.sunrise') }}</v-chip>
                            <v-chip v-if="type == 'sunset'" text-color="white" color="blue-grey darken-2">{{ $t('message.sunset') }}</v-chip>
                            <v-chip v-if="type == 'outdoor'" text-color="white" color="blue-grey darken-2">{{ $t('message.outdoor') }}</v-chip>
                            <v-chip v-if="type == 'architecture'" text-color="white" color="blue-grey darken-2">{{ $t('message.architecture') }}</v-chip>
                            <v-chip v-if="type == 'monument'" text-color="white" color="blue-grey darken-2"></v-chip>
                        </span>
                        <span v-if="locationdata.type.length === 0">{{ $t('message.noTags') }}</span>
                    </v-flex>
                </v-layout>
            </v-container>

            <v-container fluid>
                <v-layout wrap>
                    <v-flex xs3>
                        <input type="checkbox" name="cloudy" class="weather-icon cloudy" :checked="locationdata.cloudy == 'true'" readonly>
                        <label class="weather-label" for="cloudy"></label>
                    </v-flex>
                    <v-flex xs3>
                        <input type="checkbox" name="foggy" class="weather-icon foggy" :checked="locationdata.foggy == 'true'" readonly>
                        <label class="weather-label" for="foggy"></label>
                    </v-flex>
                    <v-flex xs3>
                        <input type="checkbox" name="rainy" class="weather-icon rainy" :checked="locationdata.rainy == 'true'" readonly>
                        <label class="weather-label" for="rainy"></label>
                    </v-flex>
                    <v-flex xs3>
                        <input type="checkbox" name="sunny" class="weather-icon sunny" :checked="locationdata.sunny == 'true'" readonly>
                        <label class="weather-label" for="sunny"></label>
                    </v-flex>
                </v-layout>
            </v-container>
            <v-container fluid>
                <v-layout wrap>
                    <v-flex xs3>
                        <input type="checkbox" name="spring" class="season-icon spring" :checked="locationdata.spring == 'true'" readonly>
                        <label class="season-label" for="spring"></label>
                    </v-flex>
                    <v-flex xs3>
                        <input type="checkbox" name="summer" class="season-icon summer" :checked="locationdata.summer == 'true'" readonly>
                        <label class="season-label" for="summer"></label>
                    </v-flex>
                    <v-flex xs3>
                        <input type="checkbox" name="autumn" class="season-icon autumn" :checked="locationdata.autumn == 'true'" readonly>
                        <label class="season-label" for="autumn"></label>
                    </v-flex>
                    <v-flex xs3>
                        <input type="checkbox" name="winter" class="season-icon winter" :checked="locationdata.winter == 'true'" readonly>
                        <label class="season-label" for="winter"></label>
                    </v-flex>
                </v-layout>
            </v-container>
            <v-container fluid>
                <v-layout wrap>
                    <v-flex xs12>
                        <h4>{{ $t('message.note') }}</h4>
                        <p>
                            {{locationdata.content.rendered}}
                        </p>
                    </v-flex>
                </v-layout>
            </v-container>

        </v-flex>
        <v-dialog v-if="locationdata" v-model="dialog" persistent max-width="380">
            <v-card>
                <v-card-title v-if="!deleting" class="headline">{{ $t('message.locationDeleteHint') }} <br> {{ locationdata.title.rendered }}</v-card-title>
                <v-flex xs12 v-if="deleting">
                    <v-progress-circular indeterminate v-bind:size="50" color="teal"></v-progress-circular>
                </v-flex>
                <v-card-actions>
                    <v-btn color="teal darken-1" v-if="!deleting" @click.stop="dialog=false">{{ $t('message.abort') }}</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" v-if="!deleting" @click="deleteLocation">{{ $t('message.delete') }}</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
    import router from '../router';
    import helper from '../helper'
    import {
        mapGetters
    } from 'vuex'
    import api from '../api'
    import {
        Carousel,
        Slide
    } from 'vue-carousel';

    export default {
        props: ['id','hash'],
        components: {
            Carousel,
            Slide
        },
        data() {
            return {
                loading: false,
                deleting: false,
                showBackButton: true,
                locationdata: false,
                error: null,
                infoWinOpen: false,
                placeholderImage: '',
                dialog: false,
                styles: null,
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
            }
        },

        methods: {
            getIconPaths() {
                this.marker_icon.url = window.SETTINGS.THEMEURL + '/dist/assets/img/marker.svg'
                this.marker_landscape.url = window.SETTINGS.THEMEURL + '/dist/assets/img/marker_landscape.svg'
                this.marker_building.url = window.SETTINGS.THEMEURL + '/dist/assets/img/marker_building.svg'
                this.marker_urban.url = window.SETTINGS.THEMEURL + '/dist/assets/img/marker_urban.svg'
                this.marker_water.url = window.SETTINGS.THEMEURL + '/dist/assets/img/marker_water.svg'
            },
            handleData(data) {
                this.locationdata = data;
                this.locationdata.content.rendered = this.locationdata.content.rendered.replace(/<\/?p[^>]*>/g, "")

                this.locationdata.shared = JSON.parse(this.locationdata.shared);
                if (typeof this.hash !== "undefined") {
                    this.locationdata.shared = false;
                }

                this.loading = false
            },

            deleteLocation() {
                let _this = this
                if (_this.locationdata.images.length > 0) {
                    for (let index = 0; index < _this.locationdata.images.length; index++) {
                        const elementID = _this.locationdata.images[index].id;
                        api.deleteMedia(elementID,this.deletedImages);
                    }
                }

                api.deleteLocation(_this.locationdata.id,this.deletedLocation);
            },
            deletedImages() {
                helper.createSuccessMessage(this.$root,this.$t('message.deletedImageSucess'), 2500)
            },
            deletedLocation() {
                helper.createSuccessMessage(this.$root,this.$t('message.deletedLocationSucess'), 2500)
                router.go(-1)
            },
            back() {
                router.go(-1);
            }
        },


        watch: {
            // call again the method if the route changes
            '$route': 'handleData'
        },

        created() {
            //this.$store.dispatch('getPost')
            this.styles = window.SETTINGS.mapStyles
            this.loading = true
            let _this = this;
            _this.placeholderImage = window.SETTINGS.THEMEURL + '/dist/assets/img/location-standard.jpg';
            _this.getIconPaths();
            if (this.hash) {
                this.$root.$children[0]._data.drawer = false;
                this.$root.$children[0]._data.showDrawer = false;
                api.getSharedPost(this.id,this.hash, this.handleData);
            } else {
                api.getPost(this.id, this.handleData);
            }

        },
        computed: {
            wppath() {
                return window.SETTINGS.WPPATH;
            }
        },

    }
</script>

<style lang="scss">
    .location-title {
        display: block;
        width: 100%;
        text-align: center;
        font-weight: 400;
        margin-bottom: 1.5rem;
        margin-top: 0.5rem;
    }

    h4 {
        display: block
    }

    .VueCarousel-slide {
        flex-grow: 1 !important;
    }

    .vue--page--location {
        .btn-add {
            display: none;
        }
    }
</style>