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
    </v-layout>
</template>

<script>
    import router from '../router';
    import togeojson from '@mapbox/togeojson'
    import domParser from 'xmldom'
    export default {
        data() {
            return {
                inputFile: null
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

                formData.append("enctype","multipart/form-data")
                formData.append("file", file);
                axios.post(window.SETTINGS.THEMEURL + '/formhandlers/converter/klmtogeojson.php', formData).then(function (response) {
                    console.log(response.data);
                    //cb(response.data);
                }).catch(function (e) {
                    console.log(e);
                   // cb(e);
                });
            }
        }
    }
</script>

<style lang="scss">
</style>