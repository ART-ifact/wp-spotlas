<template>
    <v-app id="app" dark>
        <v-navigation-drawer fixed v-model="filterDrawer" class="pa-2" right app>
            <v-text-field color="teal" v-bind:label="'Titel'" required v-model="filter.title"></v-text-field>

            <v-select v-bind:items="category" v-model="filter.category" v-bind:label="$t('message.category')" color="teal" item-value="value" item-text="text"></v-select>
            {{filter.accessibility}}
            <v-slider color="teal" min="0" max="10" thumb-label ticks="ticks" v-model="filter.accessibility"></v-slider>

            <h4>{{ $t('message.wheather') }}</h4>
                    <v-container fluid>
                        <v-layout wrap>
                            <v-flex xs3>
                                <input type="checkbox" name="cloudy" class="weather-icon cloudy" v-model="filter.cloudy" id="cloudy" >
                                <label class="weather-label" for="cloudy"></label>
                            </v-flex>
                            <v-flex xs3>
                                <input type="checkbox" name="foggy" class="weather-icon foggy" v-model="filter.foggy" id="foggy" >
                                <label class="weather-label" for="foggy"></label>
                            </v-flex>
                            <v-flex xs3>
                                <input type="checkbox" name="rainy" class="weather-icon rainy" v-model="filter.rainy" id="rainy" >
                                <label class="weather-label" for="rainy"></label>
                            </v-flex>
                            <v-flex xs3>
                                <input type="checkbox" name="sunny" class="weather-icon sunny" v-model="filter.sunny" id="sunny" >
                                <label class="weather-label" for="sunny"></label>
                            </v-flex>
                        </v-layout>
                    </v-container>
                    <h4>{{ $t('message.seasons') }}</h4>
                    <v-container fluid>
                        <v-layout wrap>
                            <v-flex xs3>
                                <input type="checkbox" name="spring" class="season-icon spring" v-model="filter.spring" id="spring" >
                                <label class="season-label" for="spring"></label>
                            </v-flex>
                            <v-flex xs3>
                                <input type="checkbox" name="summer" class="season-icon summer" v-model="filter.summer" id="summer" >
                                <label class="season-label" for="summer"></label>
                            </v-flex>
                            <v-flex xs3>
                                <input type="checkbox" name="autumn" class="season-icon autumn" v-model="filter.autumn" id="autumn" >
                                <label class="season-label" for="autumn"></label>
                            </v-flex>
                            <v-flex xs3>
                                <input type="checkbox" name="winter" class="season-icon winter" v-model="filter.winter" id="winter" >
                                <label class="season-label" for="winter"></label>
                            </v-flex>
                        </v-layout>
                    </v-container>
        </v-navigation-drawer>
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
            <v-toolbar-side-icon @click.stop="filterDrawer = !filterDrawer" v-if="showDrawer">
                <v-icon>search</v-icon>
            </v-toolbar-side-icon>
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
    import helper from './helper';
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
            filterDrawer: false,
            showDrawer: true,
            filter: [],
            currentUser: [],
            currentUserAdmin: false,
            filter: {
                category: '',
                title: '',
                accessibility: 0,
                cloudy: false,
                foggy : false,
                rainy : false,
                sunny : false,
                spring: false,
                summer: false,
                autumn: false,
                winter: false,
            },
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
            this.category = helper.createTranslatedCategoryFilterObject(this.$t('message.building'),this.$t('message.landscape'), this.$t('message.urban'), this.$t('message.water'),this.$t('message.nothingSelected'));
        },

        methods: {
            back() {
                router.go(-1);
            },
            showCategory(text) {
                console.log(text)
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
