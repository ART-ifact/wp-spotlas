import Vue from 'vue'
import Router from 'vue-router'


// Components
import Home from '../components/Home'
import Login from '../components/Login'
import Location from '../components/Location'
import Map from '../components/Map'
import Add from '../components/Add'
import Edit from '../components/Edit'
import addUser from '../components/user/UserAdd'
import userAdmin from '../components/user/UserAdmin'
import userEdit from '../components/user/UserEdit'

Vue.use(Router)


const router = new Router({
    routes: [{
            path: '/',
            name: 'Map',
            component: Map,
            // props: { pageContentID: 383 }
        },
        {
            path: '/grid',
            name: 'Home',
            component: Home,
            // props: { pageContentID: 383 }
        },
        {
            path: '/add',
            name: 'Add',
            component: Add,
            // props: { pageContentID: 383 }
        },
        {
            path: '/authenticate',
            name: 'Login',
            component: Login,
            // props: { pageContentID: 383 }
        },
        {
            path: '/location/:id',
            name: 'Location',
            component: Location,
            components: {
                default: Location
            },
            props: {
                default: true
            }
        },
        {
            path: '/share/:id/:hash',
            name: 'Location Shared',
            component: Location,
            components: {
                default: Location
            },
            props: {
                default: true
            }
        },
        {
            path: '/user/add',
            name: 'Add User',
            component: addUser,
            components: {
                default: addUser
            },
            props: {
                default: true
            }
        },
        {
            path: '/user/admin',
            name: 'Userlist',
            component: userAdmin,
            components: {
                default: userAdmin
            },
            props: {
                default: true
            }
        },
        {
            path: '/user/edit/:id',
            name: 'Edit User',
            component: userEdit,
            components: {
                default: userEdit
            },
            props: {
                default: true
            }
        },
        {
            path: '/edit/:id',
            name: 'Edit',
            component: Edit,
            components: {
                default: Edit
            },
            props: {
                default: true
            }
        }
    ],
    mode: 'history',
    base: document.getElementsByClassName('app-base')[0].value,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {
                x: 0,
                y: 0
            }
        }
    }
})


export default router