<template>
    <v-app id="app" dark>
        <v-navigation-drawer fixed v-model="drawer" right app>
            <v-list dense v-if="currentUser">
                <v-list-tile class="mt-1 mb-2" @click="goTo('/user/edit/'+currentUser.id)">
                    <v-list-tile-avatar>
                        <img :src="currentUser.avatar">
                    </v-list-tile-avatar>
                    <v-list-tile-title>{{currentUser.name}}</v-list-tile-title>
                    <v-list-tile-action>
                        <v-icon>edit</v-icon>
                    </v-list-tile-action>
                </v-list-tile>
                <v-list-tile :href="logoutLink">
                    <v-list-tile-action>
                        <v-icon>exit_to_app</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ $t('message.logout') }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
            <v-divider></v-divider>
            <v-list dense>
                <v-subheader>{{ $t('message.application-menu') }}</v-subheader>
                <v-list-tile @click="goTo('/add/')">
                    <v-list-tile-action>
                        <v-icon>add_location</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ $t('message.add-location') }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile @click="goTo('/grid/')">
                    <v-list-tile-action>
                        <v-icon>grid_on</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ $t('message.grid-view') }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile @click="goTo('/')">
                    <v-list-tile-action>
                        <v-icon>map</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ $t('message.map-view') }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
            <v-divider></v-divider>
            <v-list dense v-if="currentUserAdmin">
                <v-subheader>Benutzerverwaltung</v-subheader>

                <v-list-tile @click="goTo('/user/add/')">
                    <v-list-tile-action>
                        <v-icon>add_circle_outline</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Benutzer hinzufügen</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile @click="goTo('/user/admin/')">
                    <v-list-tile-action>
                        <v-icon>supervisor_account</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Benutzerliste anzeigen</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

            </v-list>
        </v-navigation-drawer>
        <v-toolbar fixed app>
            <v-toolbar-title>
                <img :src="getLogoPath" alt="Logo">
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-side-icon @click.stop="drawer = !drawer" v-if="showDrawer"></v-toolbar-side-icon>
        </v-toolbar>
        <v-content>
            <v-container fluid fill-height>
                <router-view></router-view>
            </v-container>
            <v-snackbar color="success" :timeout="successTimeout" v-model="successMessage">
                {{ successMessageText }}
                <v-btn flat @click.native="successMessage = false">{{ $t('message.close') }}</v-btn>
            </v-snackbar>
            <v-snackbar color="error" :timeout="errorTimeout" v-model="errorMessage">
                {{ errorMessageText }}
                <v-btn flat @click.native="errorMessage = false">{{ $t('message.close') }}</v-btn>
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
    import api from './api';
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
            filter: [],
            currentUser: [],
            currentUserAdmin: false
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

        created() {
            this.getUser();
        },

        methods: {
            back() {
                router.go(-1);
            },
            getUser() {
                api.getCurrentUser(window.SETTINGS.AJAXNONCE, this.setUserData);
                api.getAdmin(this.isAdmin);
            },
            setUserData(data) {
                this.currentUser = data;
                var _this = this;
                this.currentUser.avatar = _this.getUserGravatar(this.currentUser.avatar_urls);
                console.log(this.currentUser.avatar);
            },
            isAdmin(isAdmin) {
                this.currentUserAdmin = isAdmin;
            },
            getUserGravatar(avatars) {
                var biggestItem = Object.keys(avatars).sort()[2];
                return avatars[biggestItem];
            },
            goTo(path) {
                router.push(path);
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
