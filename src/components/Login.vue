<template>
    <b-container class="bv-example-row">
        <b-row>
            <b-col>
                <login class="col-xs-10 col-sm-8 col-xs-offset-1 col-sm-offset-2">
                    <div class="well mt50">
                        <form v-on:submit.prevent="login">
                            <p class="login-username form-group label-static">
                                <md-field>
                                    <label>Username</label>
                                    <md-input id="user_login" v-model="username" type="text"></md-input>
                                </md-field>
                            </p>
                            <p class="login-password form-group label-static">
                                <md-field>
                                    <label>Password</label>
                                    <md-input id="user_password" v-model="password" type="password"></md-input>
                                </md-field>
                            </p>
                            
                            <p class="login-submit">
                                <md-button class="md-primary" name="wp-submit" value="Anmelden" type="submit">Primary</md-button>
                            </p>
                        </form>
                    </div>
                </login>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>

export default {
    data: {
        // declare message with an empty value 
        username: null,
        password: null,
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