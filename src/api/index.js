import router from '../router'

export default {
    getPost(id, cb) {
        //if (_.isNull(id) || !_.isNumber(id)) return false
        axios.get(window.SETTINGS.API_BASE_PATH + 'posts/' + id)
            .then(response => {

                if (response.data.images !== '') {
                    var imageStringToJson = JSON.stringify(eval('(' + response.data.images + ')'));
                    response.data.images = JSON.parse(imageStringToJson);
                }
                var positionArray = {
                    lat: parseFloat(response.data.lat),
                    lng: parseFloat(response.data.lng)
                };
                response.data.lng = positionArray;
                var typeObject = JSON.stringify(response.data.type);
                response.data.type = response.data.type.split(',');
                response.data.shareURL = window.location.host + '/share/'+response.data.id+'/'+response.data.hash;
                cb(response.data)
            })
            .catch(e => {
                if (e.response.status === 403) {
                    router.push('/authenticate');
                } else {
                    cb(e)
                }
            })
    },

    getSharedPost(id,hash, cb) {
        //if (_.isNull(id) || !_.isNumber(id)) return false
        axios.get(window.SETTINGS.API_BASE_PATH + 'posts/' + id+'?id='+id+'&hash='+hash)
            .then(response => {

                if (response.data.images !== '') {
                    var imageStringToJson = JSON.stringify(eval('(' + response.data.images + ')'));
                    response.data.images = JSON.parse(imageStringToJson);
                }
                var positionArray = {
                    lat: parseFloat(response.data.lat),
                    lng: parseFloat(response.data.lng)
                };
                response.data.lng = positionArray;
                var typeObject = JSON.stringify(response.data.type);
                response.data.type = response.data.type.split(',');
                cb(response.data)
            })
            .catch(e => {
                if (e.response.status === 403) {
                    router.push('/authenticate');
                } else {
                    cb(e)
                }
            })
    },

    getPosts(cb) {
        axios.get(window.SETTINGS.API_BASE_PATH + 'posts?filter[posts_per_page]=-1')
            .then(response => {
                for (let i = 0; i < response.data.length; i++) {
                    if (response.data[i].images !== '') {
                        var imageStringToJson = JSON.stringify(eval('(' + response.data[i].images + ')'));
                        response.data[i].images = JSON.parse(imageStringToJson);
                    }
                    var positionArray = {
                        lat: parseFloat(response.data[i].lat),
                        lng: parseFloat(response.data[i].lng)
                    };
                    response.data[i].lng = positionArray;
                    console.log(positionArray);
                }

                cb(response.data)
            })
            .catch(e => {
                if (e.response.status === 403) {
                    router.push('/authenticate');
                } else {
                    cb(e)
                }
            })
    },

    uploadMedia(formData, cb) {

        axios.post(window.SETTINGS.WPPATH + 'wp-admin/async-upload.php', formData)
            .then(function (response) {
                console.log(response.data)
                cb(response.data);
            }).catch(function (e) {
                cb(e);
            });
    },

    deleteMedia(id, cb) {
        axios.delete(window.SETTINGS.WPPATH + 'wp-json/wp/v2/media/' + id + '?force=true', {
            force: true
        }).then(function (response) {
            console.log("deleted successfully");
            cb(id);
        }).catch(e => {
            cb(e)
        });
    },

    addLocation(formData, cb) {
        axios.post(window.SETTINGS.THEMEURL + '/formhandlers/add-location.php', formData)
            .then(function (response) {
                cb(response);
            }).catch(function (e) {
                cb(e);
            });
    },

    editLocation(formData, cb) {
        axios.post(window.SETTINGS.THEMEURL + '/formhandlers/edit-location.php', formData)
            .then(function (response) {
                cb(response);
            }).catch(function (e) {
                cb(e);
            });
    },

    deleteLocation(id, cb) {
        axios.delete(window.SETTINGS.WPPATH + 'wp-json/wp/v2/posts/' + id + '?force=true', {
            force: true
        }).then(function (response) {
            console.log("deleted successfully");
            cb(id);
        }).catch(e => {
            cb(e)
        });
    },

    getCurrentUser(nonce, cb) {
        axios.get(window.SETTINGS.WPPATH + 'wp-json/wp/v2/users/me?_wpnonce='+nonce).then(function (response) {
            console.log(response)
            cb(response.data);
        }).catch(error => {
            cb(error);
        })
    },
    getAdmin(cb) {
        axios.get(window.SETTINGS.WPPATH + 'wp-json/spottr/admin').then(function (response) {
            console.log(response)
            cb(response.data);
        }).catch(error => {
            cb(error);
        })
    }
}