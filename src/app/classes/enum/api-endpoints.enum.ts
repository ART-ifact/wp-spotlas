export enum ApiEndpoints {
  getUser = '/wp-json/wp/v2/users/',
  getMe = '/wp-json/wp/v2/users/me',
  getMediaNonce = '/wp-json/spotlas/medianonce',
  getOptions = '/wp-json/spotlas/options',
  getLocation = '/wp-json/wp/v2/posts/',
  getLocations = '/wp-json/wp/v2/posts?per_page=10000000',
  saveLocation = '../formhandlers/add-location.php',
  editLocation = '/formhandlers/edit-location.php',
  deleteLocation = '/wp-json/wp/v2/posts/',
  media = '/wp-json/wp/v2/media/',
  editUser = '/wp-json/wp/v2/users/',
  isAdmin = '/wp-json/spotlas/admin/',
  addUser = '../formhandlers/add-user.php',
  getUsers = '/wp-json/wp/v2/users',
  deleteUser = '/wp-json/wp/v2/users/'
}
