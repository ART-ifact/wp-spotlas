<template>
    <v-layout row wrap>
        <v-form class="xs12 flex" @submit.prevent="importLocations" ref="form">
            <v-toolbar card color="grey darken-3" class="location-toolbar">
                <v-btn color="blue-grey darken-3" :disabled="sending" @click="cancel()">{{ $t('message.cancel') }}</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="teal" name="wp-submit" :disabled="sending" type="submit">{{ $t('message.startImport') }}</v-btn>
            </v-toolbar>
            <v-flex xs12>
                <v-alert type="info" color="teal" :value="true">
                    {{ $t('message.importHint') }}
                </v-alert>
                <md-field>
                    <label>{{ $t('message.selectImportFile') }}</label>
                    <md-file v-model="inputFile" accept=".kml,.gpx,.geojson" @change="fileHandling($event)" />
                </md-field>
            </v-flex>
        </v-form>
        <v-flex md3 sm6 xs12 class="pa-3" v-if="locationsToImport.length > 0" :key="location.properties.name" v-for="location in locationsToImport">
                    <v-card color="darken-2">
                        <v-card-media height="200px">
                            <div>
                                <img :src="location.properties.gx_media_links" class="leaderimg">

                            </div>
                        </v-card-media>
                        <v-card-title primary-title>
                            <div>
                                <h3 class="headline mb-0">
                                    <v-checkbox v-model="location.properties.extrude" color="teal" v-bind:label="location.properties.name"></v-checkbox>
                                </h3>
                            </div>
                        </v-card-title>

                    </v-card>
                </v-flex>
    </v-layout>
</template>

<script>
    import router from '../router';
    import helper from '../helper';
    import importhelper from '../helper/import.js';
    import api from '../api';
    import togeojson from '../libs/togeojson.js'
    import domParser from 'xmldom'
    export default {
        data() {
            return {
                inputFile: null,
                locationsToImport: [],
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
                    description: "",
                    hash: '',
                    shared: false
                },
                sending: false,
            }
        },
        created() {},

        methods: {
            fileHandling(file) {
                var fileExtension = file.target.value.match(/\.([^\.]+)$/)[1];
                var fileData = file.target.files[0];
                console.log(file);
                console.log(file.target.files[0]);

                switch (fileExtension) {
                    case 'kml':
                        console.log('kml')
                        this.kmlToGeoJSON(fileData);
                        break;
                    case 'gpx':
                        this.gpxToGeoJSON(fileData);
                        break;
                    case 'geojson':
                        this.handlegeoJson(fileData);
                        break;
                }
            },
            kmlToGeoJSON(file) {
                var formData = new FormData();
                var _this = this;

                formData.append("enctype", "multipart/form-data")
                formData.append("file", file);

                axios.post(window.SETTINGS.THEMEURL + '/formhandlers/converter/returnstring.php', formData).then(function (response) {

                    var dom = (new DOMParser()).parseFromString(response.data, 'text/xml');

                    _this.handleJSON(togeojson.kml(dom));
                }).catch(function (e) {
                    console.log(e);
                });
            },
            handlegeoJson(file) {
                var formData = new FormData();
                var _this = this;

                formData.append("enctype", "multipart/form-data")
                formData.append("file", file);

                axios.post(window.SETTINGS.THEMEURL + '/formhandlers/converter/returnstring.php', formData).then(function (response) {
                    _this.handleJSON(response.data);
                }).catch(function (e) {
                    console.log(e);
                });
            },
            gpxToGeoJSON(file) {
                var formData = new FormData();
                var _this = this;

                formData.append("enctype", "multipart/form-data")
                formData.append("file", file);

                axios.post(window.SETTINGS.THEMEURL + '/formhandlers/converter/returnstring.php', formData).then(function (response) {
                    var dom = (new DOMParser()).parseFromString(response.data, 'text/xml');
                    console.log(dom)
                    _this.handleJSON(togeojson.gpx(dom));
                }).catch(function (e) {
                    console.log(e);
                });
            },
            handleJSON(markers) {
                this.locationsToImport = markers['features'];

                console.log(this.locationsToImport)

                for (let index = 0; index < this.locationsToImport.length; index++) {
                    const element              = this.locationsToImport[index];
                    element.properties.extrude = true;

                    if (element.properties.Name) {
                        element.properties.name = element.properties.Name
                    }
                    if(!element.properties.description) {
                        element.properties.description = element.properties.desc;
                    }
                    if(!element.properties.gx_media_links) {
                        var regex  = /src = \\"(.*?)\\"/;
                        var string = JSON.stringify(element.properties.description);
                        var src    = null;
                        if (typeof string !== 'undefined') {
                            src = string.match(regex);
                        }
                        
                        if (src !== null) {
                            console.log(src[1]);
                            element.properties.gx_media_links = src[1];
                        }
                    }
                }
            },
            onCheckboxChange(value) {
                console.log(value);
            },
            showLocations(locations) {
                for (let index = 0; index < locations.length; index++) {
                    const location = locations[index];
                    this.locationsToImport.push(location);
                }
            },
            importLocations() {
                for (let index = 0; index < this.locationsToImport.length; index++) {
                    const location = this.locationsToImport[index];

                    if (location.properties.extrude) {
                        this.form.title     = location.properties.name;
                        this.form.longitude = location.geometry.coordinates[0];
                        this.form.latitude  = location.geometry.coordinates[1];

                        if (typeof location.properties.description !== "undefined") {
                            this.form.description = importhelper.removeHTML(location.properties.description);
                        }

                        if (typeof location.properties.gx_media_links !== "undefined") {
                            var fileInput = importhelper.getImageBlob(location.properties.gx_media_links, this.buildMediaData);
                        } else {
                            this.form.images = null;
                            this.updateImageArray();
                        }
                    }
                }

                helper.createSuccessMessage(this.$root,this.$t('message.locationsImported'), 2500)
                router.push('/grid')
            },


            updateImageArray(api_response) {
                if (typeof api_response !== "undefined") {
                    if (typeof api_response.source_url !== "undefined") {
                        var tmp_obj = helper.buildImageObject(api_response);
                        this.form.images.push(tmp_obj);
                    }
                }

                this.addLocation();

            },
            addLocation() {
                var formData = helper.buildFormData(this.form, false);

                api.addLocation(formData, this.afterSave)
            },
            afterSave(response) {
               
            },
            buildMediaData(fileInput) {
                var formData = new FormData();

                formData.append("action", "upload-attachment");
                formData.append("file", fileInput);
                formData.append("name", fileInput.name);

                formData.append("_wpnonce", window.SETTINGS.AJAXNONCE);

                api.uploadMedia(formData, fileInput, this.updateImageArray);
            }
        }
    }
</script>

<style lang="scss">
</style>