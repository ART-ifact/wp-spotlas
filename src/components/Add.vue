<template>
<div class="location">
    <div class="loading" v-if="loading">
        Loading...
    </div>
    <div class="content">
        <b-container class="bv-example-row">
            <form novalidate class="md-layout-row md-gutter" @submit.prevent="saveForm">
                <b-row>
                    <b-col cols="12" md="6">
                        <md-field>
                            <label>Select a picture</label>
                            <md-file single v-model="fileinput" accept="image/*" @change="uploadImage($event)"/>
                        </md-field>

                        <div class="imagebox">
                            <ul>
                                <li :key="index" v-for="(image, index) in form.images">
                                    <img v-bind:src="image.thumb" alt="" />
                                    <span type="button" v-on:click="deleteImage(image.id)">
                                        <i  class="md-icon md-icon-font md-theme-default">delete</i>
                                    </span>
                                </li>
                            </ul>
                        </div>

                        <input type="hidden" name="latitude" :value="form.latitude" id="latitude">
                        <input type="hidden" name="longitude" :value="form.longitude" id="longitude">
                        
                        <gmap-map :zoom="14" :center="map" style="width: 100%; min-height: 300px">
                            <gmap-marker :position="marker" :clickable="true" :draggable="true" @dragend="getMarkerPosition($event.latLng)"></gmap-marker>
                        </gmap-map>
                        <md-field>
                        <label>Textarea</label>
                            <md-textarea v-model="form.description" required></md-textarea>
                            <span class="md-helper-text">Helper text</span>
                            <span class="md-error">There is an error</span>
                        </md-field>
                    </b-col>

                    <b-col cols="12" md="6">
                        <md-field :class="getValidationClass('locationName')">
                            <label for="title">Location Name</label>
                            <md-input name="title" id="title" v-model="form.title" :disabled="sending"
                            />
                            
                        </md-field>

                        <h4>Accesibillity</h4>
                        <range-slider
                            class="slider"
                            min="0"
                            max="10"
                            step="1"
                            v-model="form.accessibility">
                        </range-slider>
                        <md-field :class="getValidationClass('type')">
                            <label for="type">Type</label>
                            <md-select name="type" id="type" v-model="form.type" md-dense :disabled="sending">
                                <md-option></md-option>
                                <md-option value="Industry">Industry</md-option>
                                <md-option value="Outdoor">Outdoor</md-option>
                                <md-option value="Architecture">Architecture</md-option>
                                <md-option value="Monument">Monument</md-option>
                            </md-select>
                            <span class="md-error">The type is required</span>
                        </md-field>
                        <md-field :class="getValidationClass('category')">
                            <label for="category">Category</label>
                            <md-select name="category" id="category" v-model="form.category" md-dense :disabled="sending">
                                <md-option></md-option>
                                <md-option value="building">Building</md-option>
                                <md-option value="landscape">Landscape</md-option>
                                <md-option value="urban">Urban</md-option>
                                <md-option value="water">Water</md-option>
                            </md-select>
                            <span class="md-error">The category is required</span>
                        </md-field>
                            <h4>Wheather</h4>
                        <b-row>
                            <b-col>
                                <input type="checkbox" name="cloudy" class="weather-icon cloudy" value="true" v-model="form.cloudy" id="cloudy">
                                <label class="weather-label" for="cloudy"></label>
                            </b-col>
                            <b-col>
                                <input type="checkbox" name="foggy" class="weather-icon foggy" value="true" v-model="form.foggy" id="foggy">
                                <label class="weather-label" for="foggy"></label>
                            </b-col>
                            <b-col>
                                <input type="checkbox" name="rainy" class="weather-icon rainy" value="true" v-model="form.rainy" id="rainy">
                                <label class="weather-label" for="rainy"></label>
                            </b-col>
                            <b-col>
                                <input type="checkbox" name="sunny" class="weather-icon sunny" value="true" v-model="form.sunny" id="sunny">
                                <label class="weather-label" for="sunny"></label>
                            </b-col>
                        </b-row>
                        <h4>Seasons</h4>
                        <b-row>
                            <b-col>
                                <input type="checkbox" name="spring" class="season-icon spring" value="true" v-model="form.spring" id="spring">
                                <label class="season-label" for="spring"></label>
                            </b-col>
                            <b-col>
                                <input type="checkbox" name="summer" class="season-icon summer" value="true" v-model="form.summer" id="summer">
                                <label class="season-label" for="summer"></label>
                            </b-col>
                            <b-col>
                                <input type="checkbox" name="autumn" class="season-icon autumn" value="true" v-model="form.autumn" id="autumn">
                                <label class="season-label" for="autumn"></label>
                            </b-col>
                            <b-col>
                                <input type="checkbox" name="winter" class="season-icon winter" value="true" v-model="form.winter" id="winter">
                                <label class="season-label" for="winter"></label>
                            </b-col>
                        </b-row>
                    </b-col>
                </b-row>
                <md-snackbar :md-duration="2000" :md-active.sync="showSnackbar" md-persistent>
                    <span>Image deleted!</span>
                </md-snackbar>
                <md-button class="md-primary" name="wp-submit" value="Anmelden" type="submit">Save</md-button>
            </form>
        </b-container>

    </div>
    <!--     :icon="{url:'http://www.innovita.com/hunt/images/iconmaroon/SVG/map-marker.svg'}"-->
</div>
</template>

<script>
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


export default {
    name: 'FormValidation',
    mixins: [validationMixin],
    components: {
        RangeSlider
    },
    data: () => ({
        form: {
            title: 'null',
            type: null,
            category: null,
            accessibility: 0,
            email: null,
            latitude: 0,
            longitude: 0,
            images: [],
            sunny: "false",
            cloudy: "false",
            foggy: "false",
            rainy: "false",
            spring: "false",
            summer: "false",
            autumn: "false",
            winter: "false",
            description: 'null'
        },
        map: { lat: 51.07415364657628, lng: 13.762693740427494 },
        marker: { lat: 51.07415364657628, lng: 13.762693740427494 },
        locationSaved: false,
        sending: false,
        fileinput: null,
        showSnackbar: false,
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
        getValidationClass(fieldName) {
            const field = this.$v.form[fieldName]

            if (field) {
                return {
                    'md-invalid': field.$invalid && field.$dirty
                }
            }
        },
        saveForm() {
            console.log(this.form);
            var path = window.SETTINGS.THEMEURL + '/formhandlers/add-location.php';
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

            axios.post(path, formData)
            .then(function(response){
                console.log(response)
            }).catch(function(e){
                console.log(e);
            });

            var formData = new FormData();
            formData.append("action", "upload-attachment");
            formData.append("async-upload", fileInput);
            formData.append("name", fileInput.name);
        },
        getMarkerPosition(marker) {
            let _this = this
            console.log(JSON.stringify(marker));
            _this.map = marker;
            _this.form.latitude = JSON.stringify(marker.lat);
            _this.form.longitude = JSON.stringify(marker.lng);
        },
        updateMap(longitude,latitude) {
            let _this = this
            _this.map = { lat: latitude, lng: longitude }
            _this.marker = { lat: latitude, lng: longitude }
            _this.form.latitude = latitude
            _this.form.longitude = longitude
            console.log(_this.map);
        },

        uploadImage(event) {
            var file = event.target.files[0];
            let _this = this;

            EXIF.getData(file, function() {
                if (EXIF.getTag(this, 'GPSLatitude') && EXIF.getTag(this, 'GPSLongitude')) {
                    var latitude  = _this.toDecimal(EXIF.getTag(this, 'GPSLatitude'));
                    var longitude = _this.toDecimal(EXIF.getTag(this, 'GPSLongitude'));
                    _this.updateMap(longitude, latitude);
                }
            });

            _this.upload(file);
        },
        upload(fileInput){
            let _this = this
            console.log(fileInput.name, fileInput)
            var formData = new FormData();
            formData.append("action", "upload-attachment");
            formData.append("async-upload", fileInput);
            formData.append("name", fileInput.name);

            //also available on page from _wpPluploadSettings.defaults.multipart_params._wpnonce

            formData.append("_wpnonce", window.SETTINGS.NONCE);
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange=function(){
                if (xhr.readyState==4 && xhr.status==200){
                    if (xhr.responseText){
                        console.log(xhr.responseText)
                        var response = _this.parseJSON(xhr.responseText);

                            var pictureURLLarge = response.data.sizes.full.url;
                            var pictureURLThumb = response.data.sizes.thumbnail.url;
                            var tmp_obj = {"id": response.data.id, "large": pictureURLLarge, "thumb": pictureURLThumb};
                            console.log(_this.form.images)
                            _this.form.images.push(tmp_obj);

                            console.log(_this.form.images);

                            _this.fileinput = null;
                    }
                }
            };

            var uploadPath = window.SETTINGS.WPPATH + 'wp-admin/async-upload.php';
            xhr.open("POST",uploadPath,true);
            xhr.send(formData);
        },
        toDecimal(number) {
            return number[0].numerator + number[1].numerator / (60 * number[1].denominator) + number[2].numerator / (3600 * number[2].denominator);
        },
        parseJSON( data ) {
            if ( typeof data !== "string" || !data ) {
                return null;
            }

            // Make sure leading/trailing whitespace is removed (IE can't handle it)
            data = data.trim();

            // Make sure the incoming data is actual JSON
            // Logic borrowed from http://JSON.org/JSON2.js
            if ( /^[\],:{}\s]*$/.test(data.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@")
                .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]")
                .replace(/(?:^|:|,)(?:\s*\[)+/g, "")) ) {

                // Try to use the native JSON parser first
                return window.JSON && window.JSON.parse ?
                    window.JSON.parse( data ) :
                    (new Function("return " + data))();

            } else {
                console.error( "Invalid JSON: " + data );
            }
        },
        deleteImage(imageID) {
            let _this = this;
            var path = window.SETTINGS.WPPATH + 'wp-JSON/wp/v2/media/' + imageID + '?force=true';
            axios.delete(path, {force:true})
            .then(function(response){
                console.log('deleted successfully')
                _this.deleteImageFromArray(imageID);
            });

        },
        deleteImageFromArray(imageID) {
            let _this = this
            for(var i = 0; i < _this.form.images.length; i++) {
                if(_this.form.images[i].id == imageID) {
                    _this.form.images.splice(i, 1);
                    break;
                }
            }
            _this.showSnackbar = true; 
        }

    },

    watch: {
        // call again the method if the route changes
        '$route': 'handleData'
    },

    created() {
        //this.$store.dispatch('getPost')
        this.loading = false
        console.log(window.SETTINGS.NONCE);


    }
}
</script>

<style lang="scss">
    h4 {
        margin-bottom: 25px;
    }
</style>