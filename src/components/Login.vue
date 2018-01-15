<template>
    <v-container grid-list-xl text-xs-center>
        <v-layout row wrap>
            <v-flex xs12 sm8 offset-xs0 offset-sm2>
                <v-card dark color="dark" class="pa-3">
                    <v-form v-on:submit.prevent="login" v-model="valid" ref="form" lazy-validation>

                        <v-text-field dark v-bind:label="$t('message.username')" color="teal" id="user_login" v-model="username" required :rules="usernameRules"></v-text-field>

                        <v-text-field v-bind:label="$t('message.password')" v-model="password" color="teal" :append-icon="passwordfield ? 'visibility' : 'visibility_off'" :append-icon-cb="() => (passwordfield = !passwordfield)" :type="passwordfield ? 'password' : 'text'" :rules="passwordRules"></v-text-field>
                        <v-btn color="teal" dark class="full-width" type="submit">{{ $t('message.login') }}</v-btn>
                    </v-form>
                </v-card>
                <v-snackbar multi-line bottom v-model="showForbidden">
                    You are not logged in
                    <v-btn dark flat @click.native="showForbidden = false">{{ $t('message.close') }}</v-btn>
                </v-snackbar>
                <v-snackbar :timeout="20000" multi-line bottom v-model="loginError" color="error">
                    <span v-html="loginErrorMessage"></span>
                    <v-btn dark flat @click.native="loginError = false">{{ $t('message.close') }}</v-btn>
                </v-snackbar>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import router from '../router';
    export default {
        data() {
            return {
                username: null,
                password: null,
                passwordfield: true,
                wppath: null,
                valid: false,
                loginError: false,
                loginErrorMessage: null,
                showForbidden: false,
                usernameRules: [v => !!v || "Username is required"],
                passwordRules: [v => !!v || "Password is required"]
            }
        },
        created() {
            this.wppath = window.SETTINGS.WPPATH

        },

        methods: {
            login: function() {
                var url = this.wppath + 'wp-json/custom-plugin/login?username=' + this.username + '&password=' + this.password;
                var _this = this;
                if (this.$refs.form.validate()) {
                    axios.get(url).then(function(response) {
                        window.isSigned = true;
                        router.push('/')
                    }, function(error) {
                        _this.loginErrorMessage = error.response.data.message;
                        _this.loginError = true;
                    });
                }
            }
        }
    }
</script>

<style lang="scss">
</style>