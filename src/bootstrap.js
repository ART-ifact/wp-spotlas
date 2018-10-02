try {
    window._ = require('lodash');
    window.axios = require('axios');
    window.nonce = document.getElementsByClassName('wpnonce-rest')[0].value;
    window.mapskey = document.getElementsByClassName('maps-api')[0].value;
    window.axios.defaults.headers.common = {
        'X-Requested-With': 'XMLHttpRequest',
        'X-WP-Nonce': window.nonce,
    };
    window.axios.defaults.timeout = 100000;
    window.axios.defaults.headers.common['X-WP-Nonce'] = window.nonce;
} catch (e) {}