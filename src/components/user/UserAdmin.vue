<template>
    <v-layout wrap>
        <v-flex xs12 sm6 offset-sm3>
            <v-list subheader>
                <template v-for="user in users">
                    <v-divider></v-divider>
                    <v-list-tile avatar v-bind:key="user.id">
                        <v-list-tile-avatar>
                            <img v-bind:src="user.avatar_urls[48]"/>
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                            <v-list-tile-title v-html="user.name"></v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-btn v-if="user.id !== currentUser" color="red darken-4" dark small @click="deleteUser(user.id)">{{ $t('message.delete') }}</v-btn>
                        </v-list-tile-action>
                    </v-list-tile>
                </template>
            </v-list>

        </v-flex>
    </v-layout>
</template>

<script>
    import router from "../../router";
    import RangeSlider from "vue-range-slider";
    import {
        mapGetters
    } from "vuex";
    import api from "../../api";
    import helper from "../../helper";

    export default {
        components: {
            RangeSlider
        },
        data: () => ({
            users: false,
            currentUser: null
        }),
        methods: {
            prepareUsers(users) {
                this.currentUser = this.$root.$children[0]._data.currentUser.id;
                this.users = users;
            },
            deleteUser(id) {
                console.log(id);
            }
        },

        watch: {
            // call again the method if the route changes
            //$route: "handleData"
        },

        created() {
            api.getUsers(this.prepareUsers);
        }
    };
</script>

<style lang="scss">
</style>