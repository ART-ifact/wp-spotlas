export default {
  getCategories (cb) {
    axios.get(window.SETTINGS.API_BASE_PATH + 'categories?sort=name&hide_empty=true&per_page=50')
      .then(response => {
        cb(response.data.filter(c => c.name !== "Uncategorized"))
      })
      .catch(e => {
        cb(e)
      })
  },

  getPages (cb) {
    axios.get(window.SETTINGS.API_BASE_PATH + 'posts?filter[posts_per_page]=-1')
      .then(response => {
        cb(response.data)
      })
      .catch(e => {
        cb(e)
      })
  },

  getPage (id, cb) {
    if (_.isNull(id) || !_.isNumber(id)) return false
    axios.get(window.SETTINGS.API_BASE_PATH + 'pages/'+id)
      .then(response => {
        cb(response.data)
      })
      .catch(e => {
        cb(e)
      })
  },

  getPost(id, cb) {
    console.log('getpost:' + id)
    //if (_.isNull(id) || !_.isNumber(id)) return false
    axios.get(window.SETTINGS.API_BASE_PATH + 'posts/' + id)
      .then(response => {

        if (response.data.images !== '') {
          var imageStringToJson = JSON.stringify(eval('(' + response.data.images + ')'));
          response.data.images = JSON.parse(imageStringToJson);
        }
        console.log(response.data);
        cb(response.data)
      })
      .catch(e => {
        cb(e)
      })
  },

  getPosts (cb) {
    axios.get(window.SETTINGS.API_BASE_PATH + 'posts?filter[posts_per_page]=-1')
      .then(response => {
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].images !== '') {
            var imageStringToJson = JSON.stringify(eval('(' + response.data[i].images + ')'));
            response.data[i].images = JSON.parse(imageStringToJson);
          }
        }

        cb(response.data)
      })
      .catch(e => {
        cb(e)
      })
  },
}
