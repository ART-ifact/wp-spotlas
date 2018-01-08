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
}