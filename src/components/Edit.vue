<template>
    <v-layout row wrap>
        <v-flex xs12 v-if="loading">
            <v-progress-circular indeterminate v-bind:size="50" color="teal"></v-progress-circular>
        </v-flex>
        <v-form class="xs12 flex" @submit.prevent="saveForm" v-model="valid" ref="form" lazy-validation>
            <v-layout row wrap>
                <v-flex md6 xs12 class="pa-3">
                    <md-field>
                        <label>Select a picture</label>
                        <md-file single v-model="fileinput" accept="image/*" @change="uploadImage($event)" />
                    </md-field>
                    <div class="imagebox">
                        <ul>
                            <li :key="index" v-for="(image, index) in form.images">
                                <img v-bind:src="image.thumb" alt="" />
                                <span type="button" v-on:click="deleteImage(image.id)">
                                    <v-icon dark>delete</v-icon>
                                </span>
                            </li>
                        </ul>
                    </div>

                    <input type="hidden" name="latitude" :value="form.longitude" id="latitude">
                    <input type="hidden" name="longitude" :value="form.latitude" id="longitude">

                    <gmap-map :zoom="12" v-if="form.lng" :center="form.lng" :options="{styles: styles}" style="width: 100%; min-height: 300px">
                        <gmap-marker :position="form.lng" :clickable="true" :icon="marker_icon" :draggable="true" @dragend="getMarkerPosition($event.latLng)"></gmap-marker>
                    </gmap-map>
                    <v-text-field dark color="teal" multi-line label="Descriptiontext" v-model="form.description" required :rules="descriptionRules"></v-text-field>
                </v-flex>
                <v-flex md6 xs12 class="pa-3">
                    <v-text-field dark color="teal" label="Location Name" v-model="form.title" :rules="titleRules" :disabled="sending"></v-text-field>

                    <h4>Accesibillity</h4>

                    <v-slider color="teal" min="1" max="10" thumb-label ticks="ticks" v-model="form.accessibility" :disabled="sending"></v-slider>

                    <v-select v-bind:items="type" v-model="form.type" label="Type" dark color="teal" item-value="text" :disabled="sending" required :rules="typeRules"></v-select>

                    <v-select v-bind:items="category" v-model="form.category" label="Category" dark color="teal" item-value="text" :disabled="sending" required :rules="categoryRules"></v-select>

                    <h4>Wheather</h4>
                    <v-container fluid>
                        <v-layout wrap>
                            <v-flex xs3>
                                <input type="checkbox" name="cloudy" class="weather-icon cloudy" v-model="form.cloudy" id="cloudy" :disabled="sending">
                                <label class="weather-label" for="cloudy"></label>
                            </v-flex>
                            <v-flex xs3>
                                <input type="checkbox" name="foggy" class="weather-icon foggy" v-model="form.foggy" id="foggy" :disabled="sending">
                                <label class="weather-label" for="foggy"></label>
                            </v-flex>
                            <v-flex xs3>
                                <input type="checkbox" name="rainy" class="weather-icon rainy" v-model="form.rainy" id="rainy" :disabled="sending">
                                <label class="weather-label" for="rainy"></label>
                            </v-flex>
                            <v-flex xs3>
                                <input type="checkbox" name="sunny" class="weather-icon sunny" v-model="form.sunny" id="sunny" :disabled="sending">
                                <label class="weather-label" for="sunny"></label>
                            </v-flex>

                        </v-layout>
                    </v-container>


                    <h4>Seasons</h4>
                    <v-container fluid>
                        <v-layout wrap>
                            <v-flex xs3>
                                <input type="checkbox" name="spring" class="season-icon spring" v-model="form.spring" id="spring" :disabled="sending">
                                <label class="season-label" for="spring"></label>
                            </v-flex>
                            <v-flex xs3>
                                <input type="checkbox" name="summer" class="season-icon summer" v-model="form.summer" id="summer" :disabled="sending">
                                <label class="season-label" for="summer"></label>
                            </v-flex>
                            <v-flex xs3>
                                <input type="checkbox" name="autumn" class="season-icon autumn" v-model="form.autumn" id="autumn" :disabled="sending">
                                <label class="season-label" for="autumn"></label>
                            </v-flex>
                            <v-flex xs3>
                                <input type="checkbox" name="winter" class="season-icon winter" v-model="form.winter" id="winter" :disabled="sending">
                                <label class="season-label" for="winter"></label>
                            </v-flex>
                        </v-layout>
                    </v-container>

                </v-flex>
                <v-snackbar :timeout="2500" :multi-line="mode === 'multi-line'" :vertical="mode === 'vertical'" v-model="showSnackbar">
                    Successfull deleted Image
                    <v-btn dark flat @click.native="showSnackbar = false">Close</v-btn>
                </v-snackbar>
                <v-flex x1 offset-xs10>
                    <v-btn color="teal" dark name="wp-submit" type="submit">Save</v-btn>
                </v-flex>
            </v-layout>
        </v-form>
    </v-layout>
</template>

<script>
    import router from '../router';
    import RangeSlider from 'vue-range-slider'
    import EXIF from 'exif-js'
    import {
        validationMixin
    } from 'vuelidate'
    import {
        required,
        email,
        minLength,
        maxLength
    } from 'vuelidate/lib/validators'
    import {
        mapGetters
    } from 'vuex'
    import api from '../api'
    import helper from '../helper'


    export default {
        props: ['id'],
        name: 'FormValidation',
        mixins: [validationMixin],
        components: {
            RangeSlider
        },
        data: () => ({
            form: {
                id: 0,
                title: '',
                type: null,
                category: null,
                accessibility: 0,
                email: null,
                latitude: 0,
                longitude: 0,
                lng: null,
                images: [],
                sunny: false,
                cloudy: false,
                foggy: false,
                rainy: false,
                spring: false,
                summer: false,
                autumn: false,
                winter: false,
                description: ''
            },
            type: [{
                    text: 'Industry'
                },
                {
                    text: 'Outdoor'
                },
                {
                    text: 'Architecture'
                },
                {
                    text: 'Monument'
                }
            ],
            category: [{
                    text: 'Building'
                },
                {
                    text: 'Landscape'
                },
                {
                    text: 'Urban'
                },
                {
                    text: 'Water'
                }
            ],
            ticks: true,
            mode: '',
            map: null,
            marker: null,
            locationSaved: false,
            sending: false,
            fileinput: null,
            showSnackbar: false,
            styles: null,
            valid: true,
            marker_icon: {
                url: ''
            },
            titleRules: [
                (v) => !!v || 'Title is required'
            ],
            descriptionRules: [
                (v) => !!v || 'Title is required'
            ],
            typeRules: [
                (v) => !!v || 'Type is required'
            ],
            categoryRules: [
                (v) => !!v || 'Category is required'
            ],
        }),
        validations: {
            form: {
                title: {
                    required,
                    minLength: minLength(3)
                },
                type: {
                    required
                },
                category: {
                    required
                },
            }
        },

        methods: {
            handleData(data) {;
                this.form = data;
                this.form.id = this.form.id;
                this.form.lng = data.lng
                this.form.latitude = this.form.lng.lat;
                this.form.longitude = this.form.lng.lng;
                this.form.title = this.form.title.rendered;
                this.form.description = this.form.content.rendered.replace(/<\/?p[^>]*>/g, "");
                this.form.accessibility = this.form.accesibility;
                this.form.rainy = JSON.parse(this.form.rainy);
                this.form.sunny = JSON.parse(this.form.sunny);
                this.form.cloudy = JSON.parse(this.form.cloudy);
                this.form.foggy = JSON.parse(this.form.foggy);
                this.form.summer = JSON.parse(this.form.summer);
                this.form.winter = JSON.parse(this.form.winter);
                this.form.autumn = JSON.parse(this.form.autumn);
                this.form.spring = JSON.parse(this.form.spring);

                this.loading = false
            },
            saveForm() {
                if (this.$refs.form.validate()) {
                    var formData = helper.buildFormData(this.form, true);

                    api.editLocation(formData,this.afterSave);
                }
            },
            afterSave(response) {
                if (response.status === 200) {
                    router.push('/location/' + this.form.id);
                } else {
                    console.error(response);
                }
            },
            getMarkerPosition(marker) {
                let _this = this
                _this.map = marker;
                var markerObject = JSON.parse(JSON.stringify(marker));
                _this.form.latitude = JSON.stringify(markerObject.lat);
                _this.form.longitude = JSON.stringify(markerObject.lng);

            },
            updateMap(longitude, latitude) {
                let _this = this
                _this.map = {
                    lat: latitude,
                    lng: longitude
                }
                _this.marker = {
                    lat: latitude,
                    lng: longitude
                }
                _this.form.latitude = latitude
                _this.form.longitude = longitude
            },

            uploadImage(event) {
                var file = event.target.files[0];
                let _this = this;

                EXIF.getData(file, function() {
                    if (EXIF.getTag(this, 'GPSLatitude') && EXIF.getTag(this, 'GPSLongitude')) {
                        var latitude = helper.toDecimal(EXIF.getTag(this, 'GPSLatitude'));
                        var longitude = helper.toDecimal(EXIF.getTag(this, 'GPSLongitude'));
                        _this.updateMap(longitude, latitude);
                    }
                });

                _this.upload(file);
            },
            upload(fileInput) {
                let _this = this;
                _this.sending = true;
                var mediaForm = helper.buildMediaData(fileInput);

                api.uploadMedia(mediaForm,this.updateImageArray)
            },
            updateImageArray(api_response) {
                api_response = api_response.data;

                var pictureURLLarge = api_response.sizes.full.url;
                var pictureURLThumb = api_response.sizes.thumbnail.url;
                var tmp_obj = {
                    id: api_response.id,
                    large: pictureURLLarge,
                    thumb: pictureURLThumb
                };

                this.form.images.push(tmp_obj);

                this.fileinput = null;
                this.sending = false;
            },
            deleteImage(imageID) {
                api.deleteMedia(imageID,this.deleteImageFromArray);
            },
            deleteImageFromArray(imageID) {
                let _this = this
                for (var i = 0; i < _this.form.images.length; i++) {
                    if (_this.form.images[i].id == imageID) {
                        _this.form.images.splice(i, 1);
                        break;
                    }
                }
                _this.showSnackbar = true;
            }

        },

        watch: {
            // call again the method if the route changes
            // '$route': 'handleData'
        },

        created() {
            //this.$store.dispatch('getPost')
            this.styles = window.SETTINGS.mapStyles
            this.loading = true
            let _this = this;
            _this.placeholderImage = window.SETTINGS.THEMEURL + '/dist/assets/img/location-standard.jpg';
            console.log(this.id)
            this.marker_icon.url = helper.getIconPaths();
            api.getPost(this.id, this.handleData);


        }
    }
</script>

<style lang="scss">
    h4 {
        margin-bottom: 25px;
    }
</style>