<template>
    <v-layout row wrap>
        <v-flex xs12>
            <v-alert type="info" color="teal" :value="true">
                {{ $t('message.importHint') }}
            </v-alert>
            <md-field>
                <label>{{ $t('message.selectImportFile') }}</label>
                <md-file v-model="inputFile" accept=".kml,.kmz,.geojson" @change="fileHandling($event)" />
            </md-field>
        </v-flex>
        <v-flex xs3 class="pa-3"  v-if="locationsToImport.length > 0" :key="location.properties.name" v-for="location in locationsToImport">
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
    import togeojson from '../libs/togeojson.js'
    import domParser from 'xmldom'
    export default {
        data() {
            return {
                inputFile: null,
                locationsToImport: []
            }
        },
        created() {
        },

        methods: {
            fileHandling(file) {
                var fileExtension = file.target.value.match(/\.([^\.]+)$/)[1];
                var fileData = file.target.files[0];
                console.log(file);
                console.log(file.target.files[0]);

                switch(fileExtension)
                    {
                        case 'kml':
                            console.log('kml')
                            this.kmlToGeoJSON(fileData);
                            break;
                        case 'kmz':
                            console.log('kmz')
                            break;
                        case 'geojson':
                            console.log('geojson')
                            break;
                    }
            },
            kmlToGeoJSON(file) {
                var formData = new FormData();
                var _this = this;

                formData.append("enctype","multipart/form-data")
                formData.append("file", file);

                axios.post(window.SETTINGS.THEMEURL + '/formhandlers/converter/returnstring.php',formData).then(function (response) {

                    var dom = (new DOMParser()).parseFromString(response.data, 'text/xml');

                    _this.handleJSON(togeojson.kml(dom));
                }).catch(function (e) {
                    console.log(e);
                });
            },
            handleJSON(markers) {
                this.locationsToImport = markers['features'];

                for (let index = 0; index < this.locationsToImport.length; index++) {
                    const element = this.locationsToImport[index];
                    element.properties.extrude = true;
                }
                console.log(this.locationsToImport)
            },
            onCheckboxChange(value) {
                console.log(value);
            },
            showLocations(locations) {
                for (let index = 0; index < locations.length; index++) {
                    const location = locations[index];
                    this.locationsToImport.push(location);
                }
                console.log(this.locationsToImport)
            }
        }
    }
</script>

<style lang="scss">
</style>