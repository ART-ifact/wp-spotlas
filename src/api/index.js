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
        console.log(response.data);
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

  getPosts (cb) {
    
    axios.get(window.SETTINGS.API_BASE_PATH + 'posts?filter[posts_per_page]=-1')
      .then(response => {
        console.log(response.data);
        cb(response.data)
      })
      .catch(e => {
        cb(e)
      })
  },
}
