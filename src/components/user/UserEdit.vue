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
                <v-text-field dark color="teal" v-bind:label="$t('message.username')" required :rules="usernameRules" v-model="form.name" disabled></v-text-field>
                <v-text-field dark color="teal" v-bind:label="$t('message.email')" required :rules="emailRules" v-model="form.email" :disabled="sending" required></v-text-field>
                <v-text-field v-bind:label="$t('message.newPassword')" v-model="password" color="teal" :append-icon="passwordfield ? 'visibility' : 'visibility_off'" :append-icon-cb="() => (passwordfield = !passwordfield)" :type="passwordfield ? 'password' : 'text'"></v-text-field>
                <v-text-field v-bind:label="$t('message.newPasswordValidate')" v-model="passwordRetype" color="teal" :append-icon="passwordfield ? 'visibility' : 'visibility_off'" :append-icon-cb="() => (passwordfield = !passwordfield)" :type="passwordfield ? 'password' : 'text'"></v-text-field>
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
        props: ['id'],
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
            password: "",
            passwordRetype: "",
            sending: false,
            valid: false,
            passwordfield: true,
            usernameRules: [v => !!v || "Username is required"],
            emailRules: [
                        (v) => !!v || 'E-mail is required',
                        (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
                        ],
            passwordRules: [v => !!v || "Password is required"]
        }),
        methods: {
            saveUser() {
                if (this.password !== this.passwordRetype) {
                    helper.createErrorMessage(this.$root,this.$t('message.passwordMismatch'), 2500)
                    return;
                } else {
                    this.form.password = this.password;
                }
                if (this.$refs.form.validate()) {
                    this.sending = true;
                    var formData = helper.buildFormDataUser(this.form,true);
                    console.log(this.form);
                    api.editUser(this.id, formData,this.afterSave)
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
            },
            prepareUserForm(userData) {
                console.log(userData);
                this.form =  userData;
                this.form.email = userData.userEmail;
            },
            cancel() {
                router.go(-1);
            }
        },

        watch: {
            // call again the method if the route changes
            //$route: "handleData"
        },

        created() {
            api.getUser(this.id, this.prepareUserForm);
        }
    };
</script>

<style lang="scss">
</style>