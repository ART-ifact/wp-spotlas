<template>
    <v-layout wrap>
        <v-form class="xs12 flex" @submit.prevent="saveUser" v-model="valid" ref="form" lazy-validation>
            <v-toolbar card color="grey darken-3" class="location-toolbar">
                <v-btn dark color="blue-grey darken-3" :disabled="sending" @click="cancel()">{{ $t('message.cancel') }}</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="teal" dark name="wp-submit" :disabled="sending" type="submit">{{ $t('message.save') }}</v-btn>
            </v-toolbar>
            <v-layout row wrap>
                <v-flex xs12>
                <v-text-field dark color="teal" v-bind:label="$t('message.username')" required :rules="usernameRules" v-model="form.username" :disabled="sending" required></v-text-field>
                <v-text-field dark color="teal" v-bind:label="$t('message.email')" required :rules="emailRules" v-model="form.email" :disabled="sending" required></v-text-field>
                </v-flex>
            </v-layout>
        </v-form>
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
            form: {
                username: "",
                name: "",
                first_name: "",
                last_name: "",
                email: "",
                nickname: "",
                password: ""
            },
            sending: false,
            valid: false,
            usernameRules: [v => !!v || "Username is required"],
            emailRules: [
                        (v) => !!v || 'E-mail is required',
                        (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
                        ]
        }),
        methods: {
            saveUser() {
                if (this.$refs.form.validate()) {
                    this.sending = true;
                    var formData = helper.buildFormDataUser(this.form,false);
                    api.addUser(formData,this.afterSave)
                }
            },
            afterSave(response) {
                if (response.status === 200) {
                    helper.createSuccessMessage(this.$root,this.$t('message.userSaved'), 2500)
                    this.sending = false;
                    router.go(-1)

                } else {
                    helper.createErrorMessage(this.$root,response.data, 20000)
                }
            }
        },

        watch: {
            // call again the method if the route changes
            //$route: "handleData"
        },

        created() {
            //this.$store.dispatch('getPost')
        }
    };
</script>

<style lang="scss">
</style>