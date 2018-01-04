<template>
    <v-container fluid>
        <v-layout wrap>
            <div class="loading" v-if="loading">
                Loading...
            </div>
            <form novalidate class="layout  wrap" @submit.prevent="saveForm">
                <v-flex sm6 xs12 class="pa-3">
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
                        <gmap-marker :position="form.lng" :clickable="true" :draggable="true" @dragend="getMarkerPosition($event.latLng)"></gmap-marker>
                    </gmap-map>
                    <v-text-field dark multi-line label="Descriptiontext" v-model="form.description" required></v-text-field>
                </v-flex>
                <v-flex sm6 xs12 class="pa-3">
                    <v-text-field dark label="Location Name" v-model="form.title" :disabled="sending"></v-text-field>

                    <h4>Accesibillity</h4>

                    <v-slider color="teal" min="1" max="10" thumb-label ticks="ticks" v-model="form.accessibility"></v-slider>

                    <v-select v-bind:items="type" v-model="form.type" label="Type" dark item-value="text" :disabled="sending"></v-select>

                    <v-select v-bind:items="category" v-model="form.category" label="Category" dark item-value="text" :disabled="sending"></v-select>

                    <h4>Wheather</h4>
                    <v-container fluid>
                        <v-layout wrap>
                            <v-flex xs3>
                                        <input type="checkbox" name="cloudy" class="weather-icon cloudy"  v-model="form.cloudy" id="cloudy">
                                        <label class="weather-label" for="cloudy"></label>
                                    </v-flex>
                                    <v-flex xs3>
                                        <input type="checkbox" name="foggy" class="weather-icon foggy"  v-model="form.foggy" id="foggy">
                                        <label class="weather-label" for="foggy"></label>
                                    </v-flex>
                                    <v-flex xs3>
                                        <input type="checkbox" name="rainy" class="weather-icon rainy" v-model="form.rainy" id="rainy">
                                        <label class="weather-label" for="rainy"></label>
                                    </v-flex>
                                    <v-flex xs3>
                                        <input type="checkbox" name="sunny" class="weather-icon sunny" v-model="form.sunny" id="sunny">
                                        <label class="weather-label" for="sunny"></label>
                                    </v-flex>
                            
                        </v-layout>
                    </v-container>


                    <h4>Seasons</h4>
                    <v-container fluid>
                        <v-layout wrap>
                            <v-flex xs3>
                                <input type="checkbox" name="spring" class="season-icon spring" v-model="form.spring" id="spring">
                                <label class="season-label" for="spring"></label>
                            </v-flex>
                            <v-flex xs3>
                                <input type="checkbox" name="summer" class="season-icon summer" v-model="form.summer" id="summer">
                                <label class="season-label" for="summer"></label>
                            </v-flex>
                            <v-flex xs3>
                                <input type="checkbox" name="autumn" class="season-icon autumn" v-model="form.autumn" id="autumn">
                                <label class="season-label" for="autumn"></label>
                            </v-flex>
                            <v-flex xs3>
                                <input type="checkbox" name="winter" class="season-icon winter" v-model="form.winter" id="winter">
                                <label class="season-label" for="winter"></label>
                            </v-flex>
                        </v-layout>
                    </v-container>

                </v-flex>
                <v-snackbar :timeout="2500" :multi-line="mode === 'multi-line'" :vertical="mode === 'vertical'" v-model="showSnackbar">
                    Successfull deleted Image
                    <v-btn dark flat @click.native="showSnackbar = false">Close</v-btn>
                </v-snackbar>
                <v-btn color="teal" dark name="wp-submit" type="submit">Save</v-btn>
            </form>
        </v-layout>
    </v-container>
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
        type: [
          { text: 'Industry' },
          { text: 'Outdoor' },
          { text: 'Architecture' },
          { text: 'Monument' }
        ],
        category: [
          { text: 'Building' },
          { text: 'Landscape' },
          { text: 'Urban' },
          { text: 'Water' }
        ],
        ticks: true,
        mode: '',
        map: null,
        marker: null,
        locationSaved: false,
        sending: false,
        fileinput: null,
        showSnackbar: false,
        styles: null
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
            console.log(data)
            console.log(JSON.stringify(this.form));
            this.form.id = this.form.id;
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
            console.log(this.form);
            this.loading = false
        },
        saveForm() {
            console.log(this.form);
            var path = window.SETTINGS.THEMEURL + '/formhandlers/edit-location.php';
            var formData = new FormData();
            formData.append("id", this.form.id);
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

            console.log(formData);
            let _this = this;

            axios.post(path, formData)
            .then(function(response){
                console.log(response)
                router.push('/location/'+_this.form.id)
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
            _this.map = marker;
            console.log(JSON.stringify(marker));
            var markerObject = JSON.parse(JSON.stringify(marker));
            _this.form.latitude = JSON.stringify(markerObject.lat);
            _this.form.longitude = JSON.stringify(markerObject.lng);
            console.log(_this.form.latitude, _this.form.longitude)

        },
        updateMap(longitude,latitude) {
            let _this = this
            _this.map = { lat: latitude, lng: longitude }
            _this.marker = { lat: latitude, lng: longitude }
            _this.form.latitude = latitude
            _this.form.longitude = longitude
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
       // '$route': 'handleData'
    },

    created() {
        //this.$store.dispatch('getPost')
        this.styles = window.SETTINGS.mapStyles
        this.loading = true
        let _this = this;
        _this.placeholderImage = window.SETTINGS.THEMEURL + '/dist/assets/img/location-standard.jpg';
        console.log(this.id)
        api.getPost(this.id, this.handleData);


    }
}
</script>

<style lang="scss">
    h4 {
        margin-bottom: 25px;
    }
</style>