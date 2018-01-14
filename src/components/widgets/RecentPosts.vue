<template>
    <v-layout row wrap>
        <v-flex xs12 v-if="!recentPosts">
            <v-progress-circular indeterminate v-bind:size="50" color="teal"></v-progress-circular>
        </v-flex>
        <v-flex class="pa-2" md3 sm6 xs12 v-for="post in recentPosts" :key="post.id">
            <v-card color="dark darken-2" class="white--text">
                <router-link v-bind:to="'/location/'+post.id">
                    <div class="meta-data">
                        <v-container fluid>
                            <v-layout wrap>
                                <v-flex xs3>
                                    <input type="checkbox" name="cloudy" class="weather-icon cloudy" :checked="post.cloudy == 'true'" readonly>
                                    <label class="weather-label" for="cloudy"></label>
                                </v-flex>
                                <v-flex xs3>
                                    <input type="checkbox" name="foggy" class="weather-icon foggy" :checked="post.foggy == 'true'" readonly>
                                    <label class="weather-label" for="foggy"></label>
                                </v-flex>
                                <v-flex xs3>
                                    <input type="checkbox" name="rainy" class="weather-icon rainy" :checked="post.rainy == 'true'" readonly>
                                    <label class="weather-label" for="rainy"></label>
                                </v-flex>
                                <v-flex xs3>
                                    <input type="checkbox" name="sunny" class="weather-icon sunny" :checked="post.sunny == 'true'" readonly>
                                    <label class="weather-label" for="sunny"></label>
                                </v-flex>
                            </v-layout>
                        </v-container>
                        <v-container fluid>
                            <v-layout wrap>
                                <v-flex xs3>
                                    <input type="checkbox" name="spring" class="season-icon spring" :checked="post.spring == 'true'" readonly>
                                    <label class="season-label" for="spring"></label>
                                </v-flex>
                                <v-flex xs3>
                                    <input type="checkbox" name="summer" class="season-icon summer" :checked="post.summer == 'true'" readonly>
                                    <label class="season-label" for="summer"></label>
                                </v-flex>
                                <v-flex xs3>
                                    <input type="checkbox" name="autumn" class="season-icon autumn" :checked="post.autumn == 'true'" readonly>
                                    <label class="season-label" for="autumn"></label>
                                </v-flex>
                                <v-flex xs3>
                                    <input type="checkbox" name="winter" class="season-icon winter" :checked="post.winter == 'true'" readonly>
                                    <label class="season-label" for="winter"></label>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </div>
                    <v-card-media height="200px">
                        <div v-if="post.images.length > 0" v-for="image in post.images.slice(0,1)" :key="image.id">
                            <img :src="image.large" :key="image.large" class="leaderimg">

                        </div>
                        <img v-if="post.images.length < 1" :src="placeholderImage">
                    </v-card-media>
                    <v-card-title primary-title>
                        <div>
                            <h3 class="headline mb-0">
                                <v-icon v-if="post.category == 'landscape'">local_florist</v-icon>
                                <v-icon v-if="post.category == 'building'">home</v-icon>
                                <v-icon v-if="post.category == 'urban'">location_city</v-icon>
                                <v-icon v-if="post.category == 'water'">directions_boat</v-icon>
                                {{ post.title.rendered }}
                            </h3>
                        </div>
                    </v-card-title>
                </router-link>
            </v-card>
        </v-flex>
    </v-layout>
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
        data: {
            placeholderImage: ''
        },

        mounted() {
            let _this = this;
            _this.placeholderImage = window.SETTINGS.THEMEURL + '/dist/assets/img/location-standard.jpg';
            this.$store.dispatch('getPosts')
        },

        created() {
            this.$root.$children[0]._data.showBackButton = false;
        }
    }
</script>

<style lang="scss" scoped>
    .card-expansion {
        height: 480px;
    }

    .md-card {
        width: 320px;
        margin: 4px;
        display: inline-block;
        vertical-align: top;
        .md-card-media {
            height: 200px;
            overflow: hidden;
            img {
                position: absolute;
                top: 0;
                bottom: 0;
                margin: auto;
            }
        }
    }
</style>