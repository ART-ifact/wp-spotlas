<template>
    <v-layout wrap>
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
                    <input type="hidden" name="latitude" :value="form.latitude" id="latitude">
                    <input type="hidden" name="longitude" :value="form.longitude" id="longitude">
                    <gmap-map :zoom="12" :center="map" :options="{styles: styles}" style="width: 100%; margin-bottom: 1rem; min-height: 300px">
                        <gmap-marker :position="marker" :clickable="true" :icon="marker_icon" :draggable="true" @dragend="getMarkerPosition($event.latLng)"></gmap-marker>
                    </gmap-map>
                    <v-flex x12>
                        <v-btn :loading="gettingLocation" @click.native="getCurrentLocation();gettingLocation = true" color="teal" class="white--text full-width">
                            <v-icon left dark>my_location</v-icon>
                            {{ $t('message.getCurrentLocation') }}
                        </v-btn>
                    </v-flex>
                    <v-text-field dark color="teal" multi-line v-bind:label="$t('message.note')" v-model="form.description" :rules="descriptionRules"
                        :disabled="sending" required></v-text-field>
                </v-flex>
                <v-flex md6 xs12 class="pa-3">
                    <v-text-field dark color="teal" :class="errors.has('title') ? error : valid" v-bind:label="$t('message.locationName')" v-model="form.title"
                        :rules="titleRules" :disabled="sending" required>
                    </v-text-field>
                    <h4>{{ $t('message.accesibillity') }}</h4>
                    <v-slider color="teal" min="1" max="10" thumb-label ticks="ticks" :disabled="sending" v-model="form.accessibility"></v-slider>

                    <v-select v-model="form.type" v-bind:label="$t('message.type')" chips color="teal" dark :items="type" multiple :disabled="sending" required :rules="categoryRules">
                        <template slot="selection" slot-scope="data">
                            <v-chip @input="data.parent.selectItem(data.item)" class="chip--select-multi" text-color="white" color="blue-grey darken-2"
                                :key="JSON.stringify(data.item)" dark close>
                                {{ data.item.text }}
                            </v-chip>
                        </template>
                    </v-select>

                    <v-select v-bind:items="category" v-model="form.category" v-bind:label="$t('message.category')" color="teal" dark item-value="value"
                        item-text="text" :disabled="sending" required :rules="typeRules"></v-select>

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
                <v-snackbar :timeout="2500" :multi-line="mode === 'multi-line'" :vertical="mode === 'vertical'" v-model="showSnackbar">
                    {{ $t('message.deletedImageSucess') }}
                    <v-btn dark flat @click.native="showSnackbar = false">{{ $t('message.close') }}</v-btn>
                </v-snackbar>
                <v-flex x1 offset-xs10>
                    <v-btn color="teal" dark name="wp-submit" type="submit">{{ $t('message.save') }}</v-btn>
                </v-flex>
            </v-layout>
        </v-form>
    </v-layout>
</template>

<script>
    import router from "../router";
    import RangeSlider from "vue-range-slider";
    import EXIF from "exif-js";
    import {
        mapGetters
    } from "vuex";
    import api from "../api";
    import helper from "../helper";

    export default {
        components: {
            RangeSlider
        },
        data: () => ({
            form: {
                title: "",
                type: null,
                category: null,
                accessibility: 0,
                email: null,
                latitude: 0,
                longitude: 0,
                images: [],
                sunny: false,
                cloudy: false,
                foggy: false,
                rainy: false,
                spring: false,
                summer: false,
                autumn: false,
                winter: false,
                description: ""
            },
            type: [],
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
            marker_icon: {
                url: ""
            },
            ticks: true,
            mode: "",
            map: null,
            marker: null,
            locationSaved: false,
            sending: false,
            fileinput: null,
            showSnackbar: false,
            styles: null,
            valid: false,
            gettingLocation: false,
            titleRules: [v => !!v || "Title is required"],
            descriptionRules: [v => !!v || "Title is required"],
            typeRules: [v => !!v || "Type is required"],
            categoryRules: [v => !!v || "Category is required"]
        }),
        methods: {
            saveForm() {
                if (this.$refs.form.validate()) {
                    console.log(this.form);
                    var formData = helper.buildFormData(this.form,false);

                    api.addLocation(formData,this.afterSave)
                }
            },
            afterSave(response) {
                if (response.status === 200) {
                    router.push("/grid/")
                } else {
                    console.error(response);
                }
            },
            getCurrentLocation() {
                let _this = this;
                _this.gettingLocation = true;
                helper.getCurrentLocation(_this.updateMap);
            },
            getMarkerPosition(marker) {
                let _this = this;
                _this.map = marker;
                var markerObject = JSON.parse(JSON.stringify(marker));
                _this.form.latitude = JSON.stringify(markerObject.lat);
                _this.form.longitude = JSON.stringify(markerObject.lng);
            },
            updateMap(longitude, latitude) {
                let _this = this;
                _this.map = {
                    lat: latitude,
                    lng: longitude
                };
                _this.marker = {
                    lat: latitude,
                    lng: longitude
                };
                _this.form.latitude = latitude;
                _this.form.longitude = longitude;
                _this.gettingLocation = false;
            },

            uploadImage(event) {
                console.log(event.target.files);
                if (event !== undefined) {
                    const file = event.target.files[0];
                    let _this = this;

                    EXIF.getData(file, function() {
                        if (
                            EXIF.getTag(this, "GPSLatitude") &&
                            EXIF.getTag(this, "GPSLongitude")
                        ) {
                            var latitude = helper.toDecimal(EXIF.getTag(this, "GPSLatitude"));
                            var longitude = helper.toDecimal(EXIF.getTag(this, "GPSLongitude"));
                            _this.updateMap(longitude, latitude);
                        }
                    });

                    _this.upload(file);
                }
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

                this.fileinput = null;
                this.sending = false;
            },
            deleteImage(imageID) {
                api.deleteMedia(imageID,this.deleteImageFromArray);
            },
            deleteImageFromArray(imageID) {
                let _this = this;
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
            $route: "handleData"
        },

        created() {
            //this.$store.dispatch('getPost')
            this.map = window.SETTINGS.MAPCENTER;
            this.marker = this.mapCenter = window.SETTINGS.MAPCENTER;
            console.log(this.marker);
            this.form.longitude = this.marker.lng;
            this.form.latitude = this.marker.lat;
            this.styles = window.SETTINGS.mapStyles;
            this.marker_icon.url = helper.getIconPaths();
            this.type = helper.createTranslatedTypeObject(this.$t('message.industry'), this.$t('message.historic'), this.$t('message.panorama'), this.$t('message.sunrise'), this.$t('message.sunset'), this.$t('message.outdoor'), this.$t('message.architecture'), this.$t('message.monument'));
            this.category = helper.createTranslatedCategoryObject(this.$t('message.building'),this.$t('message.landscape'), this.$t('message.urban'), this.$t('message.water'));
            this.loading = false;
            this.$root.$children[0]._data.showBackButton = false;
        }
    };
</script>

<style lang="scss">
    h4 {
        margin-bottom: 25px;
    }
</style>