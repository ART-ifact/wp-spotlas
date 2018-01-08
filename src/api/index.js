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
                cb(response.data)
            })
            .catch(e => {
                cb(e)
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
                cb(e)
            })
    },

    uploadMedia(fileInput, cb) {

        var formData = new FormData();
        formData.append("action", "upload-attachment");
        formData.append("async-upload", fileInput);
        formData.append("name", fileInput.name);

        formData.append("_wpnonce", window.SETTINGS.NONCE);
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                if (xhr.responseText) {
                    console.log(xhr.responseText)
                    cb(window.$.parseJSON(xhr.responseText));
                }
            }
        };

        var uploadPath = window.SETTINGS.WPPATH + 'wp-admin/async-upload.php';
        xhr.open("POST", uploadPath, true);
        xhr.send(formData);
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
}