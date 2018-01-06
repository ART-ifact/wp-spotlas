<template>
    <v-container grid-list-xl text-xs-center>
        <v-layout row wrap>
            <v-flex xs12 sm8 offset-xs0 offset-sm2>
                <v-card dark color="dark" class="pa-3">
                    <form v-on:submit.prevent="login">
    
                        <v-text-field dark label="Username" color="teal" id="user_login" v-model="username" required></v-text-field>
    
                        <v-text-field label="Enter your password" v-model="password" color="teal" :append-icon="passwordfield ? 'visibility' : 'visibility_off'" :append-icon-cb="() => (passwordfield = !passwordfield)" :type="passwordfield ? 'password' : 'text'"></v-text-field>
                        <v-btn color="teal" dark type="submit">Login</v-btn>
                    </form>
                </v-card>
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
            }
        },
        created() {
            this.wppath = window.SETTINGS.WPPATH
    
        },
    
        methods: {
            login: function() {
                var url = this.wppath + 'wp-json/custom-plugin/login?username=' + this.username + '&password=' + this.password;
                axios.get(url).then(function(response) {
                    window.isSigned = true;
                    router.push('/')
                }, function(error) {
                    console.log(error.statusText);
                });
            }
        }
    }
</script>

<style lang="scss">
    .jumbotron {
        margin-top: 5%;
    }
</style>