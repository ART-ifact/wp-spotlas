<template>
    <v-layout wrap>
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
                    <input type="hidden" name="latitude" :value="form.latitude" id="latitude">
                    <input type="hidden" name="longitude" :value="form.longitude" id="longitude">
                    <gmap-map :zoom="12" :center="map" :options="{styles: styles}" style="width: 100%; margin-bottom: 1rem; min-height: 300px">
                        <gmap-marker :position="marker" :clickable="true" :icon="marker_icon" :draggable="true" @dragend="getMarkerPosition($event.latLng)"></gmap-marker>
                    </gmap-map>
                    <v-text-field dark color="teal" multi-line label="Descriptiontext" v-model="form.description" :rules="descriptionRules" :disabled="sending" required></v-text-field>
                </v-flex>
                <v-flex md6 xs12 class="pa-3">
                    <v-text-field dark color="teal" :class="errors.has('title') ? error : valid" label="Location Name" v-model="form.title" :rules="titleRules" :disabled="sending" required>
                    </v-text-field>
                    <h4>Accesibillity</h4>
                    <v-slider color="teal" min="1" max="10" thumb-label ticks="ticks" :disabled="sending" v-model="form.accessibility"></v-slider>
                    <v-select v-bind:items="type" v-model="form.type" label="Type" dark item-value="text" :disabled="sending" required :rules="typeRules"></v-select>
                    <v-select v-bind:items="category" v-model="form.category" label="Category" dark item-value="text" :disabled="sending" required :rules="categoryRules"></v-select>
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
    import router from "../router";
    import RangeSlider from "vue-range-slider";
    import EXIF from "exif-js";
    import {
        mapGetters
    } from "vuex";
    import api from "../api";

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
            type: [{
                    text: "Industry"
                },
                {
                    text: "Outdoor"
                },
                {
                    text: "Architecture"
                },
                {
                    text: "Monument"
                }
            ],
            category: [{
                    text: "building"
                },
                {
                    text: "landscape"
                },
                {
                    text: "urban"
                },
                {
                    text: "water"
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
            titleRules: [v => !!v || "Title is required"],
            descriptionRules: [v => !!v || "Title is required"],
            typeRules: [v => !!v || "Type is required"],
            categoryRules: [v => !!v || "Category is required"]
        }),
        methods: {
            saveForm() {
                if (this.$refs.form.validate()) {
                    console.log(this.form);
                    var path = window.SETTINGS.THEMEURL + "/formhandlers/add-location.php";
                    var formData = new FormData();
                    formData.append("title", this.form.title);
                    formData.append("type", this.form.type);
                    formData.append("category", this.form.category);
                    formData.append("accesibility", this.form.accessibility);
                    formData.append("lat", this.form.latitude);
                    formData.append("lng", this.form.longitude);
                    formData.append("images", JSON.stringify(this.form.images));
                    formData.append("sunny", this.form.sunny);
                    formData.append("cloudy", this.form.cloudy);
                    formData.append("foggy", this.form.foggy);
                    formData.append("rainy", this.form.rainy);
                    formData.append("spring", this.form.spring);
                    formData.append("summer", this.form.summer);
                    formData.append("autumn", this.form.autumn);
                    formData.append("winter", this.form.winter);
                    formData.append("description", this.form.description);

                    axios
                        .post(path, formData)
                        .then(function(response) {
                            router.push("/grid/");
                        })
                        .catch(function(e) {
                            console.log(e);
                        });
                }
            },
            getIconPaths() {
                this.marker_icon.url =
                    window.SETTINGS.THEMEURL + "/dist/assets/img/marker.svg";
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
                            var latitude = _this.toDecimal(EXIF.getTag(this, "GPSLatitude"));
                            var longitude = _this.toDecimal(EXIF.getTag(this, "GPSLongitude"));
                            _this.updateMap(longitude, latitude);
                        }
                    });

                    _this.upload(file);
                }
            },
            upload(fileInput) {
                let _this = this;
                var formData = new FormData();
                var xhr = new XMLHttpRequest();
                _this.sending = true;

                formData.append("action", "upload-attachment");
                formData.append("async-upload", fileInput);
                formData.append("name", fileInput.name);
                formData.append("_wpnonce", window.SETTINGS.NONCE);

                xhr.onreadystatechange = function() {
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        if (xhr.responseText) {
                            console.log(xhr.responseText);
                            var response = window.$.parseJSON(xhr.responseText);
                            console.log(xhr.responseText)

                            var pictureURLLarge = response.data.sizes.full.url;
                            var pictureURLThumb = response.data.sizes.thumbnail.url;
                            var tmp_obj = {
                                id: response.data.id,
                                large: pictureURLLarge,
                                thumb: pictureURLThumb
                            };

                            _this.form.images.push(tmp_obj);

                            _this.fileinput = null;
                            _this.sending = false;
                        }
                    }
                };

                var uploadPath = window.SETTINGS.WPPATH + "wp-admin/async-upload.php";
                xhr.open("POST", uploadPath, true);
                xhr.send(formData);
            },
            toDecimal(number) {
                return (
                    number[0].numerator +
                    number[1].numerator / (60 * number[1].denominator) +
                    number[2].numerator / (3600 * number[2].denominator)
                );
            },
            deleteImage(imageID) {
                let _this = this;
                var path = window.SETTINGS.WPPATH + 'wp-json/wp/v2/media/' + imageID + '?force=true';
                if (path !== undefined) {
                    axios.delete(path, {
                        force: true
                    }).then(function(response) {
                        console.log("deleted successfully");
                        _this.deleteImageFromArray(imageID);
                    });
                } else {
                    console.log('Path undefined');
                }
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
            this.styles = window.SETTINGS.mapStyles;
            this.loading = false;
            this.getIconPaths();
        }
    };
</script>

<style lang="scss">
    h4 {
        margin-bottom: 25px;
    }
</style>