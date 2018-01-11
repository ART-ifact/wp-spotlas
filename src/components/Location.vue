<template>
    <v-layout row wrap>
        <v-flex xs12 v-if="loading">
            <v-progress-circular indeterminate v-bind:size="50" color="teal"></v-progress-circular>
        </v-flex>

        <v-flex xs12 v-if="locationdata">
            <h1 class="location-title">{{ locationdata.title.rendered }}</h1>
            <span class="location-access " v-bind:class="'_'+locationdata.accesibility">
                    <span class="accessibility" v-bind:style="{ width: locationdata.accesibility + '0%' }"></span>
            </span>
        </v-flex>
        <v-flex xs12 sm6 class="pa-3" v-if="locationdata">
            <v-carousel dark>
                <v-carousel-item v-if="locationdata.images.length > 0" v-for="(image,i) in locationdata.images" v-bind:src="image.large" :key="i"></v-carousel-item>
                <v-carousel-item v-if="locationdata.images.length < 1" v-bind:src="placeholderImage"></v-carousel-item>
            </v-carousel>
            <gmap-map v-if="locationdata" :center="locationdata.lng" :options="{styles: styles}" :zoom="14" style="width: 100%; min-height: 300px">
                <gmap-marker v-if="locationdata.type == 'Industry'" :icon="marker_industry" :position="locationdata.lng"></gmap-marker>
                <gmap-marker v-if="locationdata.type == 'Outdoor'" :icon="marker_outdoor" :position="locationdata.lng"></gmap-marker>
                <gmap-marker v-if="locationdata.type == 'Architecture'" :icon="marker_architecture" :position="locationdata.lng"></gmap-marker>
                <gmap-marker v-if="locationdata.type == 'Monument'" :icon="marker_monument" :position="locationdata.lng"></gmap-marker>
                <gmap-marker v-if="locationdata.type != 'Monument' && locationdata.type != 'Architecture' && locationdata.type != 'Outdoor' && locationdata.type != 'Industry'" :icon="marker_icon" :position="locationdata.lng"></gmap-marker>
            </gmap-map>
        </v-flex>
        <v-flex xs12 sm6 class="pa-3" v-if="locationdata">
            <v-container fluid>
                <v-layout wrap>
                    <v-flex xs6>
                        <h4>{{ $t('message.category') }}</h4>
                        <v-icon v-if="locationdata.category == 'landscape'">local_florist</v-icon>
                        <v-icon v-if="locationdata.category == 'building'">home</v-icon>
                        <v-icon v-if="locationdata.category == 'urban'">location_city</v-icon>
                        <v-icon v-if="locationdata.category == 'water'">directions_boat</v-icon>
                        {{locationdata.category}}
                    </v-flex>
                    <v-flex xs6>
                        <h4>{{ $t('message.type') }}</h4>
                        <v-icon v-if="locationdata.type == 'Industry'">build</v-icon>
                        <v-icon v-if="locationdata.type == 'Outdoor'">terrain</v-icon>
                        <v-icon v-if="locationdata.type == 'Architecture'">domain</v-icon>
                        <v-icon v-if="locationdata.type == 'Monument'">whats_hot</v-icon>
                        {{locationdata.type}}
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
        <v-speed-dial v-if="locationdata" fab small large dark absolute top right class="btn-edit" :direction="'bottom'" :hover="true" :transition="'slide-y-reverse-transition'">
            <v-btn slot="activator" color="teal darken-2" dark fab hover>
                <v-icon>edit_location</v-icon>
                <v-icon>{{ $t('message.close') }}</v-icon>
            </v-btn>
            <v-btn :href="wppath+'edit/'+locationdata.id" fab dark small color="teal">
                <v-icon>edit</v-icon>
            </v-btn>
            <v-btn @click.native="dialog = true" fab dark small color="red">
                <v-icon>delete</v-icon>
            </v-btn>
        </v-speed-dial>
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
    import {
        mapGetters
    } from 'vuex'
    import api from '../api'
    import {
        Carousel,
        Slide
    } from 'vue-carousel';

    export default {
        props: ['id'],
        components: {
            Carousel,
            Slide
        },
        data() {
            return {
                loading: false,
                deleting: false,
                locationdata: null,
                error: null,
                infoWinOpen: false,
                placeholderImage: '',
                dialog: false,
                styles: null,
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
            }
        },

        methods: {
            getIconPaths() {
                this.marker_icon.url = window.SETTINGS.THEMEURL + '/dist/assets/img/marker.svg'
                this.marker_industry.url = window.SETTINGS.THEMEURL + '/dist/assets/img/marker_industry.svg'
                this.marker_outdoor.url = window.SETTINGS.THEMEURL + '/dist/assets/img/marker_outdoor.svg'
                this.marker_architecture.url = window.SETTINGS.THEMEURL + '/dist/assets/img/marker_architecture.svg'
                this.marker_monument.url = window.SETTINGS.THEMEURL + '/dist/assets/img/marker_monument.svg'
            },
            handleData(data) {;
                this.locationdata = data;
                this.locationdata.content.rendered = this.locationdata.content.rendered.replace(/<\/?p[^>]*>/g, "")
                this.loading = false
            },

            deleteLocation() {
                let _this = this
                if (_this.locationdata.images.length > 0) {
                    for (let index = 0; index < _this.locationdata.images.length; index++) {
                        const elementID = _this.locationdata.images[index].id;
                        _this.deleteImage(elementID);
                    }
                }

                _this.deletePost(_this.locationdata.id);
            },
            deleteImage(imageID) {
                let _this = this;
                var path = window.SETTINGS.WPPATH + 'wp-json/wp/v2/media/' + imageID + '?force=true';
                axios.delete(path, {
                        force: true
                    })
                    .then(function(response) {
                        console.log('deleted successfully')
                    });
            },
            deletePost(id) {
                let _this = this;
                var path = window.SETTINGS.WPPATH + 'wp-json/wp/v2/posts/' + id + '?force=true';

                this.deleting = true;
                
                for (let index = 0; index < this.locationdata.images.length; index++) {
                    this.deleteImage(this.locationdata.images[index].id)
                }

                axios.delete(path, {
                        force: true
                    })
                    .then(function(response) {
                        console.log('deleted post successfully')
                        router.push('/')
                    });
            },
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
            api.getPost(this.id, this.handleData);

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