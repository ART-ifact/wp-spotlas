<template>
    <v-container fluid>
        <v-layout wrap>
            <v-flex xs12 v-if="loading">
                <v-progress-circular indeterminate v-bind:size="50" color="teal"></v-progress-circular>
            </v-flex>
            <div v-if="locationdata" class="content">
                <v-container class="location ">
                    <h2 class="location-title">{{ locationdata.title.rendered }}</h2>
                    <span class="location-access " v-bind:class="locationdata.accesibility">
                        <span class="accessibility" v-bind:style="{ width: locationdata.accesibility + '0%' }"></span>
                    </span>
                    <v-layout>
                        <v-flex sm6 xs12 class="pa-3">
                            <v-carousel dark >
                                <v-carousel-item v-if="locationdata.images.length > 0" v-for="(image,i) in locationdata.images" v-bind:src="image.large"
                                    :key="i"></v-carousel-item>
                                <v-carousel-item v-if="locationdata.images.length < 1" v-bind:src="placeholderImage"></v-carousel-item>
                            </v-carousel>
                            <gmap-map v-if="locationdata" :center="locationdata.lng" :options="{styles: styles}" :zoom="14" style="width: 100%; min-height: 300px">
                                <gmap-marker :position="locationdata.lng" :clickable="false">
                                </gmap-marker>
                            </gmap-map>
                        </v-flex>

                        <v-flex sm6 xs12 class="pa-3">
                            <h4>Typ</h4>
                            <span>{{locationdata.type}}</span>
                            <h4>Kategorien</h4>
                            <span>{{locationdata.category}}</span>
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

                        </v-flex>
                    </v-layout>

                </v-container>
                <v-speed-dial fab small large dark absolute top right  class="btn-edit"  :direction="'bottom'" :hover="true"
                    :transition="'slide-y-reverse-transition'">
                    <v-btn slot="activator" color="teal darken-2" dark fab hover>
                        <v-icon>edit_location</v-icon>
                        <v-icon>close</v-icon>
                    </v-btn>
                    <v-btn :href="'/wordpress/edit/'+locationdata.id" fab dark small color="teal">
                        <v-icon>edit</v-icon>
                    </v-btn>
                    <v-btn @click.native="dialog = true" fab dark small color="red">
                        <v-icon>delete</v-icon>
                    </v-btn>
                </v-speed-dial>
                <v-dialog v-model="dialog" persistent max-width="380">
                    <v-card>
                        <v-card-title class="headline">You sure want to delete location {{ locationdata.title.rendered }} ?</v-card-title>
                        <v-card-actions>
                            <v-btn color="teal darken-1" @click.stop="dialog=false">Abort</v-btn>
                            <v-spacer></v-spacer>
                            <v-btn color="red darken-1" @click="deleteLocation">Delete</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

            </div>
        </v-layout>
    </v-container>
</template>

<script>
import router from '../router';
import {
    mapGetters
} from 'vuex'
import api from '../api'
import { Carousel, Slide } from 'vue-carousel';

export default {
    props: ['id'],
    components: {
        Carousel,
        Slide
    },
    data () {
        return {
        loading: false,
        locationdata: null,
        error: null,
        infoWinOpen: false,
        placeholderImage: '',
        dialog: false,
        styles: null
        }
    },

    methods: {
        handleData(data) {;
            this.locationdata = data;
            console.log(JSON.stringify(this.locationdata))
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
            axios.delete(path, {force:true})
            .then(function(response){
                console.log('deleted successfully')
            });
        },
        deletePost(id) {
            let _this = this;
                var path = window.SETTINGS.WPPATH + 'wp-json/wp/v2/posts/' + id + '?force=true';
                axios.delete(path, {force:true})
                .then(function(response){
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
        api.getPost(this.id, this.handleData);

    }
}
</script>

<style lang="scss">
    .location {
        .location-title {
            display: block;
        }

        .location-access {
            height: 5px;
            width: 100%;
            display: block;
            background: #363636;

            > span {
                height: 5px;
                background: green;
                display: inherit;
            }
        }

        h4 {
            display:block
        }
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