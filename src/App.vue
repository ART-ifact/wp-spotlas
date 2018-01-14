
<template>
    <v-app id="inspire" dark>
        <v-toolbar app fixed clipped-left>
            <v-toolbar-title>
                <img :src="getLogoPath" alt="Logo">
            </v-toolbar-title>
            <v-btn v-if="showBackButton" dark small depressed color="blue-grey darken-3" @click="back()">back</v-btn>

            <v-speed-dial fab small large dark absolute top right class="btn-add" :direction="'bottom'" :hover="true" :transition="'slide-y-reverse-transition'">
                <v-btn slot="activator" color="teal darken-2" dark fab hover>
                    <v-icon>menu</v-icon>
                    <v-icon>close</v-icon>
                </v-btn>
                <v-btn :href="wppath+'add/'" fab dark small color="teal">
                    <v-icon>add_location</v-icon>
                </v-btn>
                <v-btn :href="wppath+'grid/'" fab dark small color="teal">
                    <v-icon>grid_on</v-icon>
                </v-btn>
                <v-btn :href="wppath" fab dark small color="teal">
                    <v-icon>map</v-icon>
                </v-btn>
                <v-btn :href="logoutLink" fab dark small color="teal">
                    <v-icon>exit_to_app</v-icon>
                </v-btn>

            </v-speed-dial>
        </v-toolbar>
        <v-content>
            <v-container fluid fill-height>
                <router-view></router-view>
            </v-container>
            <v-snackbar color="success" :timeout="successTimeout" v-model="successMessage">
                {{ successMessageText }}
                <v-btn dark flat @click.native="successMessage = false">{{ $t('message.close') }}</v-btn>
            </v-snackbar>
            <v-snackbar color="error" :timeout="errorTimeout" v-model="errorMessage">
                {{ errorMessageText }}
                <v-btn dark flat @click.native="errorMessage = false">{{ $t('message.close') }}</v-btn>
            </v-snackbar>
        </v-content>
    </v-app>
</template>

<style lang="scss" scoped>

</style>

<script>
    import {
        mapGetters,
        mapActions,
        mapMutations
    } from 'vuex'
    import router from './router';
    import Header from './components/partials/Header'
    import Footer from './components/partials/Footer'
    export default {
        name: 'Reveal',
        data: () => ({
            menuVisible: false,
            showLoader: true,
            logoutLink: window.SETTINGS.LOGOUT,
            logo_path: '',
            showBackButton: false,
            imageDeleted: false,
            locationDeleted: false,
            successMessage: false,
            successMessageText: '',
            successTimeout: 2500,
            errorMessage: false,
            errorMessageText: '',
            errorTimeout: 2500
        }),
        computed: {
            ...mapGetters({
                isLoading: 'isLoading',
                loadingProgress: 'loadingProgress'
            }),
            wppath() {
                return window.SETTINGS.WPPATH;
            },
            getLogoPath() {
                return window.SETTINGS.LOGO;
            }
        },
        components: {
            appHeader: Header,
            appFooter: Footer
        },

        methods: {
            back() {
                router.go(-1);
            }
        },

        watch: {
            // watch the value of isLoading and once it's false hide the loader
            isLoading(val) {
                if (val == false) {
                    let self = this
                    setTimeout(function() {
                        self.showLoader = false
                    }, 1000)
                }
            }
        }
    }
</script>
