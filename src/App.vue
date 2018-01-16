<template>
    <v-app id="app" dark>
        <v-navigation-drawer fixed v-model="drawer" dark right app>
            <v-list dense>
                <v-subheader>Application Menu</v-subheader>
                <v-list-tile :href="wppath+'add/'">
                    <v-list-tile-action>
                        <v-icon>add_location</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Add Lcoation</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile :href="wppath+'grid/'">
                    <v-list-tile-action>
                        <v-icon>grid_on</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Grid View</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile :href="wppath">
                    <v-list-tile-action>
                        <v-icon>map</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Map View</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile :href="logoutLink">
                    <v-list-tile-action>
                        <v-icon>exit_to_app</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Logout</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
            <v-divider dark></v-divider>
        </v-navigation-drawer>
        <v-toolbar fixed app>
            <v-toolbar-title>
                <img :src="getLogoPath" alt="Logo">
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-side-icon @click.stop="drawer = !drawer" v-if="showDrawer"></v-toolbar-side-icon>
        </v-toolbar>
        <v-content dark>
            <v-container dark fluid fill-height>
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
            errorTimeout: 2500,
            drawer: false,
            showDrawer: true,
            filter: []
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
