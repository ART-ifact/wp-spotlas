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
import importLocations from '../components/Import'

Vue.use(Router)


const router = new Router({
    routes: [{
            path: '/',
            name: 'Map',
            component: Map,
            // props: { pageContentID: 383 }
            meta: { bodyClass: 'vue--page--map' },
        },
        {
            path: '/grid',
            name: 'Home',
            component: Home,
            // props: { pageContentID: 383 }
            meta: { bodyClass: 'vue--page--grid' },
        },
        {
            path: '/add',
            name: 'Add',
            component: Add,
            // props: { pageContentID: 383 }
            meta: { bodyClass: 'vue--page--add' },
        },
        {
            path: '/authenticate',
            name: 'Login',
            component: Login,
            // props: { pageContentID: 383 }
            meta: { bodyClass: 'vue--page--login' },
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
            },
            meta: { bodyClass: 'vue--page--location' },
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
            },
            meta: { bodyClass: 'vue--page--location' },
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
            },
            meta: { bodyClass: 'vue--page--add' },
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
            },
            meta: { bodyClass: 'vue--page--user-admin' },
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
            },
            meta: { bodyClass: 'vue--page--user-edit' },
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
            },
            meta: { bodyClass: 'vue--page--edit' },
        },
        {
            path: '/import',
            name: 'Import',
            component: importLocations,
            components: {
                default: importLocations
            },
            props: {
                default: true
            },
            meta: { bodyClass: 'vue--page--import' },
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