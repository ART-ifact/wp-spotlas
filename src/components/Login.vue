<template>

    <v-container grid-list-xl text-xs-center>
        <v-layout row wrap>
            <v-flex xs12 sm8 offset-xs0 offset-sm2>
                <v-card dark color="dark" class="pa-3">
                    <form v-on:submit.prevent="login">

                        <v-text-field dark label="Username" id="user_login" v-model="username" required></v-text-field>

                        <v-text-field
                            label="Enter your password"
                            v-model="password"
                            :append-icon="passwordfield ? 'visibility' : 'visibility_off'"
                            :append-icon-cb="() => (passwordfield = !passwordfield)"
                            :type="passwordfield ? 'password' : 'text'"
                            ></v-text-field>
                            <v-btn color="primary" dark type="submit">Login</v-btn>
                    </form>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>

export default {
    data () {
      return {
        username: null,
        password: null,
        passwordfield: true,
      }
    },
    methods: {
        login: function () {
            var url = '/wordpress/wp-json/custom-plugin/login?username=' + this.username + '&password=' + this.password;
            axios.get(url).then(function (response) {
                window.location.reload(true);
            }, function (error) {
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