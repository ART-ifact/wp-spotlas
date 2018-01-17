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
                            <v-btn v-if="user.id !== currentUser" color="red darken-4" dark small @click="preDeleteUser(user.id, user.name)">{{ $t('message.delete') }}</v-btn>
                        </v-list-tile-action>
                    </v-list-tile>
                </template>
            </v-list>
            <v-dialog v-model="deleteDialog" v-if="userToDelete" persistent max-width="380">
            <v-card>
                <v-card-title v-if="!deleting" class="headline">{{ $t('message.userdeleteHint') }} <br> {{ userToDelete }}</v-card-title>
                <v-flex xs12 v-if="deleting">
                    <v-progress-circular indeterminate v-bind:size="50" color="teal"></v-progress-circular>
                </v-flex>
                <v-card-actions>
                    <v-btn color="teal darken-1" v-if="!deleting" @click.stop="dialog=false">{{ $t('message.abort') }}</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" v-if="!deleting" @click="deleteUser(idToDelete)">{{ $t('message.delete') }}</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

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
            currentUser: null,
            deleteDialog: false,
            deleting: false,
            idToDelete: null,
            userToDelete: null
        }),
        methods: {
            prepareUsers(users) {
                this.currentUser = this.$root.$children[0]._data.currentUser.id;
                this.users = users;
            },
            deleteUser(id) {
                this.deleting = true;
                api.deleteUser(id, this.$root.$children[0]._data.currentUser.id, this.afterUserDelete);
            },
            preDeleteUser(id, name) {
                this.idToDelete = id;
                this.userToDelete = name;

                this.deleteDialog = true;
            },
            afterUserDelete(response) {
                this.deleting = false;
                this.deleteDialog = false;
                helper.createSuccessMessage(this.$root,this.$t('message.deletedUserSuccess'), 2500)
                api.getUsers(this.prepareUsers);
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