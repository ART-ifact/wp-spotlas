<template>
    <v-app id="app" dark>
        <v-navigation-drawer fixed v-model="filterDrawer" v-if="showDrawer" class="pa-2" right app>
            <h2>{{$t('message.locationSearch')}}</h2>
            <v-form ref="filter">
                <v-text-field color="teal" v-bind:label="'Titel'" required v-model="filter.title"></v-text-field>

                <v-select v-bind:items="category" v-model="filter.category" v-bind:label="$t('message.category')" color="teal" item-value="value"
                    item-text="text"></v-select>

                <v-select v-model="filter.type" v-if="type" v-bind:label="$t('message.type')" chips color="teal" :items="type" multiple>
                    <template slot="selection" slot-scope="data">
                        <v-chip @input="data.parent.selectItem(data.item)" class="chip--select-multi" text-color="white" color="blue-grey darken-2"
                            :key="JSON.stringify(data.item)" close>
                            {{ data.item.text }}
                        </v-chip>
                    </template>
                </v-select>

                <label for="accessibility">{{$t('message.minAccessibility')}}</label>
                <v-slider name="accessibility" color="teal" min="0" max="10" thumb-label ticks="ticks" v-model="filter.accessibility"></v-slider>

                <h4>{{ $t('message.wheather') }}</h4>
                <v-container fluid>
                    <v-layout wrap>
                        <v-flex xs3>
                            <input type="checkbox" name="cloudy_filter" class="weather-icon cloudy" v-model="filter.cloudy" id="cloudy_filter">
                            <label class="weather-label" for="cloudy_filter"></label>
                        </v-flex>
                        <v-flex xs3>
                            <input type="checkbox" name="foggy_filter" class="weather-icon foggy" v-model="filter.foggy" id="foggy_filter">
                            <label class="weather-label" for="foggy_filter"></label>
                        </v-flex>
                        <v-flex xs3>
                            <input type="checkbox" name="rainy_filter" class="weather-icon rainy" v-model="filter.rainy" id="rainy_filter">
                            <label class="weather-label" for="rainy_filter"></label>
                        </v-flex>
                        <v-flex xs3>
                            <input type="checkbox" name="sunny_filter" class="weather-icon sunny" v-model="filter.sunny" id="sunny_filter">
                            <label class="weather-label" for="sunny_filter"></label>
                        </v-flex>
                    </v-layout>
                </v-container>
                <h4>{{ $t('message.seasons') }}</h4>
                <v-container fluid>
                    <v-layout wrap>
                        <v-flex xs3>
                            <input type="checkbox" name="spring_filter" class="season-icon spring" v-model="filter.spring" id="spring_filter">
                            <label class="season-label" for="spring_filter"></label>
                        </v-flex>
                        <v-flex xs3>
                            <input type="checkbox" name="summer_filter" class="season-icon summer" v-model="filter.summer" id="summer_filter">
                            <label class="season-label" for="summer_filter"></label>
                        </v-flex>
                        <v-flex xs3>
                            <input type="checkbox" name="autumn_filter" class="season-icon autumn" v-model="filter.autumn" id="autumn_filter">
                            <label class="season-label" for="autumn_filter"></label>
                        </v-flex>
                        <v-flex xs3>
                            <input type="checkbox" name="winter_filter" class="season-icon winter_filter" v-model="filter.winter" id="winter_filter">
                            <label class="season-label" for="winter_filter"></label>
                        </v-flex>
                    </v-layout>
                </v-container>
                <v-switch color="teal" v-bind:label="$t('message.showShared')" v-model="filter.shared"></v-switch>

                <v-btn color="blue-grey darken-3" class="full-width" @click="clearFilter()">reset Search</v-btn>
            </v-form>
        </v-navigation-drawer>
        <v-navigation-drawer fixed v-model="drawer" v-if="showDrawer" right app>
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
            <v-toolbar-side-icon @click.stop="drawerSwitch('search')" v-if="showDrawer">
                <v-icon>search</v-icon>
            </v-toolbar-side-icon>
            <v-toolbar-side-icon @click.stop="drawerSwitch('menu')" v-if="showDrawer"></v-toolbar-side-icon>
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
        props: ['selected'],
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
                type: '',
                shared: false
            },
            type: [],
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
            this.type = helper.createTranslatedTypeObject(this.$t('message.industry'), this.$t('message.historic'), this.$t('message.panorama'), this.$t('message.sunrise'), this.$t('message.sunset'), this.$t('message.outdoor'), this.$t('message.architecture'), this.$t('message.monument'));
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
            },
            clearFilter() {
                this.$refs.filter.reset()
                this.filter.category = '';
                this.filter.title = '';
                this.filter.accessibility = 0;
                this.filter.cloudy = false;
                this.filter.foggy  = false;
                this.filter.rainy  = false;
                this.filter.sunny  = false;
                this.filter.spring = false;
                this.filter.summer = false;
                this.filter.autumn = false;
                this.filter.winter = false;
                this.filter.shared = false;
            },
            drawerSwitch(drawerClicked) {
                if (drawerClicked === 'search') {
                    if (this.drawer) {
                        this.drawer = false;
                    }
                    if (this.filterDrawer) {
                        this.filterDrawer = false;
                    } else {
                        setTimeout(() => {
                            this.filterDrawer = true;
                        }, 50);

                    }
                }
                if (drawerClicked === 'menu') {
                    if (this.filterDrawer) {
                        this.filterDrawer = false;
                    }
                    if (this.drawer) {
                        this.drawer = false;
                    } else {
                        setTimeout(() => {
                            this.drawer = true;
                        }, 50);
                    }
                }
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
