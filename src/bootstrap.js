try {
    window._ = require('lodash');
    window.$ = window.jQuery = require('jquery');
    window.axios = require('axios');
    window.nonce = window.$('input.wpnonce-rest').val();
    window.axios.defaults.headers.common = {
        'X-Requested-With': 'XMLHttpRequest',
        'X-WP-Nonce': window.nonce,
    };
    window.axios.defaults.timeout = 100000;
    window.axios.defaults.headers.common['X-WP-Nonce'] = window.nonce;
} catch (e) {}