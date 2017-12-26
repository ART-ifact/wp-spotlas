<template>
    <b-container class="bv-example-row">
        <b-row>
            <b-col>
                <login class="col-xs-10 col-sm-8 col-xs-offset-1 col-sm-offset-2">
                    <div class="well mt50">
                        <form v-on:submit.prevent="login">
                            <p class="login-username form-group label-static">
                                <label for="user_login" class="control-label">Benutzername oder E-Mail-Adresse</label>
                                <input name="log" id="user_login" class="input form-control" value="" v-model="username" type="text">
                            </p>
                            <p class="login-password form-group label-static">
                                <label for="user_pass" class="control-label">Passwort</label>
                                <input name="pwd" id="user_pass" class="input form-control" value="" v-model="password" type="password">
                            </p>
                            <p class="login-submit">
                                <input name="wp-submit" class="button button-primary btn btn-primary btn-spottr pull-right" value="Anmelden" type="submit">
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
        username: '',
        password: '',
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