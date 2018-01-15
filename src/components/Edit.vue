<template>
    <v-layout row wrap>
        <v-flex xs12 v-if="loading">
            <v-progress-circular indeterminate v-bind:size="50" color="teal"></v-progress-circular>
        </v-flex>
        <v-form class="xs12 flex" @submit.prevent="saveForm" v-model="valid" ref="form" lazy-validation>
            <v-layout row wrap>
                <v-flex md6 xs12 class="pa-3">
                    <md-field>
                        <label>{{ $t('message.selectPicture') }}</label>
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

                    <div class="map-search-input">
                        <gmap-autocomplete class="grey darken-3" @place_changed="setPlace"></gmap-autocomplete>
                    </div>
                    <gmap-map :zoom="12" v-if="form.lng" :center="form.lng" :options="{styles: styles}" style="width: 100%; min-height: 300px; margin-bottom: 1rem;">
                        <gmap-marker :position="form.lng" :clickable="true" :icon="marker_icon" :draggable="true" @dragend="getMarkerPosition($event.latLng)"></gmap-marker>
                    </gmap-map>
                    <v-flex x12>
                        <v-btn
                        :loading="gettingLocation"
                        @click.native="getCurrentLocation();gettingLocation = true"
                        color="teal"
                        class="white--text full-width"
                        >
                            <v-icon left dark>my_location</v-icon>
                            {{ $t('message.getCurrentLocation') }}
                        </v-btn>
                    </v-flex>
                    <v-text-field dark color="teal" multi-line v-bind:label="$t('message.note')" v-model="form.description" required :rules="descriptionRules"></v-text-field>
                </v-flex>
                <v-flex md6 xs12 class="pa-3">
                    <v-text-field dark color="teal" v-bind:label="$t('message.locationName')" v-model="form.title" :rules="titleRules" :disabled="sending"></v-text-field>

                    <h4>{{ $t('message.accesibillity') }}</h4>

                    <v-slider color="teal" min="1" max="10" thumb-label ticks="ticks" v-model="form.accessibility" :disabled="sending"></v-slider>

                    <v-select v-model="form.type" v-bind:label="$t('message.type')" chips color="teal" dark :items="type" multiple :disabled="sending" required :rules="categoryRules">
                        <template slot="selection" slot-scope="data">
                            <v-chip @input="data.parent.selectItem(data.item)" class="chip--select-multi" text-color="white" color="blue-grey darken-2"
                                :key="JSON.stringify(data.item)" dark close>
                                {{ data.item.text }}
                            </v-chip>
                        </template>
                    </v-select>

                    <v-select v-bind:items="category" v-model="form.category" v-bind:label="$t('message.category')" dark color="teal" item-value="value" item-text="text" :disabled="sending" required :rules="categoryRules"></v-select>

                    <h4>{{ $t('message.wheather') }}</h4>
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


                    <h4>{{ $t('message.seasons') }}</h4>
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
                <v-container fluid>
                    <v-layout>
                        <v-flex xs12 sm6>
                            <v-switch color="teal" v-bind:label="'Share the Location'" @change="handleShare()" v-model="form.shared"></v-switch>
                        </v-flex>
                        <v-flex xs12 sm6>
                            <v-text-field v-if="this.form.shared" dark color="teal" v-bind:label="'Shared URL'" v-model="shareURL" :disabled="sending" readonly></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout>
                        <v-flex xs12 sm3 md2 class="text-xs-left">
                            <v-btn dark color="blue-grey darken-3" :disabled="sending" @click="cancel()">{{ $t('message.cancel') }}</v-btn>
                        </v-flex>
                        <v-flex xs12 sm3 md2 offset-xs0 offset-sm6 offset-md8 class="text-xs-right">
                            <v-btn color="teal" dark name="wp-submit" :disabled="sending" type="submit">{{ $t('message.save') }}</v-btn>
                        </v-flex>
                    </v-layout>
                </v-container>
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
                description: '',
                hash: '',
                shared: false
            },
            type: [{
                    text: "Industry",
                    value: "Industry",
                },
                {
                    text: "Outdoor",
                    value: "Outdoor"
                },
                {
                    text: "Architecture",
                    value: "Architecture"
                },
                {
                    text: "Monument",
                    value: "Monument"
                }
            ],
            category: [{
                    text: "building",
                    value: "building"
                },
                {
                    text: "landscape",
                    value: "landscape"
                },
                {
                    text: "urban",
                    value: "urban"
                },
                {
                    text: "water",
                    value: "water"
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
            gettingLocation: false,
            tempImg: [],
            shareURL: '',
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
                this.form.hash = this.form.hash;
                this.form.shared = JSON.parse(this.form.shared);

                if (this.form.shared === true) {
                    this.shareURL = data.shareURL;
                }

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
                    helper.createSuccessMessage(this.$root,this.$t('message.locationSaved'), 2500)
                    router.push('/location/' + this.form.id);
                } else {
                    console.error(response);
                    helper.createErrorMessage(this.$root,response.data, 20000)
                }
            },
            handleShare() {
                if(this.form.shared === false) {
                    this.shareURL = '';
                    this.form.hash = '';
                } else {
                    var hash = helper.generateHash();
                    this.form.hash = hash;
                    this.shareURL = helper.getShareURL(this.form.id, hash);
                }
            },
            getCurrentLocation() {
                let _this = this;
                _this.gettingLocation = true;
                helper.getCurrentLocation(_this.updateMap);
            },
            getMarkerPosition(marker) {
                let _this = this
                _this.map = marker;
                var markerObject = JSON.parse(JSON.stringify(marker));
                _this.form.latitude = JSON.stringify(markerObject.lat);
                _this.form.longitude = JSON.stringify(markerObject.lng);

            },
            setPlace(place) {
                this.updateMap(place.geometry.location.lng(),place.geometry.location.lat());
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
                _this.form.lng = _this.marker
                _this.gettingLocation = false;
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
                var tmp_obj = helper.buildImageObject(api_response.data);

                this.form.images.push(tmp_obj);
                this.tempImg.push(tmp_obj);

                console.log(this.tempImg);

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
                helper.createSuccessMessage(this.$root,this.$t('message.deletedImageSucess'), 2500)
            },
            cancel() {
                if (this.form.images.length > 0) {
                    for (let index = 0; index < this.tempImg.length; index++) {
                        const imageID = this.tempImg[index].id;
                        this.deleteImage(imageID);
                    }
                    this.tempImg = [];
                    router.go(-1);
                } else {
                    router.go(-1);
                }
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
            this.type = helper.createTranslatedTypeObject(this.$t('message.industry'), this.$t('message.historic'), this.$t('message.panorama'), this.$t('message.sunrise'), this.$t('message.sunset'), this.$t('message.outdoor'), this.$t('message.architecture'), this.$t('message.monument'));
            this.category = helper.createTranslatedCategoryObject(this.$t('message.building'),this.$t('message.landscape'), this.$t('message.urban'), this.$t('message.water'));
            api.getPost(this.id, this.handleData);
            this.$root.$children[0]._data.showBackButton = false;

        }
    }
</script>

<style lang="scss">
    h4 {
        margin-bottom: 25px;
    }
</style>