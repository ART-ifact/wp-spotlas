<template>
    <v-container fluid>
        <v-layout wrap>
            <div class="loading" v-if="loading">
                Loading...
            </div>
            <div v-if="locationdata" class="content">
                <v-container>
                    <h2 class="location-title">{{ locationdata.title.rendered }}</h2>
                    <span class="location-access " v-bind:class="locationdata.accesibility">
                        <span class="accessibility" v-bind:style="{ width: locationdata.accesibility + '0%' }"></span>
                    </span>
                    <v-flex sm6 xs12 class="pa-3">
                        <carousel :perPageCustom="[[1920, 1]]" :navigationEnabled="true">
                            <slide v-for="image in locationdata.images" :key="image.id">
                                <img :src="image.large">
                            </slide>
                        </carousel>
                        <gmap-map v-if="locationdata" :center="locationdata.lng" :zoom="14" style="width: 100%; min-height: 300px">
                            <gmap-marker :position="locationdata.lng" :clickable="true" @click="infoWinOpen=true">
                                <gmap-info-window :options="infoOptions" :position="infoWindowPos" :opened="infoWinOpen" @closeclick="infoWinOpen=false">
                                    <div class="infowindow">{{locationdata.title.rendered}}</div>
                                </gmap-info-window>
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
                                    <input type="checkbox" name="cloudy" class="weather-icon cloudy" :checked="locationdata.cloudy == 1" readonly>
                                    <label class="weather-label" for="cloudy"></label>
                                </v-flex>
                                <v-flex xs3>
                                    <input type="checkbox" name="foggy" class="weather-icon foggy" :checked="locationdata.foggy == 1" readonly>
                                    <label class="weather-label" for="foggy"></label>
                                </v-flex>
                                <v-flex xs3>
                                    <input type="checkbox" name="rainy" class="weather-icon rainy" :checked="locationdata.rainy == 1" readonly>
                                    <label class="weather-label" for="rainy"></label>
                                </v-flex>
                                <v-flex xs3>
                                    <input type="checkbox" name="sunny" class="weather-icon sunny" :checked="locationdata.sunny == 1" readonly>
                                    <label class="weather-label" for="sunny"></label>
                                </v-flex>
                            </v-layout>
                        </v-container>
                        <v-container fluid>
                            <v-layout wrap>
                                <v-flex xs3>
                                    <input type="checkbox" name="spring" class="season-icon spring" :checked="locationdata.spring == 1" readonly>
                                    <label class="season-label" for="spring"></label>
                                </v-flex>
                                <v-flex xs3>
                                    <input type="checkbox" name="summer" class="season-icon summer" :checked="locationdata.summer == 1" readonly>
                                    <label class="season-label" for="summer"></label>
                                </v-flex>
                                <v-flex xs3>
                                    <input type="checkbox" name="autumn" class="season-icon autumn" :checked="locationdata.autumn == 1" readonly>
                                    <label class="season-label" for="autumn"></label>
                                </v-flex>
                                <v-flex xs3>
                                    <input type="checkbox" name="winter" class="season-icon winter" :checked="locationdata.winter == 1" readonly>
                                    <label class="season-label" for="winter"></label>
                                </v-flex>
                            </v-layout>
                        </v-container>

                    </v-flex>
                </v-container>
                <a :href="'/wordpress/edit/'+locationdata.id" class="btn btn--absolute btn--floating btn--right btn--top theme--dark teal"
                    data-ripple="true">
                    <div class="btn__content">
                        <i aria-hidden="true" class="material-icons icon">mode_edit</i>
                    </div>
                </a>
            </div>
        </v-layout>
    </v-container>
</template>

<script>
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
        infoWinOpen: false
        }
    },

    methods: {
        handleData(data) {;
            this.locationdata = data;
            console.log('data.post:'+ data.locationdata)
            this.loading = false
        }
    },

    watch: {
        // call again the method if the route changes
        '$route': 'handleData'
    },

    created() {
        //this.$store.dispatch('getPost')
        this.loading = true
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